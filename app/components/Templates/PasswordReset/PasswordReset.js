import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Empty } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

import SpinLoader from "../../Atoms/Spin";
import { PasswordForm } from "../RecoverPass/form";

// style
import {
	StyleBody,
	StyleButton,
	StyleContent,
	StyleTitle,
	StyleWrapper,
} from "./style";

const PasswordResetTemplate = () => {
	const router = useRouter();
	const [codeId, setCodeId] = useState("");
	const [loadingVerify, setLoading] = useState(false);
	const [userId, setUserId] = useState("");
	const [textError, setTextError] = useState("");
	const [initLoading, setInitLoading] = useState(true);
	const [success, setSuccess] = useState(false);


	const verifyCode = useCallback(({ variables }) => {
		setLoading(true)
		axios.post('/api/verify-code', variables).then(({ data }) => {
			setUserId(data.user)
			setCodeId(data.id)
			setInitLoading(false);
			setSuccess(true);
			setLoading(false);
		}).catch(e => {
			console.log(e);
			setTextError(e?.response?.data?.message || e?.message);
			setInitLoading(false);
			setLoading(false);
		})
	}, [])

	// get code from query params
	useEffect(() => {
		if (router?.query) {
			const { query } = router;
			if (query?.code) {
				const code = query.code;
				verifyCode({
					variables: {
						code,
					},
				});
			}
		}
	}, [router?.query]);

	const textLoading = useMemo(() => {
		if (initLoading) return "Cargando...";
		if (loadingVerify) return "Verificando...";
	}, [loadingVerify, initLoading]);

	return (
		<StyleWrapper>
			<StyleContent>
				{textError && !initLoading ? (
					<StyleBody>
						<StyleTitle>{textError}</StyleTitle>
						<p />
						<Empty description="" />
						<Link href="/" passHref>
							<a>
								<StyleButton type="yellow">Ir a incio</StyleButton>
							</a>
						</Link>
					</StyleBody>
				) : success ? (
					<StyleBody>
						<PasswordForm userId={userId} codeId={codeId} />
					</StyleBody>
				) : (
					<SpinLoader text={textLoading} />
				)}
			</StyleContent>
		</StyleWrapper>
	);
};

export default PasswordResetTemplate;
