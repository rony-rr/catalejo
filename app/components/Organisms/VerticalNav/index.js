import React from 'react';
import { Menu } from 'antd';

import {
    VerticalNavStyle
} from './style';

export const VerticalNav = ({className, itemsLista, selectedValue, ...props}) => {

    const returnValue = (value) => {
        props.changeValueSelected(value);
    }

    let sourceItems = itemsLista ? itemsLista : [];

    const renderItems = sourceItems.map((item, index) => {
        return (
            <Menu.Item 
                key={index} 
                onClick={ () => returnValue(item.value) } 
                className={ selectedValue == item.value ? 'itemSelect' : null }
                icon={ null }
                >
                    {(index+1) + '. '} {item.label}
            </Menu.Item>
        );
    });

    return(
        <VerticalNavStyle
            className={className}
            bgColor={props.bgColor}
        >

            { renderItems }

        </VerticalNavStyle>
    );

}
