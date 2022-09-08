import React, { Fragment, useEffect, useState } from "react";
import { Input, Skeleton } from "antd";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import { DropdownComponent } from "../../../Molecules/Dropdowns";
import { GET_CATEGORIES } from "../../../../graphql/blog";
import Error from "../../../../pages/_error";

const { Search } = Input;

const defaultValue = {
	id: "1",
	nameItem: "Todas",
	valorItem: "todas",
};

const Filter = ({ page = null }) => {
	const router = useRouter();
	const [search, setSearch] = useState("");
	const [cat, setCat] = useState("");
	const [labelCat, setLabelCat] = useState("");
	const [categories, setCategories] = React.useState([]);

	const setParams = (name, val) => {
		let query = router.query;
		let set = {};
		set[name] = val;
		let pathname = router.pathname;

		if (page === "post") {
			pathname = "/blog";
			router.push({
				pathname,
				query: set,
			});
		} else {
			router.push({
				pathname,
				query: {
					...query,
					...set,
				},
			});
		}
	};

	const changeValSelected = (val, label) => {
		setParams("cat", val);
		setLabelCat(label);
	};

	const { data, loading, error } = useQuery(GET_CATEGORIES);

	React.useEffect(() => {
		if (data?.allNoticiaCategorias) {
			setCategories([
				defaultValue,
				...data.allNoticiaCategorias.map(({ id, name, slug }) => {
					return {
						id,
						nameItem: name,
						valorItem: slug,
					};
				}),
			]);
		}
	}, [data]);

	useEffect(() => {
		if (typeof window !== `undefined`) {
			const { cat, s } = router.query;
			if (cat) {
				setCat(cat);
			} else {
				setCat("todas");
			}
			if (s) setSearch(s);
		}
	}, [router]);

	if (loading) {
		return <Skeleton className="skeleton" active />;
	}
	if (error) {
		return (
			<div className="error">
				<Error message={error} />
			</div>
		);
	}

	return (
		<Fragment>
			<DropdownComponent
				suffix={null}
				clickFlag={1}
				current={cat}
				items={categories}
				style={{ textAlign: "left" }}
				changeValSelected={changeValSelected}
				className="m-dropdown--SimpleTransparent"
				label={labelCat === "" ? "Todas" : labelCat}
			/>
			<Search
				className="search"
				placeholder="buscar"
				defaultValue={search}
				onSearch={(val) => setParams("s", val)}
			/>
		</Fragment>
	);
};

export default Filter;
