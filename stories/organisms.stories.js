import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Space, Divider } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { CloseOutlined, RightOutlined } from '@ant-design/icons';

import ReactToPrint from "react-to-print";

import GlobalStyle from '../app/styles/basic/general';
import { colors } from '../app/styles/basic/colors';
import { paragraph, titles } from '../app/styles/basic/fonts';

import { SVGIconClose } from '../app/components/Atoms/Icons';
import { SVGLogoLarge, SVGLogoHeader, SVGLogoMenu, SVGLogoSmall } from '../app/components/Atoms/Logo';
import { 
		SVGIconConsolidatedPosition, SVGIconInvestments, 
		SVGIconOpportunities, SVGIconBlog, 
		SVGIconInvestorServicesProgram, SVGIconSOS } from '../app/components/Atoms/Icons';

import { WarningModal } from '../app/components/Organisms/Modals';
import { SuccessModal } from '../app/components/Organisms/Modals';


import { TableVeComponent } from  '../app/components/Organisms/TableColumns';
import { TableHoComponent } from  '../app/components/Organisms/TableRows';
import { TableVeComponentWithFooter } from '../app/components/Organisms/TableColWithFooter';
import { VerticalListTab } from '../app/components/Organisms/verticalListTab';
import { FooterBannerComponent } from '../app/components/Organisms/FooterBanner';
import { AccordionDocument, AccordionPosts, AccordionTotals, AccordionInvestments } from '../app/components/Organisms/Accordions';
import { VerticalNav } from '../app/components/Organisms/VerticalNav';
import { SidebarComponent } from '../app/components/Organisms/Sidebar';
import { MenuComponent, LogoutMenu } from '../app/components/Organisms/Menu';
import { HorizontalTabs } from '../app/components/Organisms/HorizontalTabs';
import { PieGraphic, LinesGraphic } from '../app/components/Organisms/Graphics';
import { TestProvider } from '../app/components/Context';
import { PersonaInfoCardComponent } from '../app/components/Organisms/PersonaInfoCard';
import { VerticalGroupCards } from '../app/components/Organisms/VerticalGroupCards';
import { ProfileCard } from '../app/components/Organisms/ProfileCard';
import { MiniProfileMenu } from '../app/components/Organisms/MiniProfileItems';
import { TableGroupComponent } from '../app/components/Organisms/TableGroup';

export default { title: 'Organism' };


// data de ejemplo para las tablas
const dataColumns = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
];
const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
];


const dataRows = [
    {
      key: '1',
      item: 'Title',
      value: 'value',
    },
    {
      key: '2',
      item: 'Title',
      value: 'value',
    },
];
const columnsRow = [
    {
      dataIndex: 'item',
      key: 'item',
    },
    {
      dataIndex: 'value',
      key: 'value',
    },
];


const dataFooter = {
  titleMark: 'Total',
  values: [
    { key:'1', value: 1000, isMoney: true }, 
    {key: '2', value: 2000, isMoney: true}
  ],
};

export const TableVertical = () => (
	<Row>
		<Col span={24} style={{ backgroundColor: colors.darkBlue, padding: '20px' }} >
			<Divider orientation="left" style={{ color: colors.white, fontWeight: titles.fontWeight }} >
				Tabla Vertical - Columnas 
			</Divider>
			<Space >
				<br />
				<br />
				<TableVeComponent 
					columns={columns} 
					dataColumns={dataColumns} 
					className="o-table--columns" />
				<br />
				<br />
			</Space>
		</Col>
	</Row>
);

export const TableHorizontal = () => (
	<Row>
		<Col span={24} style={{ backgroundColor: colors.darkBlue, padding: '20px' }} >
			<Divider orientation="left" style={{ color: colors.white, fontWeight: titles.fontWeight }} >
				Tabla Horizontal - Filas
			</Divider>
			<Space >
				<br />
        		<br />
				<TableHoComponent 
					columns={columnsRow} 
					dataColumns={dataRows}
					className="o-table--rows" />
				<br />
        		<br />
			</Space>
		</Col>
	</Row>
);

export const TableWithTotals = () => (
	<Row>
		<Col span={24} style={{ backgroundColor: colors.darkBlue, padding: '20px' }} >
			<Divider orientation="left" style={{ color: colors.white, fontWeight: titles.fontWeight }} >
				Tabla con Totales
			</Divider>
			<Space >
				<br />
        		<br />
				<TableVeComponentWithFooter 
					columns={columns} 
					dataColumns={dataColumns}
					dataFooter={dataFooter}
					className="o-table--columns" />
				<br />
        		<br />
			</Space>
		</Col>
	</Row>
);

export const TableBorders = () => (
	<Row>
		<Col span={24} style={{ backgroundColor: colors.darkBlue, padding: '20px' }} >
			<Divider orientation="left" style={{ color: colors.white, fontWeight: titles.fontWeight }} >
				Tabla con divisones
			</Divider>
			<Space >
				<br />
        		<br />
       			<TableVeComponent 
					columns={columns} 
					dataColumns={dataColumns} 
					noFirstHeader={true}
					bordersVertical={true}
					alignRight={true}
					className="o-table--columns" />
				<br />
       			<br />
			</Space>
		</Col>
	</Row>
);

export const TableSinTitulos = () => (
	<Row>
		<Col span={24} style={{ backgroundColor: colors.darkBlue, padding: '20px' }} >
			<Divider orientation="left" style={{ color: colors.white, fontWeight: titles.fontWeight }} >
				Tabla sin títulos
			</Divider>
			<Space >
				<br />
        		<br />
        		<TableVeComponent 
					columns={columns} 
					dataColumns={dataColumns} 
					noTitles={true}
					className="o-table--columns" />
				<br />
				<br />
			</Space>
		</Col>
	</Row>
);

export const modals = () => (
	<Row>
		<GlobalStyle/>
		<Col span={24}>
			<Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
				Modals
			</Divider>
			<Space style={{ backgroundColor: '#020C22', padding: '0 20px' }}>
				<Modal
					title="Basic Modal"
					visible={true}
					footer={false}
					closeIcon={<SVGIconClose/>}>
				</Modal>
			</Space>
		</Col>
	</Row>
);

export const warningModal = () => (
	<Row>
		<GlobalStyle/>
		<Col span={24}>
			<Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
				Modals
			</Divider>
			<Space style={{ backgroundColor: '#020C22', padding: '0 20px' }}>
				<WarningModal visible={true} text="Ten en cuenta que el mes actual no ha terminado y puede que haya operaciones pendientes de abonar hasta final de mes."/>
			</Space>
		</Col>
	</Row>
);

export const successModal = () => (
	<Row>
		<GlobalStyle/>
		<Col span={24}>
			<Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
				Modals
			</Divider>
			<Space style={{ backgroundColor: '#020C22', padding: '0 20px' }}>
				<SuccessModal visible={true} text="¡Descarga Lista!" title="Reporte de desempeño"/>
			</Space>
		</Col>
	</Row>
);


export const VerticalTabs = () => {

	// ejemplo de array con items para las Tabs
	const itemsMenu = [
		{key: 1, label: 'Item 1', value: 'value_1'},
		{key: 2, label: 'Item 2', value: 'value_2'},
		{key: 3, label: 'Item 3', value: 'value_3'},
	];

	// control de flujo de cambio de estado valor seleccionado
	const [selectedValue, setSelectedValue] = useState('value_2');
	// funcion de propiedad para detectar el cambio
	const changeValueSelected = (value) => {
		setSelectedValue(value);
	}

	return(
		<Row>
			<Col span={24} style={{ backgroundColor: colors.darkBlue, padding: '20px' }} >
				<Divider orientation="left" style={{ color: colors.white, fontWeight: titles.fontWeight }} >
					Tabs Lista Vertical 
				</Divider>
				<Space >
					<br />
					<br />
					<VerticalListTab 
						className="o--vertical-listTab"
						itemsLista={itemsMenu}
						selectedValue={selectedValue}
						changeValueSelected={ changeValueSelected }
						/>
					<br />
					<br />
				</Space>
			</Col>
		</Row>
	);
};


export const BannerFooter = () => {

	return(
		<Row>
			<Col span={24} style={{ backgroundColor: colors.opacityGray, padding: '20px' }} >
				<Divider orientation="left" style={{ color: colors.white, fontWeight: titles.fontWeight }} >
					Banner ubicado cerca del footer en diseño  
				</Divider>
				<Space >
					<br />
					<br />
					
					<div style={{ 
						width: '40vw',
					}}>
						<FooterBannerComponent 
							className="o--banner--textButton"
							textButton="Hablemos"
							bgColor={colors.darkBlue}
							>
							{ '¿Listo para transformar....Lorem ipsum dol elit, sed do  tempor incididunt...?' }
						</FooterBannerComponent>
					</div>

					<br />
					<br />
				</Space>
			</Col>
		</Row>
	);
	
}

export const accordionDocument = () => {
	const items = [
		{
			folderName: "Lorem ipsum",
			documents: [
				{
					documentDate: "13 Jan, 2018",
					documentName: "Lorem ipsum",
					documentLink: "#"
				},
				{
					documentDate: "13 Jan, 2018",
					documentName: "Lorem ipsum",
					documentLink: "#"
				},
				{
					documentDate: "13 Jan, 2018",
					documentName: "Lorem ipsum",
					documentLink: "#"
				}
			]
		}
	];

	return (
		<Row>
			<Col span={24}>
				<Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
					Accordion Document
				</Divider>
				<div style={{ backgroundColor: '#020C22', padding: '0 20px', marginBottom: '100px' }}>
					<AccordionDocument items={items}/>
				</div>
				<div style={{ backgroundColor: '#020C22', padding: '0 20px' }}>
					<AccordionDocument items={items} isColumn={true}/>
				</div>
			</Col>
		</Row>
	)
}

export const accordionPost = () => {
	const items = [
		{
			title: 'Lorem ipsum',
			content: '<p>Catalejo tiene para usted una línea exclusiva de Servicios de Concierge. Le asistimos con reservas en restaurantes, hoteles, vuelos, asesoría con seguros, doctores, asesores tributarios y ejecutivos bancarios, entre otros.</p>'
		},
		{
			title: 'Lorem ipsum',
			content: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum'
		},
		{
			title: 'Lorem ipsum',
			content: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum'
		},
		{
			title: 'Lorem ipsum',
			content: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum'
		}
	];

	return (
		<Row>
			<Col span={24}>
				<Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
					Accordion Post
				</Divider>
				<div style={{ backgroundColor: '#020C22', padding: '0 20px', marginBottom: '100px' }}>
					<AccordionPosts items={items}/>
				</div>
			</Col>
		</Row>
	)
}

export const accordionTotals = () => {
	const items = [
		{
			title: 'Lorem ipsum',
			value: '00.00',
			content: ''
		},
		{
			title: 'Lorem ipsum',
			value: '00.00',
			content: ''
		},
		{
			title: 'Lorem ipsum',
			value: '00.00',
			content: ''
		},
		{
			title: 'Lorem ipsum',
			value: '00.00',
			content: ''
		}
	];

	return (
		<Row>
			<Col span={24}>
				<Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
					Accordion Totals
				</Divider>
				<div style={{ backgroundColor: '#ffffff', padding: '0 20px', marginBottom: '100px' }}>
					<AccordionTotals items={items}/>
				</div>
			</Col>
		</Row>
	)
}

export const accordionInvestments = () => {
	const items = [
		{
			title: 'Lorem ipsum',
			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id faucibus nulla. Ut id lectus mi. Suspendisse sagittis aliquam tortor quis elementum. Nullam tincidunt elementum velit, ut convallis nibh sollicitudin scelerisque. Donec in ligula ac arcu varius vehicula eget ut libero. Vivamus arcu neque, varius nec orci vel, iaculis vulputate quam. Duis maximus lectus vitae tortor molestie, vitae sagittis metus fermentum. Praesent non facilisis nisi, in volutpat mauris. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur sagittis, elit nec ornare dictum, massa mi finibus lorem, in tincidunt mauris diam non orci. Aenean non elementum leo. Proin mattis efficitur leo, ut consectetur sapien. Fusce sed mollis purus. Proin fringilla iaculis aliquam. Sed consectetur, dui eu congue auctor, risus velit pretium velit, nec euismod neque purus ac risus. Nullam ultricies neque id ante malesuada pharetra. Fusce et elit nisl. Quisque sollicitudin, risus vitae vehicula tempor, quam nisi sollicitudin turpis, vel ullamcorper augue eros at ante. Morbi ut mattis diam, nec pretium nibh. Nunc non mollis purus. Pellentesque ornare non sapien at venenatis. Etiam interdum feugiat nisi ac egestas. Donec ligula magna, dictum ut blandit non, iaculis id nisi. Duis malesuada arcu id vestibulum consectetur. Maecenas molestie porta orci eget pellentesque. Aenean et porttitor diam, nec fermentum erat. Nulla nibh ex, rhoncus quis hendrerit sit amet, sollicitudin id lectus. In quis accumsan massa. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed volutpat sapien non imperdiet luctus. Fusce malesuada feugiat dictum. Praesent hendrerit, felis a consequat feugiat, tellus elit aliquet nunc, in finibus lacus lacus a purus. Etiam nulla sapien, bibendum ac mi porta, hendrerit congue purus. Nam finibus sem eget urna vulputate laoreet. Morbi varius pretium placerat. Aliquam erat volutpat. Ut varius lacinia elit. Phasellus sollicitudin est a euismod facilisis. Donec aliquet iaculis turpis, congue varius turpis tristique eu. Sed sollicitudin venenatis risus, sed commodo mi mollis molestie. Nulla facilisi. Pellentesque eu sem elementum, varius justo at, porttitor libero. Pellentesque metus mauris, posuere id dolor id, mollis iaculis libero. Cras mollis lectus nec mauris suscipit, vitae sagittis urna consectetur. Quisque venenatis risus orci. Duis id ante cursus, maximus mauris ac, ultricies sem. Proin sit amet nulla nec ligula porttitor suscipit semper non lacus. Curabitur vestibulum auctor rutrum. Duis ac pellentesque purus, ut laoreet augue. Quisque eget nunc ante. Maecenas placerat tortor sit amet nisl rhoncus luctus. Aenean sit amet dui porttitor, hendrerit ex a, consectetur metus. Curabitur commodo porttitor turpis, et aliquet sem molestie vehicula. Pellentesque eget finibus lectus.'
		},
		{
			title: 'Lorem ipsum',
			content: ''
		},
		{
			title: 'Lorem ipsum',
			content: ''
		},
		{
			title: 'Lorem ipsum',
			content: ''
		}
	];

	return (
		<Row>
			<Col span={24}>
				<Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
					Accordion Investments
				</Divider>
				<div style={{ backgroundColor: '#020C22', padding: '0 20px', marginBottom: '100px' }}>
					<AccordionInvestments items={items}/>
				</div>
			</Col>
		</Row>
	)
}

export const VerticalNavs = () => {

	// ejemplo de array con items para el Nav
	const itemsMenu = [
		{key: 1, label: 'Resumen Ejecutivo', value: 'resumen-ejecutivo'},
		{key: 2, label: 'Detalle de las garantías', value: 'detalle-de-las-garantias'},
		{key: 3, label: 'Conclusiones', value: 'conclusiones'},
		{key: 4, label: 'Actualizaciones', value: 'actualizaciones'}
	];

	// control de flujo de cambio de estado valor seleccionado
	const [selectedValue, setSelectedValue] = useState('resumen-ejecutivo');
	// funcion de propiedad para detectar el cambio
	const changeValueSelected = (value) => {
		setSelectedValue(value);
	}

	return(
		<Row>
			<Col span={24} style={{ backgroundColor: colors.darkBlue, padding: '20px' }} >
				<Divider orientation="left" style={{ color: colors.white, fontWeight: titles.fontWeight }} >
					Tabs Lista Vertical 
				</Divider>
				<Space >
					<br />
					<br />
					<VerticalNav 
						className="o--vertical-listNav"
						itemsLista={itemsMenu}
						selectedValue={selectedValue}
						bgColor={colors.darkBlue}
						changeValueSelected={ changeValueSelected }
						/>
					<br />
					<br />
				</Space>
			</Col>
		</Row>
	);
};


export const Sidebar = () => {

	const items = [
		{ key: 1, title: 'Category', excerpt: 'Lorem ipsum Dolor Amet...', 
			date: '13 Jan, 2018', imgSrc: 'https://api.careers.govt.nz/assets/Posts/_resampled/ScaleWidthWyI3OTUiXQ/skype-job-interview-article-istock-id945746320.jpg',
			urlRedirect: 'https://api.careers.govt.nz/assets/Posts/_resampled/ScaleWidthWyI3OTUiXQ/skype-job-interview-article-istock-id945746320.jpg' },
		{ key: 2, title: 'Category', excerpt: 'Lorem ipsum Dolor Amet...', 
			date: '13 Jan, 2018', imgSrc: 'https://api.careers.govt.nz/assets/Posts/_resampled/ScaleWidthWyI3OTUiXQ/skype-job-interview-article-istock-id945746320.jpg',
			urlRedirect: 'https://api.careers.govt.nz/assets/Posts/_resampled/ScaleWidthWyI3OTUiXQ/skype-job-interview-article-istock-id945746320.jpg' },
		{ key: 3, title: 'Category', excerpt: 'Lorem ipsum Dolor Amet...', 
			date: '13 Jan, 2018', imgSrc: 'https://api.careers.govt.nz/assets/Posts/_resampled/ScaleWidthWyI3OTUiXQ/skype-job-interview-article-istock-id945746320.jpg',
			urlRedirect: 'https://api.careers.govt.nz/assets/Posts/_resampled/ScaleWidthWyI3OTUiXQ/skype-job-interview-article-istock-id945746320.jpg' },
	];

	return(
		<Row>
			<Col span={24} style={{ backgroundColor: colors.darkBlue, padding: '20px' }} >
				<Divider orientation="left" style={{ color: colors.white, fontWeight: titles.fontWeight }} >
					Sidebar 
				</Divider>
				<Space >
					<br />
					<br />
					<div style={{  }} >
						<SidebarComponent 
							className="o--sidebar"
							title={ 'Artículos Relacionados' }
							itemsRender={items}
							/>
					</div>
					<br />
					<br />
				</Space>
			</Col>
		</Row>
	);

}

export const MenuElement = () => {
	
	return(
		<Row>
			<Col span={24} style={{ backgroundColor: colors.darkBlue, padding: '20px' }} >
				<Divider orientation="left" style={{ color: colors.white, fontWeight: titles.fontWeight }} >
					Sidebar 
				</Divider>
				<Space >
					<br />
					<br />
					<div style={{  }} >
						<MenuComponent />
					</div>
					<br />
					<br />
				</Space>
			</Col>
		</Row>
	);
}

export const horizontalTabs = () => {
	const items = [
		{
			title: 'Lorem ipsum',
			content: ''
		},
		{
			title: 'Lorem ipsum',
			content: ''
		},
		{
			title: 'Lorem ipsum',
			content: ''
		},
		{
			title: 'Lorem ipsum',
			content: ''
		}
	];

	return (
		<Row>
			<Col span={24}>
				<Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
					Horizontal Tabs
				</Divider>
				<div style={{ backgroundColor: '#020C22', padding: '0 20px', marginBottom: '100px' }}>
					<HorizontalTabs items={items}/>
				</div>
			</Col>
		</Row>
	)
}

export const pieGraphic = () => {
	const data = [
        { name: 'Lorem ipsum', value: 50, description: 'Lorem ipsum', price: '00,00' },
        { name: 'Lorem ipsum', value: 30, description: 'Lorem ipsum', price: '00,00' },
        { name: 'Lorem ipsum', value: 40, description: 'Lorem ipsum', price: '00,00' },
		{ name: 'Lorem ipsum', value: 20, description: 'Lorem ipsum', price: '00,00' },
		{ name: 'Lorem ipsum', value: 10, description: 'Lorem ipsum', price: '00,00' }
	];
	return (
		<Row>
			<Col span={24}>
				<Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
					Pie Graphic
				</Divider>
				<div style={{ backgroundColor: '#020C22', padding: '0 20px', marginBottom: '100px' }}>
					<TestProvider>
						<PieGraphic data={data}/>
					</TestProvider>
				</div>
			</Col>
		</Row>
	)
}
	
export const logoutMenu = () => {
	const items = [
		{
			text: 'Lorem ipsum',
			url: '/'
		},
		{
			text: 'Lorem ipsum',
			url: '/'
		},
		{
			text: 'Lorem ipsum',
			url: '/'
		}
	];

	return (
		<Row>
			<Col span={24}>
				<Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
					Logout Menu
				</Divider>
				<div style={{ backgroundColor: '#020C22', paddingBottom: '100px' }}>
					<LogoutMenu items={items}/>
				</div>
			</Col>
		</Row>
	)
}

export const linesGraphic = () => {
	const data = [
		{year: 'Jul 2019', value1: 50000.00, value2: 13000.00},
		{year: 'Ago 2019', value1: 55000.00, value2: 7000.00},
		{year: 'Set 2019', value1: 150000.00, value2: 16000.00},
		{year: 'Oct 2019', value1: 75000.00, value2: 5000.00},
		{year: 'Nov 2019', value1: 180000.00, value2: 13000.00},
		{year: 'Dic 2019', value1: 50000.00, value2: 18000.00}
	];

	  return (
		<Row>
			<Col span={24}>
				<Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
					Lines Graphic
				</Divider>
				<div style={{ backgroundColor: '#020C22', padding: '0 20px', marginBottom: '100px', height: '1000px' }}>
					<LinesGraphic data={data}/>
				</div>
			</Col>
		</Row>
	)
}

export const PersonaInfoCardElement = () => {

	const data = {
		"key": "xx00",
		"nombres": "Nombre",
		"apellidos": "APELLIDO APELLIDO",
		"avatar": 'https://image.freepik.com/vector-gratis/perfil-avatar-hombre-icono-redondo_24640-14044.jpg',
		"code": "1-8760-0455",
		"mail": "ejemplo@ejemplo.com",
		"telefono": "2222-2222",
		"birthday": "10/10/1980",
		"nacionalidad": "nacionalidad",
		"cuenta_bancaria": "000XXX",
		"cuentas_asociadas" : [
			{
				"title_accordion_close": "Cuentas asociadas al perfil",
				"title_accordion_open": "Sociedades Asociadas",
				"items": [
					{
						"_id": 1,
						"cuenta_code": "00-657",
						"nameItem": "Cuenta 1",
						"valorItem": "cuenta_1"
					},
					{
						"_id": 2,
						"cuenta_code": "00-657",
						"nameItem": "Cuenta 2",
						"valorItem": "cuenta_2"
					},
					{
						"_id": 3,
						"cuenta_code": "00-657",
						"nameItem": "Cuenta 3",
						"valorItem": "cuenta_3"
					}
				]
			}
		]
	};

	// Uso esto hooks para probar que los metodos están funcionando

	// useEffect(() => {
	// 	console.log( ctrlEditarInfoModal );
	// }, [ctrlEditarInfoModal]);

	// useEffect(() => {
	// 	console.log( ctrlCerrarSesionModal );
	// }, [ctrlCerrarSesionModal]);

	// useEffect(() => {
	// 	console.log( ctrlSociedadSelected );
	// }, [ctrlSociedadSelected]);
	return(

		<Row>
			<Col span={24} style={{ backgroundColor: colors.blackBlue, padding: '20px' }} >
				<Divider orientation="left" style={{ color: colors.white, fontWeight: titles.fontWeight }} >
					Persona Info Card 
				</Divider>
				<Space >
					<br />
					<br />
					<div style={{ width: 'calc(100vw/2)' }}>
						<PersonaInfoCardComponent 
							className={'o--persona--infoCard'}
							bgcolor={colors.blue}
							data={data}
							/>
					</div>
					<br />
					<br />
				</Space>
			</Col>
		</Row>

	);

}


export const VerticalGroupCardsElement = () => {

	const data = {
		"title": "Notas relevantes",
		"items": [
			{ _id: 1, date: "30 May, 2020", title: "Título", excerpt: "Lorem ipsum dolor sit amet, consectetur", uriPost: "#",  },
			{ _id: 2, date: "30 May, 2020", title: "Título", excerpt: "Lorem ipsum dolor sit amet, consectetur", uriPost: "#",  },
			{ _id: 3, date: "30 May, 2020", title: "Título", excerpt: "Lorem ipsum dolor sit amet, consectetur", uriPost: "#",  },
			{ _id: 4, date: "30 May, 2020", title: "Título", excerpt: "Lorem ipsum dolor sit amet, consectetur", uriPost: "#",  },
			{ _id: 5, date: "30 May, 2020", title: "Título", excerpt: "Lorem ipsum dolor sit amet, consectetur", uriPost: "#",  },
		]
	};


	return(
		<Row>
			<Col span={24} style={{ backgroundColor: colors.blackBlue, padding: '20px' }} >
				<Divider orientation="left" style={{ color: colors.white, fontWeight: titles.fontWeight }} >
					Vertical Group Cards
				</Divider>
				<Space >
					<br />
					<br />
					<div style={{ width: 'calc(100vw/4)', height: '500px' }} >
						<VerticalGroupCards 
							className='o-vertical-group-cards'
							data={data}
						/>
					</div>
					<br />
					<br />
				</Space>
			</Col>
		</Row>
	);

}

export const ProfileCardOrganism = () => {
	return(
		<Row>
			<GlobalStyle/>
			<Col span={24} style={{ backgroundColor: colors.blackBlue, padding: '20px' }} >
				<Divider orientation="left" style={{ color: colors.white, fontWeight: titles.fontWeight }} >
					Profile Card
				</Divider>
				<Col xs={24}>
					<ProfileCard 
						title="Informacion Personal"
					/>
				</Col>
			</Col>
		</Row>
	);



}


export const MiniProfileMenuElement = () => {

	const dataSociedadesProfile = {
		title: 'Sociedades',
		avatar: 'https://st2.depositphotos.com/1007566/12294/v/950/depositphotos_122942480-stock-illustration-avatar-man-cartoon.jpg',
		sociedades: [
			{ _id: 1, nameItem: 'Sociedad 1', valorItem: 'sociedad_1', extra: 'extra...' },
			{ _id: 2, nameItem: 'Sociedad 2', valorItem: 'sociedad_2', extra: 'extra...' },
			{ _id: 3, nameItem: 'Sociedad 3', valorItem: 'sociedad_3', extra: 'extra...' }
		],
		hasNotifies: true
	};

	const [sociedadSelected, setSociedadSelected] = useState('sociedad_1');

	const changeSociedadSelected = (newVal) => {
		// console.log(newVal);
		setSociedadSelected(newVal);
	}

	const changeClickedProfile = (newVal) => {
		// console.log(newVal);
	}

	const changeClickedNotify = (newVal) => {
		// console.log('notify', newVal);
	}

	// Hooks que uso para probar las funciones 

	// useEffect(() => {
	// 	console.log( sociedadSelected );
	// }, [sociedadSelected]);	
	

	return(
		<Row>
			<Col span={24} style={{ backgroundColor: colors.blackBlue, padding: '20px' }} >
				<Divider orientation="left" style={{ color: colors.white, fontWeight: titles.fontWeight }} >
					Profile mini menú
				</Divider>
				<Space >
					<br />
					<br />
					<div style={{ width: 'calc(100vw/3)', }}>
						<MiniProfileMenu 
							
							dataSoc={dataSociedadesProfile}
							sociedadSelected={sociedadSelected}
							changeSociedadSelected={changeSociedadSelected}
							changeClickedProfile={changeClickedProfile}
							changeClickedNotify={changeClickedNotify}
							/>
					</div>
					<br />
					<br />
				</Space>
			</Col>
		</Row>
	);

}



export const TableGroupElement = () => {

	const data = {
		key: '1',
		code: 'XXXX',
		deudor: 'Nombre del deudor',
		cedula: '1-14270455',
		telefono: '8888-8888',
		direccion: 'Lorem ipsum dolor',
		principal: '1500000',
		tasa_fija_anual: '12',
		tasa_mora_anual: '15.6',
		late_payment_fee: '5',
		moneda: 'USD',
		tasa_mensual: '1.00',
		plazo_meses: '12',
		ultimo_pago: '12-12-2020'
	};
	
	return(
		<Row>
			<Col span={24} style={{ backgroundColor: colors.blackBlue, padding: '20px' }} >
				<Divider orientation="left" style={{ color: colors.white, fontWeight: titles.fontWeight }} >
					Table Group 
				</Divider>
				<Space>
					<br />
					<br />
					<div style={{ width: 'calc(100vw/2)' }} >
						<TableGroupComponent 
							className='o-table-group'
							data={data}	/>
					</div>
					<br />
					<br />
				</Space>
			</Col>
		</Row>
	);

}



export const ProbeToPDF = () => {

	// Invocación al hook de referencia
	const componentRef = useRef();

	const data = {
		key: '1',
		code: 'XXXX',
		deudor: 'Nombre del deudor',
		cedula: '1-14270455',
		telefono: '8888-8888',
		direccion: 'Lorem ipsum dolor',
		principal: '1500000',
		tasa_fija_anual: '12',
		tasa_mora_anual: '15.6',
		late_payment_fee: '5',
		moneda: 'USD',
		tasa_mensual: '1.00',
		plazo_meses: '12',
		ultimo_pago: '12-12-2020'
	};

	const dataGraphics = [
		{year: 'Jul 2019', value1: 50000.00, value2: 13000.00},
		{year: 'Ago 2019', value1: 55000.00, value2: 7000.00},
		{year: 'Set 2019', value1: 150000.00, value2: 16000.00},
		{year: 'Oct 2019', value1: 75000.00, value2: 5000.00},
		{year: 'Nov 2019', value1: 180000.00, value2: 13000.00},
		{year: 'Dic 2019', value1: 50000.00, value2: 18000.00}
	];

	const ReturnToPDF = (
		<div ref={componentRef} style={{ display: 'block' }} >
			<div style={{ display: 'flex', flexDirection: 'column', backgroundColor: colors.blackBlue,
									justifyContent: 'center', alignContent: 'center', alignItems: 'center',  }} >
				<h1 style={{ color: colors.white }} >Tabla de contenido</h1>
				<h2 style={{ color: colors.white }} >Resumen de cuenta</h2>
				<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center',
								alignItems: 'center', width: '80%' }} > 
					<TableGroupComponent 
						className='o-table-group'
						data={data}	/>
					<br />
					<LinesGraphic data={dataGraphics} />
					<span style={{ marginBottom: '300px' }} ></span>
					<TableGroupComponent 
						className='o-table-group'
						data={data}	/>
					<br />
					<LinesGraphic data={dataGraphics} />
					<span style={{ marginBottom: '300px' }} ></span>
					<TableGroupComponent 
						className='o-table-group'
						data={data}	/>
					<br />
					<LinesGraphic data={dataGraphics} />
				</div>
			</div>
		</div>
	);

	return(
		<Row>
			<Col span={24} style={{ backgroundColor: colors.blackBlue, padding: '20px' }} >
				<Divider orientation="left" style={{ color: colors.white, fontWeight: titles.fontWeight }} >
					HTML TO PDF 
				</Divider>
				<Space>
				<div style={{ width: 'calc(100vw/2)', border: 'solid 1px #FFF', display: 'flex', flexDirection: 'column', 
								justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} >

					{ /* Componente de captura de documento a PDF */ }
					<ReactToPrint
							trigger={ () => <span style={{ color: '#1abc9c', fontSize: '25px', 
															fontWeight: 'bold', borderBottom: 'solid 1px #FFF',
															marginBottom: '25px', cursor: 'pointer'
															}} >Guardar</span> }
							content={() => componentRef.current}
							documentTitle="example--document.pdf"
						/>

					{ /** Contenido a llevar al documento solo colocar la referencia */ }
					{ ReturnToPDF }
					
				</div>
				</Space>
			</Col>
		</Row>
	);

}