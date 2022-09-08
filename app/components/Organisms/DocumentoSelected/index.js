import React from 'react';

import { LeftOutlined } from '@ant-design/icons';

import { TitleComponent } from '../../Atoms/Titles';
import { ButtonComponent } from '../../Atoms/Buttons';
import { ParagraphComponent } from '../../Atoms/Paragraphs';

import Styles from './style';

export const DocumentoSelected = ({AccordionOrDocument, ...props}) => {
    
    const returnClick = () => {
        if( props.returnClick ){
            props.returnClick();
        }
    }

    return(
        <Styles className="o-documento-selected--po" >
            
            <div className="o-arrow--return" onClick={ () => { returnClick(); } } >
                <LeftOutlined className="a-return" />
                <p>Volver</p>
            </div> 
            <TitleComponent className="a-title--light" level={1}>{AccordionOrDocument.title}</TitleComponent>
            <ButtonComponent className="a-btn--linkYellowBottom" text={AccordionOrDocument.fileName} />
            <div className="divider" ></div>
            <ParagraphComponent className="a-paragraph--light">
                { AccordionOrDocument.text }
			</ParagraphComponent>
        </Styles>
    );

}