import React, { useState } from 'react';
import { Row, Col, Divider, Space, Menu, Layout, Form, Input } from 'antd';
import { UserOutlined, VideoCameraOutlined, UploadOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Container } from 'react-grid-system';

import GlobalStyle from '../app/styles/basic/general';
import { paragraph, titles } from '../app/styles/basic/fonts';
import { colors } from '../app/styles/basic/colors';
import { DropdownComponent, DropdownComponentCalendar } from '../app/components/Molecules/Dropdowns';
import { MenuItemNavIconComponent } from '../app/components/Molecules/NavIconText';
import { Card, CardForm, CardTotalBox, CardGraphics, CardMultipleContainer, CardMessage } from '../app/components/Molecules/Cards';
import { CalendarComponentDays, CalendarComponentMonths, CalendarComponentSimpleDay } from '../app/components/Molecules/Calendars';

const { Header, Sider, Content } = Layout;

export default { title: 'Molecules' };

const arrayItemsDropdownExample = [
	{ _id: 1, nameItem: 'Elemento 1', valorItem: 'value_1', extra: 'extra' },
	{ _id: 2, nameItem: 'Elemento 2', valorItem: 'value_2', extra: 'extra' },
	{ _id: 3, nameItem: 'Elemento 3', valorItem: 'value_3', extra: 'extra' }
];

export const cards = () => (
	<Row>
		<GlobalStyle />
		<Col span={24}>
			<Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }} >
				Labels
			</Divider>
			<Space style={{ backgroundColor: '#020C22', padding: '0 20px' }} >
				<br />
				<Container>
					<Row>
						<Col xs={12}>
							<Card title="Lorem ipsum dolor sit amet, consectetur" 
								description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, con sectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, con sectetur adipiscing elit, sed do eiusmod." 
								isLarge={true} className="m-card--large" url="#" share={false}/>
						</Col>
					</Row>
					<br />
					<Row>
						<Col xs={12}>
							<Card title="Lorem ipsum dolor sit amet, consectetur" 
								description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, con sectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, con sectetur adipiscing elit, sed do eiusmod."  
								className="m-card--small" url="#" share={true}/>
						</Col>
					</Row>
					<br />
					<Row>
						<Col xs={9}>
							<CardForm title="Lorem ipsum" 
								cta="CTA Text">
									<Form.Item
										label="Label"
									>
										<Input/>
									</Form.Item>
									<Form.Item
										label="Label"
									>
										<Input/>
									</Form.Item>
									<Form.Item
										label="Label"
									>
										<Input/>
									</Form.Item>
							</CardForm>
						</Col>
					</Row>
					<br />
					<Row>
						<Col xs={9}>
							<CardTotalBox title="Lorem ipsum" subTitle="Lorem ipsum ipsum" total="00,000"
								url="true" urlText="Lorem ipsum" options="true" negativeValue="1,000" date="Lorem ipsum ipsum"/>
						</Col>
					</Row>
					<br />
					<Row>
						<Col xs={24}>
							<CardGraphics title="Lorem ipsum" investedCapital="1 000 000,00" yields="10 000,00" footerLabel="*Promedio de los últimos 12 meses"/>
						</Col>
					</Row>
					<br />
					<Row>
						<Col xs={12}>
							<CardMultipleContainer>
								<Card title="Lorem ipsum dolor sit amet, consectetur" 
									description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, con sectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, con sectetur adipiscing elit, sed do eiusmod."  
									className="m-card--small" url="#" share={true}/>
								<Card title="Lorem ipsum dolor sit amet, consectetur" 
									description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, con sectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, con sectetur adipiscing elit, sed do eiusmod."  
									className="m-card--small" url="#" share={true}/>
								<Card title="Lorem ipsum dolor sit amet, consectetur" 
									description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, con sectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, con sectetur adipiscing elit, sed do eiusmod."  
									className="m-card--small" url="#" share={true}/>
							</CardMultipleContainer>
						</Col>
					</Row>
					<br />
					<Row>
						<Col xs={12}>
							<CardMessage name="autor"/>
						</Col>
					</Row>
				</Container>
			</Space>
		</Col>
	</Row>
);




export const dropdowns = () => (

	<Row>
		<Col span={24} style={{ backgroundColor: colors.darkBlue, padding: '20px' }} >
			<Divider orientation="left" style={{ color: colors.white, fontWeight: titles.fontWeight }}>
				Dropdowns
			</Divider>
			<Space >
				<DropdownComponent className="m-dropdown--SimpleTransparent" items={ arrayItemsDropdownExample } label={'Seleccione...'} />
				<br />
				<DropdownComponent className="m-dropdown--SimpleTransparent" items={ arrayItemsDropdownExample } clickFlag={ 1 } label={'Seleccione'} />
				<br />
				<DropdownComponent className="m-dropdown--WhiteBg" items={ arrayItemsDropdownExample } label={'Seleccione'} />
				<br />
				<DropdownComponent className="m-dropdown--WhiteBg" items={ arrayItemsDropdownExample } clickFlag={ 1 } label={'Seleccione'} />
				<br />
				<DropdownComponent className="m-dropdown--yellowText" items={ arrayItemsDropdownExample } label={'Seleccione el mes'} />
				<br />
				<DropdownComponent className="m-dropdown--yellowText" items={ arrayItemsDropdownExample } clickFlag={ 1 } label={'Seleccione el mes'} />
				<br />
				<DropdownComponentCalendar className="m-dropdown--YellowBg" clickFlag={ 1 } label={'Seleccione'} />
				<br />
				<DropdownComponentCalendar className="m-dropdown--YellowBg" label={'Seleccione'} />
			</Space>
		</Col>
	</Row>
);


export const navIconText = () => {

	const [collapsed, setCollapsed] = useState(false);
	const [selectVal, SetChangeVal] = useState('1');

	const changeStateSelectVal = (val) => {
        SetChangeVal(val);
    }
	
	return(
			<Row>
				<Col span={24} style={{ backgroundColor: colors.darkBlue, padding: '20px' }} >
					<Divider orientation="left" style={{ color: colors.white, fontWeight: titles.fontWeight }} >
						Nav Icon Text Item
					</Divider>
					<Space>
						<Menu theme="dark" mode="inline" style={{  backgroundColor: colors.darkBlue }} >
							<MenuItemNavIconComponent 
								className="m-navicontext--simple" 
								key={1}
								label={'Nav Icon Text'} 
								icon={ <VideoCameraOutlined /> } 
								value={'value_field1'} 
								onClick={ () => { changeStateSelectVal('value_field1'); }} /> 
							
							<MenuItemNavIconComponent 
								className="m-navicontext--simple selected" 
								keyN={2}
								label={'Nav Icon Text'} 
								icon={ <UploadOutlined /> } 
								value={'value_field2'}
								onClick={ () => { changeStateSelectVal('value_field2'); }} /> 
							
							<MenuItemNavIconComponent 
								className="m-navicontext--yellow" 
								keyN={2}
								label={'Nav Icon Text'} 
								icon={ <UploadOutlined /> } 
								value={'value_field3'}
								onClick={ () => { changeStateSelectVal('value_field3'); }} /> 
						</Menu>
					</Space>

					<br /><br />

					{/* Este es de ejemplo de cómo se verá el mnú al crear los organismos */}
					<Space>
						<Layout>
							<Sider trigger={null} collapsible collapsed={collapsed} style={{ maxWidth: 'auto', minWidth: 'auto', width: 'auto' }} >
								<div className="logo" />
								<span onClick={ () => { setCollapsed(!collapsed); }} style={{ color: colors.white, fontSize: '20px', cursor: 'pointer' }}>X</span>

								<Menu theme="dark" mode="inline" >
									<MenuItemNavIconComponent 
										className="m-navicontext--simple" 
										key={1}
										label={'Item'} 
										icon={ <VideoCameraOutlined /> } 
										value={'1'} 
										collapsed={collapsed} 
										onClick={ () => { changeStateSelectVal('1'); }} /> 
									<MenuItemNavIconComponent 
										key={2}
										className="m-navicontext--simple selected" 
										label={'Item'} 
										icon={ <UploadOutlined /> } 
										value={'2'} 
										collapsed={collapsed} 
										onClick={ () => { changeStateSelectVal('2'); }} /> 
									<MenuItemNavIconComponent 
										key={3}
										className="m-navicontext--simple" 
										label={'Item'} 
										icon={ <UploadOutlined /> } 
										value={'3'} 
										collapsed={collapsed}
										onClick={ () => { changeStateSelectVal('3'); }} /> 
								</Menu>
							</Sider>
						</Layout>
					</Space>
				</Col>
			</Row>
	);
}


export const Calendar = () => {

	const [currentDate, setCurrentDate ] = useState();

	const changeDateSelect = (currentVal) => {
		setCurrentDate(currentVal);
		// console.log( currentVal );
	}

	return(
		
		<Row>
			<Col span={24} style={{ backgroundColor: colors.darkBlue, padding: '20px' }} >
				<Divider orientation="left" style={{ color: colors.white, fontWeight: titles.fontWeight }} >
					Calendars
				</Divider>
				<Space>
					<CalendarComponentDays className="m-calendar--Simple" />
					<br />
					<CalendarComponentMonths className="m-calendar--Simple" year={2020} />
					<br />
					<CalendarComponentSimpleDay 
						className="m-calendar--Simple_day"
						changeDateSelect={changeDateSelect} />
				</Space>
			</Col>
		</Row>

	);

}