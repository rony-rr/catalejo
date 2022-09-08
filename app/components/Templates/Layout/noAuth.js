import React, { Fragment } from 'react';
import { LogoutMenu } from '../../Organisms/Menu';

const LayoutNoAuth = ({ className = '', children, isHomePage = false }) => {
	let classNames = ['Site-content', className].join(' ');

	return (
		<>
			{
				isHomePage ?
					<LogoutMenu items={[
						{
							text: 'Sobre nosotros',
							url: '/sobre-nosotros'
						},
						{
							text: 'News & tips',
							url: '/blog'
						},
						{
							text: 'Ingresar',
							url: '/'
						}
					]}/>
					: ''
			}
			<div className={classNames}>
				<div className="main-container">{children}</div>
			</div>
		</>
	);
};

export default LayoutNoAuth
