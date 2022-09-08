import React from 'react';
import styled from 'styled-components';
import { Row, Col, Space, Divider } from 'antd';
import { colors } from '../app/styles/basic/colors';
import { paragraph, titles } from '../app/styles/basic/fonts';
import GlobalStyle from '../app/styles/basic/general';

export default { title: 'General' };

const Circle = styled.div`
	height: 100px;
	width: 100px;
	border-radius: 50%;
	text-align: center;
	margin: 0 auto;
`;

export const baseColors = () => (
	<div>
		<Row>
			<Col span={24}>
				<Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
					Colors
				</Divider>
			</Col>
		</Row>

		<Row
			style={{
				textAlign: 'center',
				margin: 'auto'
			}}
		>
			<Space>
				<Row>
					<Col>
						<ul>
							<li>path: import colors from '../app/styles/basic/colors' </li>
							<li>usage: colors.black</li>
						</ul>
						<Circle style={{ backgroundColor: colors.black }} />
					</Col>
					<Col>
						<ul>
							<li>path: import colors from '../app/styles/basic/colors' </li>
							<li>usage: colors.white</li>
						</ul>
						<Circle style={{ backgroundColor: colors.white }} />
					</Col>
					<Col>
						<ul>
							<li>path: import colors from '../app/styles/basic/colors' </li>
							<li>usage: colors.blackBlue</li>
						</ul>
						<Circle style={{ backgroundColor: colors.blackBlue }} />
					</Col>
					<Col>
						<ul>
							<li>path: import colors from '../app/styles/basic/colors' </li>
							<li>usage: colors.darkBlue</li>
						</ul>
						<Circle style={{ backgroundColor: colors.darkBlue }} />
					</Col>
					<Col>
						<ul>
							<li>path: import colors from '../app/styles/basic/colors' </li>
							<li>usage: colors.blue</li>
						</ul>
						<Circle style={{ backgroundColor: colors.blue }} />
					</Col>
					<Col>
						<ul>
							<li>path: import colors from '../app/styles/basic/colors' </li>
							<li>usage: colors.yellow</li>
						</ul>
						<Circle style={{ backgroundColor: colors.yellow }} />
					</Col>
					<Col>
						<ul>
							<li>path: import colors from '../app/styles/basic/colors' </li>
							<li>usage: colors.red</li>
						</ul>
						<Circle style={{ backgroundColor: colors.red }} />
					</Col>
					<Col>
						<ul>
							<li>path: import colors from '../app/styles/basic/colors' </li>
							<li>usage: colors.gray</li>
						</ul>
						<Circle style={{ backgroundColor: colors.gray }} />
					</Col>
					<Col>
						<ul>
							<li>path: import colors from '../app/styles/basic/colors' </li>
							<li>usage: colors.purple</li>
						</ul>
						<Circle style={{ backgroundColor: colors.purple }} />
					</Col>
					<Col>
						<ul>
							<li>path: import colors from '../app/styles/basic/colors' </li>
							<li>usage: colors.lightBlue</li>
						</ul>
						<Circle style={{ backgroundColor: colors.lightBlue }} />
					</Col>
					<Col>
						<ul>
							<li>path: import colors from '../app/styles/basic/colors' </li>
							<li>usage: colors.strongBlue</li>
						</ul>
						<Circle style={{ backgroundColor: colors.strongBlue }} />
					</Col>
					<Col>
						<ul>
							<li>path: import colors from '../app/styles/basic/colors' </li>
							<li>usage: colors.green</li>
						</ul>
						<Circle style={{ backgroundColor: colors.green }} />
					</Col>
				</Row>
			</Space>
		</Row>
	</div>
);

export const Fonts = () => (
	<div>
		<GlobalStyle />
		<Row>
			<Col span={24}>
				<Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
					Typography
				</Divider>
			</Col>
		</Row>
		<Row>
			<Col span={24}>
				<h1>Font - Futura</h1>
				<p>
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
					industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
					and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
					leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
					with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
					publishing software like Aldus PageMaker including versions of Lorem Ipsum.
				</p>
			</Col>
			<Col span={24}>
				<Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
					Title
				</Divider>
			</Col>
			<Col span={24}>
				<h1>Title h1</h1>
				<h2>Title h2</h2>
			</Col>
		</Row>
	</div>
);


export const CustomFonts = () => (
	<div>
		<GlobalStyle />
		<Row>
			<Col span={24}>
				<Divider orientation="left" style={{ color: '#333', fontWeight: titles.fontWeight, fontFamily: titles.fontFamily }}>
					Titles
				</Divider>
			</Col>
		</Row>
		<Row>
			<Col span={24}>
				<h1 style={{ fontFamily: titles.fontFamily, fontSize: titles.fontSize, fontWeight: titles.fontWeight }}>Font - Futura</h1>
				<p style={{ fontFamily: paragraph.fontFamily, fontSize: paragraph.fontSize, fontWeight: paragraph.fontWeight, lineHeight: paragraph.lineHeight }}>
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
					industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
					and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
					leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
					with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
					publishing software like Aldus PageMaker including versions of Lorem Ipsum.
				</p>
			</Col>
		</Row>
	</div>
);