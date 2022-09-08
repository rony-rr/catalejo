import React, { Component } from 'react';
import { Result, Button } from 'antd';

class Error extends Component {
	static getInitialProps({ res, err }) {
		const statusCode = res ? res.statusCode : err ? err.statusCode : null;
		return { statusCode };
	}

	render() {
		const statusCode = this.props.statusCode;
		const text = statusCode === 500 ? 'Lo sentimos, error en el servidor' : 'Lo sentimos, la página que buscas no existe.';

		return (
			<Result
				status={statusCode}
				title={statusCode}
				subTitle={text}
				extra={
					<Button type="primary" href="/">
						Regresar al inicio
					</Button>
				}
			/>
		);
	}
}

export default Error;
