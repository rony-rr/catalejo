import Router from "next/router";
import React, { useEffect } from "react";

import SpinLoader from "../Atoms/Spin";
import { useAppContext } from "../Context";
import { useAuth } from "../../apollo/authentication";
import moment from "moment";
// import { LoadingOutlined } from '@ant-design/icons';
// import styled from 'styled-components';

// const SpinLoader = dynamic(() => import("../Atoms/Spin"), { ssr: false });s

// const antIcon = <LoadingOutlined style={{ fontSize: 35 }} spin />;
// const SpinCompo = styled(Spin)`
// 	min-height: 100vh;
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
// `;

const WithAuth = ({
	children,
	authStatus = "auth-required",
	requiredAccount = true,
}) => {
	const { isAuthenticated, user, loadInit } = useAuth();
	const { account, setInitialState } = useAppContext();

	const getDatesLocalstorage = React.useCallback(() => {
		const timer = JSON.parse(localStorage.getItem("timer") || "{}");
		if (timer?.dates?.startAt) {
			return {
				...timer,
				dates: {
					startAt: moment(timer.dates.startAt),
					endAt: moment(timer.dates.endAt),
				}
			};
		}
		return {};
	}, []);

	useEffect(() => {
		if (!loadInit) return null;
		// Check load account
		if (!account) {
			const ac = localStorage.getItem("account");
			const timer = getDatesLocalstorage();
			if (ac) {
				// set dateType, dates and account
				setInitialState({ ...timer, account: ac });
				return false;
			}
		}

		localStorage.removeItem("timer");

		// Login first time
		if (isAuthenticated && !user.isEnabled) {
			Router.push("/antes-de-ingresar");
		} else {
			// Auth types
			switch (authStatus) {
				case "auth-required":
					if (!isAuthenticated) {
						Router.push("/");
					} else if (requiredAccount && !account) {
						Router.push("/select-account");
					}
					break;
				case "redirect-if-auth":
					if (isAuthenticated) {
						Router.push("/select-account");
					}
					break;
				default:
				// auth-required
			}
		}
	}, [loadInit, isAuthenticated, authStatus, getDatesLocalstorage]);

	if (typeof window !== "undefined" && !loadInit) return <SpinLoader />;

	return <>{children}</>;
};

export default WithAuth;
