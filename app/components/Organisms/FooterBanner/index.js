import React from 'react';

import { ButtonComponent } from '../../Atoms/Buttons';
import { ParagraphComponent } from '../../Atoms/Paragraphs';


import {
    FooterBanner
} from './style';


const { Content } = FooterBanner;


export const FooterBannerComponent = ({className, textButton, children, bgColor, ...props}) => {

    return(
        <FooterBanner className={className} $bgColor={bgColor} {...props} >
            <Content>
                <ParagraphComponent className="a-paragraph--light bold--paragraph">
					{ children }
				</ParagraphComponent>
                <br />
                <ButtonComponent className="a-btn--bgLight" text={textButton} href="mailto:email@email.com" />
            </Content>
        </FooterBanner>
    );

}
