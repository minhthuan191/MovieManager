import React, { Component } from 'react';

class TableHeader extends Component {
    raiseSort = path =>{
        const sortColumn = {...this.props.sortColumn};
        if (sortColumn.path ===  path)
            sortColumn.order = (sortColumn.order ==="asc") ? "desc":"asc";
        else{
            sortColumn.path =path;
            sortColumn.order = "asc";
        }
        this.props.onSort(sortColumn)
    }

    renderSortIcon = column =>{
        if(column.path !== this.props.sortColumn.path) return null;
        if( this.props.sortColumn.order === 'asc') return <i className="fa fa-sort-asc m-1"/>
        return <i className="fa fa-sort-desc m-1"/>;
    }

    render() { 
        return ( 
        <thead>
            <tr>
                {this.props.columns.map(column => 
                <th 
                    key={column.path || column.key}
                    style={{ cursor: "pointer"}} 
                    onClick={()=> this.raiseSort(column.path)}
                >{column.label}{this.renderSortIcon(column)}
                </th>)}
            </tr>
        </thead> );
    }
}

export default TableHeader;