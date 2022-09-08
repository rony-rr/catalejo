import React, { useEffect } from 'react';
import { Menu } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { useRouter } from 'next/router'

import {
    VerticalListTabs
} from './style';

export const VerticalListTab = ({className, itemsLista, selectedValue, inversion, ...props}) => {

	const router = useRouter();

	useEffect(()=>{
        // Check and set the first inversion
		if(!inversion && itemsLista.length) {
			let id = itemsLista[0].value;
			router.replace({
				pathname: '/inversiones',
				query: { i: id }
			})
		}
	}, []);

    const returnValue = (value) => {
        props.changeValueSelected(value);
    }

    let sourceItems = itemsLista ? itemsLista : [];
    let renderItems = null;

    renderItems = sourceItems.map((item, index) => {
        return (
            <Menu.Item
                key={index}
                onClick={ () => returnValue(item.value) }
                className={ selectedValue == item.value ? 'itemSelect' : null }
                icon={ <CheckCircleFilled className={ selectedValue == item.value ? 'iconAppear' : null }/> }
                mode="inline"
                >
                    {item.label}
            </Menu.Item>
        );
    });

    return(
        <VerticalListTabs
            className={className}
            onClick={ () => { }}
            // mode="inline"
        >

            { renderItems }

        </VerticalListTabs>
    );

}
