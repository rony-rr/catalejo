import React from "react";
import TemplateULogin from "../components/Templates/Login";
import WithAuth from "../components/HOC/WithAuth";

const UserLogin = () => {
	return (
		<WithAuth>
			<TemplateULogin />
		</WithAuth>
	);
};

export default UserLogin;
