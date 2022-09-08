import React from "react";
import { Layout, Skeleton } from "antd";
import { TitleComponent } from "../../Atoms/Titles";
import { AccordionInvestments } from "../../Organisms/Accordions";
import { InvestProgramCardHeader } from "../../Organisms/InvestorServicesCardHeader";

import Styles from "./style";
import { useQuery } from "@apollo/client";
import { GET_PROGRAMS } from "../../../graphql/programas";
import Error from "../../../pages/_error";
import { useAppContext } from "../../Context";

const { Content } = Layout;

const TemplateInvestProgram = () => {
	const { account } = useAppContext();
	const { data, loading, error } = useQuery(GET_PROGRAMS, {
		skip: !account,
		variables: {
			account,
		},
	});

	const onPressArrowDown = () => {
		// console.log('Ok Arrow');
	};

	if (error)
		return (
			<div className="error">
				<Error message={error} />
			</div>
		);

	return (
		<Styles>
			<Layout className="t-invest__container">
				<Layout className="site-layout">
					<Content className="t-invest__content">
						<TitleComponent className="a-title--light--thin" level={2}>
							Investor Services Program
						</TitleComponent>
						<InvestProgramCardHeader onPressArrowDown={onPressArrowDown} />
						{loading ? (
							<Skeleton className="skeleton" active />
						) : (
							<AccordionInvestments items={data?.allProgramas ?? []} />
						)}
					</Content>
				</Layout>
			</Layout>
		</Styles>
	);
};

export default TemplateInvestProgram;
