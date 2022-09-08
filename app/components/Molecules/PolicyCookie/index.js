import React from 'react';
import _ from 'lodash';
import { Alert } from 'antd';

import Cookies from 'universal-cookie';

const PolicyCookie = () => {
	const onClose = () => {
		const cookies = new Cookies();
		cookies.set('displayPolicyCookie', true);
	};

	return (
		<div className="policy-cookie">
			<Alert message="Texto" type="warning" closeText={'closeText'} closable afterClose={onClose} />
		</div>
	);
};

export default PolicyCookie;
