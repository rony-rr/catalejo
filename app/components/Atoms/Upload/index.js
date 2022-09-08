import axios from "axios";
import { message, notification } from "antd";
import { useMutation } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useAuth } from "../../../apollo/authentication";
import { UploadStyle } from "./style";

export const UploadFile = ({
	gql,
	file,
	type,
	placeholder = "subir",
	onChange,
	setLoading,
	...rest
}) => {
	const { user } = useAuth();
	const [fileList, setFileList] = useState([]);
	const [updateImageFile, { data: data, loading, error }] = useMutation(gql, {
		onCompleted: () => {
			setLoading && setLoading(false);
		},
	});

	useEffect(() => {
		if (file) setFileList([file]);
	}, [file]);

	useEffect(() => {
		if (!loading) {
			if (error) message.error("no se pudo subir la imagen");
			else if (data && data?.updateUser?.image) {
				setFileList([data?.updateUser?.image]);
				onChange && onChange(data?.updateUser?.image);
			}
		}
	}, [data, loading]);

	const uploadImage = async (options) => {
		const { onError, file } = options;
		try {
			if (gql) {
				setLoading && setLoading(true);
				updateImageFile({
					variables: { id: user.id, image: file },
				});
			} else {
				onChange && onChange(file);
			}
		} catch (err) {
			onError(err);
		}
	};

	const isFile = type === "file";

	return (
		<UploadStyle
			type={type}
			accept="image/*"
			fileList={fileList}
			showUploadList={false}
			customRequest={uploadImage}
			{...rest}
		>
			<div className="border" title="Añadir o actualizar imagen">
				{loading ? (
					<>
						<LoadingOutlined />
						{!isFile && <span style={{ marginTop: 8 }}>Cargando</span>}
					</>
				) : !fileList.length ? (
					<>
						{!isFile && <PlusOutlined style={{ marginBottom: 8 }} />}
						<span>{placeholder}</span>
					</>
				) : isFile ? (
					<div className="filename">{fileList[0].filename}</div>
				) : (
					<div className="img">
						<img src={fileList[0].publicUrl} alt={fileList[0].filename} />
					</div>
				)}
			</div>
		</UploadStyle>
	);
};

export const UploadFileCSV = ({
	gql,
	type = "file",
	placeholder = "subir",
	formatData,
	setState,
	...rest
}) => {
	const [fileList, setFileList] = useState([]);
	const [fileup, setFileup] = useState();
	const [onError, setError] = useState({
		init: () => {},
	});
	const [createDataServer] = useMutation(gql, {
		onCompleted: (res) => {
			const data = Object.keys(res).length !== 0;

			if (data) {
				notification["success"]({
					message: "Sucess",
					description: "Creado con exito",
				});

				setState({
					data,
					loading: false,
					error: null,
				});
			} else {
				return setState({
					data: null,
					loading: false,
					error: "Error en el servidor",
				});
			}
		},
		onError: (error) => {
			console.log(error?.message);
			setState({
				data: null,
				loading: false,
				error: [
					{
						linea: 0,
						error: error?.message || "",
					},
				],
			});
		},
	});

	const customRequest = async (options) => {
		setError({ init: options.onError });
	};

	const configupdata = {
		headers: { "content-type": "multipart/form-data" },
	};

	// handlers
	const handleFile = useCallback((file, fileList) => {
		const files = fileList;
		if (files?.length) {
			setFileup(files[0]);
		}
	}, []);

	const uploadFile = useCallback(async () => {
		if (fileup) {
			const formData = new FormData();
			formData.append("csv", fileup);
			const response = await axios.post(
				"/api/process-csv",
				formData,
				configupdata
			);
			setFileList(response.data);
		}
	}, [fileup]);

	const sendServerData = React.useCallback(async () => {
		setState({
			data: null,
			loading: true,
			error: [],
		});
		const { passed, failed } = await formatData(fileList);
		// CHECK: Verificar no rompa otra estructura, aquí espera recibir un array
		if (failed.length)
			return setState((prev) => ({
				...prev,
				loading: false,
				error: failed,
			}));
		try {
			createDataServer({
				variables: { data: passed },
			});
		} catch (err) {
			onError.init && onError.init(err);
		}
	}, [fileList]);

	// effects
	useEffect(() => {
		uploadFile();
	}, [fileup]);

	useEffect(() => {
		if (fileList && fileList?.length) {
			// upload data to server
			sendServerData();
		}
	}, [sendServerData]);

	return (
		<UploadStyle
			type={type}
			accept=".csv"
			showUploadList={false}
			beforeUpload={handleFile}
			customRequest={customRequest}
			{...rest}
		>
			<div className="border">
				<span>
					{placeholder}
					{/* <LoadingOutlined /> */}
				</span>

				{/* <span style={{ marginTop: 8 }}>Cargando</span> */}
			</div>
		</UploadStyle>
	);
};
