import React, { useState } from 'react';
import { Form, Input, notification } from 'antd';
import Router from 'next/router';
import Link from 'next/link';

import { CardForm } from '../../Molecules/Cards';
import { useAuth } from '../../../apollo/authentication';

const FormLogin = () => {
		const [state, setstate] = useState('');
		const { signin } = useAuth();

		// Loading, Error, Success
		const Loading = state === 'Loading';
		const Error = state === 'Error';

		const onFinish = async values => {
			const { password, email } = values;
			setstate('Loading');

			try {
				const { errors } = await signin({ variables: { email, password } });
				if(errors){
					setstate('');
					notification['error']({
						message: 'Error',
						description:
							'Email o contraseña incorrecta'
					})
				}else{
					setstate('Success');
					Router.push('/select-account');
				}
			} catch (error) {
				setstate('Error');
			}
		};

    return(
			<CardForm
				name="FormLogin"
				title="Ingresar"
				onFinish={onFinish}
				disabled
				loading={Loading}
				error={Error}
				cta="Iniciar sesión">
					<Form.Item
							label="Email"
							name="email"
							type="email"
							rules={[{ required: true, message: 'Ingrese un correo valido', type: 'email' }]}
					>
							<Input htmlFor="email" placeholder="example@email.com" disabled={Loading}/>
					</Form.Item>
					<Form.Item
							label="Contraseña"
							name="password"
							rules={[{ required: true, message: 'Ingrese un valor valido'}]}
					>
							<Input.Password placeholder="input password" disabled={Loading} />
					</Form.Item>
					<div className="olv">
						<Link href="/recover-password" passHref prefetch={false} >
							<a className="olv" >Olvide mi contraseña</a>
						</Link>
					</div>
			</CardForm>
    );

}


export default FormLogin;
