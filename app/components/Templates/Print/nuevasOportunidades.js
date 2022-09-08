// HOC para imprimir componente
import React from "react";
import LayoutPage from "./layout";
import Portada from "./portada";
import Product from "../NewOpportunities/Component/Product";

const TemplateOportunidadesPrint = () => {
	return <>
		<Portada />
		{/*Primera pagina*/}
		<LayoutPage>
			<Product />
		</LayoutPage>
		<div className="salto-de-page" />
	</>;
};

export default TemplateOportunidadesPrint
