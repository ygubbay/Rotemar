import React from 'react';
import { Button } from 'react-bootstrap';

export default class OrdersTable extends React.Component {


    constructor(props) {
        super(props);

    }


    onEditClick(order) {
        const orderid = order.OrderId;
        this.props.orderClick(orderid);
    }

    onPrintClick(order) {
        const orderid = order.OrderId;
        this.props.printClick(orderid);
    }



    render() {
        const header_row = (<div className="row-todo">
                                
                                <div key={'1'} className="tbl-col-hdr col-inv-2">
                                    Order Id
                                </div>
                                <div key={'12'} className="tbl-col-hdr col-inv-3">
                                    Number
                                </div>
                                <div key={'13'} className="tbl-col-hdr col-inv-1">
                                    Type
                                </div>
                                <div key={'14'} className="tbl-col-hdr col-inv-7">
                                    Name
                                </div>
                                <div key={'15'} className="tbl-col-hdr col-inv-4">
                                    Order date
                                </div>
                                <div key={'16'} className="tbl-col-hdr col-inv-5">
                                    StudioMor date
                                </div>
                                <div key={'17'} className="tbl-col-hdr col-inv-6">
                                    Status
                                </div>
                                <div key={'18'} className="tbl-col-hdr col-inv-6">
                                    Edit
                                </div>
                                <div key={'19'} className="tbl-col-hdr col-inv-6">
                                    Print
                                </div>
                            </div>);

        var rows = [];
        for (var i=0; i<this.props.orders.length; i++)
        {
            var o = this.props.orders[i];
            var row_class = { true: "row-todo", true: "alert-row" };
            var row = (<div key={o.orderid} className= { "row-todo" + (o.OrderStatusId == 3 || o.OrderStatusId == 4 ? " alert-row": "") 
                                                                    + (o.OrderStatusId == 6 ? " success-row": "" ) } > 
                            
                            <div className="tbl-col col-inv-2">
                                { o.OrderId }
                            </div>
                            <div className="tbl-col col-inv-3">
                                { o.OrderNumber }
                            </div>
                            <div className="tbl-col col-inv-1">
                                { o.AlumType }
                            </div>
                            <div className="tbl-col col-inv-7">
                                { o.Name }
                            </div>
                            <div className="tbl-col col-inv-4">
                                { o.OrderDate }
                            </div>
                            <div className="tbl-col col-inv-5">
                                { o.DateCreated.substr(0, 16) }
                            </div>
                            <div className="tbl-col col-inv-6">
                                { o.OrderStatus }
                            </div>
                            <div className="tbl-col col-inv-6">
                                <Button bsStyle="primary" onClick={this.onEditClick.bind(this, o)}>Edit</Button>
                            </div>
                            <div className="tbl-col col-inv-6">
                               <Button bsStyle="primary" onClick={this.onPrintClick.bind(this, o)}>Print</Button>
                            </div>
                        </div>);
            rows.push(row);        
        }                

        return (

            <div className="tbl-todo">
                
                {header_row}
                {rows}
            </div>
        )
    }
}