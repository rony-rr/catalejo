import React from 'react';
import Styles from './style';
import { Container } from 'react-grid-system';
import { NewsTips } from '../../Organisms/NewsTips';

const TemplateBlog = () => {
    return (
        <Styles>
            <Container className="t-blog__container">
                <NewsTips isBlog />
            </Container>
        </Styles>
    )
}

export default TemplateBlog;
