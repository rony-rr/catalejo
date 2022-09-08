import React from 'react';
import { Row, Col, Divider, Space, Select, Input, Form } from 'antd';
import { ButtonComponent } from '../app/components/Atoms/Buttons';
import { TitleComponent } from '../app/components/Atoms/Titles';
import { SVGIconTripleArrowUp, SVGIconConsolidatedPosition, SVGIconInvestments, SVGIconOpportunities, SVGIconBlog, SVGIconInvestorServicesProgram, SVGIconSOS, SVGIconBell, SVGIconSuccess, SVGIconWarning, SVGIconTrash, SVGIconMail, SVGIconPhone, SVGIconFacebook, SVGIconWhatsApp, SVGIconTwitter } from '../app/components/Atoms/Icons';
import GlobalStyle from '../app/styles/basic/general';
import { colors } from '../app/styles/basic/colors';
import { paragraph, titles } from '../app/styles/basic/fonts';
import { ParagraphComponent } from '../app/components/Atoms/Paragraphs';
import { AvatarComponent } from '../app/components/Atoms/Avatar';
import { SVGLogoLarge, SVGLogoHeader, SVGLogoMenu, SVGLogoSmall } from '../app/components/Atoms/Logo';
import { NavItem } from '../app/components/Atoms/NavItem';

export default { title: 'Atoms' };

const { Option } = Select;
const { Search } = Input;

export const buttons = () => (
	<Row>
		<Col span={24}>
			<Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
				Buttons
			</Divider>
			<Space>
				<br />
				<ButtonComponent className="a-btn--bgLight" text="Hablemos" />
				< br />
				<ButtonComponent className="a-btn--bgBlue" text="Iniciar sesión" />
				<br />
				<ButtonComponent className="a-btn--bgYellowTransparent" text="tema" />
				<br />
				<ButtonComponent className="a-btn--bgGray" text="Log out" />
				<br />
				<ButtonComponent className="a-btn--bgTransparent" text="Cancelar" />
				<br />
				<ButtonComponent className="a-btn--linkYellowBottom" text="Leer más" />
				<br />
				<ButtonComponent className="a-btn--linkRedBottom" text="Eliminar" />
				<br />
				<ButtonComponent className="a-btn--bgYellow" text="Enviar" />
				<br />
				<ButtonComponent className="a-btn--linkLightBottom" text="Enviar" />
			</Space>
		</Col>
	</Row>
);

export const titulos = () => (
	<Row>
		<Col span={24} style={{ backgroundColor: colors.darkBlue }}>
			<Divider orientation="left" style={{ color: colors.white, fontWeight: titles.fontWeight, }}>
				Titles
			</Divider>
			<Space>
				<br />
				<TitleComponent className="a-title--light" level={1}>h1 Titulo</TitleComponent>
				<br />
				<TitleComponent className="a-title--light" level={2}>h2 Titulo</TitleComponent>
				<br />
				<TitleComponent className="a-title--light" level={3}>h3 Titulo</TitleComponent>
				<br />
				<TitleComponent className="a-title--light" level={4}>h4 Titulo</TitleComponent>
				<br />
				<TitleComponent className="a-title--light" level={5}>h5 Titulo</TitleComponent>
				<br />
				<TitleComponent className="a-title--light--thin" level={2}>h2 Titulo Delgado</TitleComponent>
				<br />
				<TitleComponent className="a-title--yellow" level={2}>h2 Titulo Amarillo</TitleComponent>
				<br />
				<TitleComponent className="a-title--yellow--thin" level={2}>h2 Titulo Amarillo Delgado</TitleComponent>
			</Space>
		</Col>
	</Row>
);

export const Avatar = () => (
	<Row>
		<Col span={24}>
			<Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
				Avatars
			</Divider>
			<Space>
				<br />
				<AvatarComponent className='a-avatar--bg' size={64} icon={'https://image.freepik.com/vector-gratis/perfil-avatar-hombre-icono-redondo_24640-14044.jpg'} />
				<br />
				<AvatarComponent className='a-avatar--sm' size={'large'} icon={'https://st2.depositphotos.com/1007566/12294/v/950/depositphotos_122942480-stock-illustration-avatar-man-cartoon.jpg'} />
			</Space>
		</Col>
	</Row>
);

export const Icons = () => (
	<Row>
		<Col span={24}>
			<Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
				Icons
			</Divider>
			<Space>
				<br />
				<SVGIconTripleArrowUp/>
				<br />
				<SVGIconConsolidatedPosition/>
				<br />
				<SVGIconInvestments/>
				<br />
				<SVGIconOpportunities/>
				<br />
				<SVGIconBlog/>
				<br />
				<SVGIconInvestorServicesProgram/>
				<br />
				<SVGIconSOS/>
				<br />
				<SVGIconBell/>
				<br />
				<SVGIconSuccess/>
				<br />
				<SVGIconWarning/>
				<br />
				<SVGIconTrash/>
				<br />
				<SVGIconMail/>
				<br />
				<SVGIconPhone/>
				<br />
				<SVGIconFacebook/>
				<br />
				<SVGIconWhatsApp/>
				<br />
				<SVGIconTwitter/>
			</Space>
		</Col>
	</Row>
);

export const inputs = () => (
	<div >
		<Row>
			<GlobalStyle />
			<Col span={24}>
				<Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
					Inputs
				</Divider>
				<Space style={{ backgroundColor: '#08183a', fontWeight: 'normal' }}>
					<br />
					<p style={{ color: '#fff' }}>Input</p>
					<Input />
					<br />
					<p style={{ color: '#fff' }}>Input Email</p>
					<Input type="email" placeholder="example@email.com"/>
					<br />
					<p style={{ color: '#fff' }}>Input Number</p>
					<Input type="number" placeholder="22222222"/>
					<br />
					<p style={{ color: '#fff' }}>Input Password</p>
					<Input type="password"/>
					<Search/>
					<br />
					<p style={{ color: '#fff' }}>Select</p>
					<Select defaultValue="Select">
						<Option value="value 1">Value 1</Option>
						<Option value="value 2">Value 2</Option>
						<Option value="disabled" disabled>
							Disabled
						</Option>
					</Select>
				</Space>
			</Col>
		</Row>
	</div>
);

export const Logo = () => (
	<Row>
		<Col span={24}>
			<Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
				Logo
			</Divider>
			<Space style={{ backgroundColor: '#020C22' }}>
				<br />
				<SVGLogoLarge/>
				<br />
				<SVGLogoHeader/>
				<br />
				<SVGLogoMenu/>
				<br />
				<SVGLogoSmall/>
			</Space>
		</Col>
	</Row>
);

export const Labels = () => (
	<Row>
		<GlobalStyle />
		<Col span={24}>
			<Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
				Labels
			</Divider>
			<Space style={{ backgroundColor: '#020C22', padding: '0 20px' }}>
				<br />
				<Form.Item
					label="Label"
				>
				</Form.Item>
			</Space>
		</Col>
	</Row>
);

export const NavItems = () => (
	<Row>
		<GlobalStyle />
		<Col span={24}>
			<Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
				Nav Item
			</Divider>
			<Space style={{ backgroundColor: '#020C22', padding: '0 20px' }}>
				<br />
				<NavItem text="NavItem Text" />
			</Space>
		</Col>
	</Row>
);

export const Texts = () => (
	<Row>
		<Col span={24}>
			<Divider orientation="left" style={{ color: '#333', fontWeight: 'bold' }}>
				Textos y Parráfos
			</Divider>
			<Space>
				<br />
				<ParagraphComponent className="a-paragraph--light">
					Lorem Ipsum is simply dummy text of the printing and typesetting industry.
					Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
				</ParagraphComponent>
				<ParagraphComponent className="a-paragraph--light bold--paragraph">
					Lorem Ipsum is simply dummy text of the printing and typesetting industry.
					Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
				</ParagraphComponent>
				<ParagraphComponent className="a-paragraph--dark">
					Lorem Ipsum is simply dummy text of the printing and typesetting industry.
					Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
				</ParagraphComponent>
				<ParagraphComponent className="a-paragraph--yellow">
					Lorem Ipsum is simply dummy text of the printing and typesetting industry.
					Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
				</ParagraphComponent>
				<ParagraphComponent className="a-paragraph--green">
					Lorem Ipsum is simply dummy text of the printing and typesetting industry.
					Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
				</ParagraphComponent>
				<ParagraphComponent className="a-paragraph--gray custom--bold" boldCustom={500}>
					Lorem Ipsum is simply dummy text of the printing and typesetting industry.
					Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
				</ParagraphComponent>
				<ParagraphComponent className="a-paragraph--red custom--bold" boldCustom={600}>
					Lorem Ipsum is simply dummy text of the printing and typesetting industry.
					Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
				</ParagraphComponent>
			</Space>
		</Col>
	</Row>
);
