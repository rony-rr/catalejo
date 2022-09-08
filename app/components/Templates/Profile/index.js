import React from "react";
import { Container } from "react-grid-system";
import { Skeleton } from "antd";
import { useQuery } from "@apollo/client";

import Styles from "./style";
import { TitleComponent } from "../../Atoms/Titles";
import { PersonaInfoCardComponent } from "../../Organisms/PersonaInfoCard";
import { colors } from "../../../styles/basic/colors";
import { useAuth } from "../../../apollo/authentication";
import { USER_INFO } from "../../../graphql/user";

const TemplateProfile = () => {
	const { user } = useAuth();
	const { data, loading } = useQuery(USER_INFO, {
		variables: {
			ID: user?.id
		}
	});

	return (
		<Styles>
			<Container className="t-profile__container">
				<TitleComponent className="a-title--light t-profile__title" level={4}>
					Mi perfil
				</TitleComponent>
				{loading && <Skeleton className="skeleton" active />}
				{/*{error && <div className="error"><Error message={error} /></div>}*/}
				<PersonaInfoCardComponent
					className={"o--persona--infoCard"}
					bgcolor={colors.blue}
					data={data?.User}
				/>
			</Container>
		</Styles>
	);
};

export default TemplateProfile;
