import React from "react";
import PropTypes from "prop-types";
import { LayoutStyle } from "./style";

const LayoutPage = ({ children, footer, align = "vertical", ...rest }) => {
	return <LayoutStyle {...rest}>
		<div className={align}>
			<div className="header">
				<div>
					<img src={"/static/img/logo-white.svg"} alt="Catalejo" />
					<p>REPORTE</p>
				</div>
			</div>
			<div className="content">
				<div className="body">{children}</div>
				<div className="footer">
					{footer}
				</div>
			</div>
		</div>
	</LayoutStyle>;
};

LayoutPage.propsType = {
	children: PropTypes.node.isRequired,
	footer: PropTypes.node,
	align: PropTypes.oneOf(["vertical", "horizontal"])
};

export default LayoutPage;
