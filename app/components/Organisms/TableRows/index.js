import React from 'react';

import {
    TableRows,
} from './style';

export const TableHoComponent = (props) => {

    return(
        <TableRows 
            columns={props.columns} 
            dataSource={props.dataColumns} 
            {...props} />
    );

}