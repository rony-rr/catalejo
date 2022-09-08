import React, {useState} from 'react';
import { Row, Col } from 'react-grid-system';
import { Form, Input } from 'antd';
import {
    EyeOutlined,
    EyeInvisibleOutlined
  } from '@ant-design/icons';

import Styles from './style';
import { ButtonComponent } from '../../Atoms/Buttons';
import { CardForm } from '../../Molecules/Cards';
import { ConfirmModal } from '../../Organisms/Modals';


const TemplateChangePassword = () => {

    const [eyeActive, setEyeActive]= useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [confirmChangePass, setConfirmChangePass] = useState('no');

    const onChangeEyeActive = () => {
        setEyeActive(!eyeActive);
    }

    const onChangeConfirmModal = () => {
        setConfirmModal(!confirmModal);
    }

    const onConfirmChangePass = (value) => {
        setConfirmChangePass(value);
    }

    return(
        <Styles>
            <Col md={24} className="t-resetpass__body">
                <CardForm title="Configuración de contraseña" 
                            cta="" >
                    <Col span={2} className="m-eye-pass" >
                        { eyeActive ? <EyeOutlined onClick={onChangeEyeActive} /> : <EyeInvisibleOutlined onClick={onChangeEyeActive} /> }
                    </Col>
                    <Form.Item
                        label="Contraseña actual"
                    >
                        <Input type={eyeActive ? "text" : "password"} />
                        <div className="separator"></div>
                    </Form.Item>
                    <Form.Item
                        label="Nueva contraseña"
                    >
                        <Input type={eyeActive ? "text" : "password"} />
                    </Form.Item>
                    <Form.Item
                        label="Confirmación de contraseña"
                    >
                        <Input type={eyeActive ? "text" : "password"} />
                    </Form.Item>
                    <Form.Item className="o-buttons-group">
                        <Row>
                            <Col span={12} className="o-cancel--button" >
                                <ButtonComponent 
                                    className="a-btn--linkYellowBottom" 
                                    text="Cancelar" />
                            </Col>
                            <Col span={12} className="o-save--button" >
                                <ButtonComponent 
                                    className="a-btn--bgYellow" 
                                    text="Guardar"
                                    onClick={ () => { onChangeConfirmModal(); }} />
                            </Col>
                        </Row>
                    </Form.Item>
                </CardForm>
                <ConfirmModal 
                    visible={confirmModal} 
                    text="¿Seguro quiere cambiar esta contraseña?" 
                    onConfirmChangePass={onConfirmChangePass}
                    onChangeConfirmModal={onChangeConfirmModal} />
            </Col>
        </Styles>
    );

}

export default TemplateChangePassword;