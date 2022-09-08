import React from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { IconButton } from "@arch-ui/button";
import { CopyOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import {
	CREATE_LIST_QUERY,
	GET_ALL_LIST_QUERY,
	GET_LIST_QUERY,
} from "./graphql";

const resolveTypes = {
	MongoIdImplementation: "String",
	CalendarDay: "String",
	Relationship: "String",
	WysiwygImplementation: "String",
	Select: "String",
};

const resolvePath = ({ path, type }) => {
	if (type !== "Relationship") return path;
	return `${path} { id }`;
};

const mapperFields = ({ path, type }) => {
	if (
		path === "creator" ||
		path === "updater" ||
		path === "createdAt" ||
		path === "updatedAt"
	) {
		return null;
	}
	return {
		path: path,
		type: type,
		resolvePath: resolvePath({ path, type }),
		typeResolve: resolveTypes[type] ?? "String",
	};
};

const formatDataForClone = ({ data }) => {
	let dataValues = {};

	Object.keys(data).map((key) => {
		const value = data[key];
		if (typeof value === "object") {
			dataValues = {
				...dataValues,
				[key]: { connect: { id: value?.id } },
			};
		} else {
			dataValues = {
				...dataValues,
				[key]: value,
			};
		}
	});

	return dataValues;
};

// btn
const ClonarBtn = ({ id, list }) => {
	const router = useHistory();

	const fieldsToClone = React.useMemo(() => {
		const fields = list.fields.map(mapperFields).filter((field) => !!field);
		return {
			fields,
			schema: fields.map((field) => field.resolvePath).join(" \n "),
		};
	}, [list]);

	const onRedirect = (data) => {
		const record = data[`create${list?.key}`];
		router.push(`/admin/${list.path}/${record?.id}`);
	};

	const [createRecord, { loading: loadingMutation }] = useMutation(
		CREATE_LIST_QUERY({
			listName: list?.key,
		}),
		{
			onCompleted: onRedirect,
			refetchQueries: [
				GET_ALL_LIST_QUERY({
					listName: list?.key,
					schema: fieldsToClone?.schema,
				}),
				"getList",
			],
		}
	);

	const onCloneGraphql = (data) => {
		const record = data[list?.key];
		delete record["__typename"];
		delete record["id"];

		const payload = formatDataForClone({ data: record });

		createRecord({
			variables: {
				data: payload,
			},
		}).then();
	};

	const [getRecord, { loading: loadingQuery }] = useLazyQuery(
		GET_LIST_QUERY({
			listName: list?.key,
			schema: fieldsToClone?.schema,
		}),
		{
			fetchPolicy: "no-cache",
			onCompleted: onCloneGraphql,
			variables: {
				id,
			},
		}
	);

	const onClone = async () => {
		await getRecord();
	};

	return (
		<IconButton
			appearance="primary"
			icon={CopyOutlined}
			onClick={onClone}
			variant="nuance"
			data-test-name="clone"
			isDisabled={loadingMutation || loadingQuery}
		>
			{loadingMutation || loadingQuery ? "Clonando..." : "Clonar"}
		</IconButton>
	);
};

export default ClonarBtn;
