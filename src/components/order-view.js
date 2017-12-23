import React from 'react';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
import * as api from '../api';

export default class OrderView extends React.Component {


    constructor(props) {
        super(props);

        this.state = { order: {}, statuses: [] };
    }

    componentDidMount() {

        if (this.props.orderid) 
        {
            // orderid: get order from api
            api.orderGetById(this.props.orderid).then((response) => 
            {

                this.setState({ order: response.data });
                console.log('setState order:');
                console.log(response.data);
            }).catch((err) => console.log(err) );
        }
        else if (this.props.order) {

            // order: use the order supplied 
            this.setState({ order: this.props.order });
        }

        api.getOrderStatuses().then((response) => 
        {
            var statuses = response.data.reverse();
            this.setState({ statuses: statuses });
        }).catch((err) => console.log(err) );
    }


    // componentWillReceiveProps(nextProps) 
    // {
    //     if (nextProps.tracking_page_order)
    // }

    onStatusClick(status_id) {

        var selected_status;
        this.state.statuses.map((status) => {
            if (status.StatusId == status_id)
            {
                selected_status = status;
            }
        })

        var o = this.state.order;
        o.OrderStatusId = selected_status.StatusId;
        o.OrderStatus = selected_status.Name;
        this.setState({ order: o });


    }

  
    onSaveClick(order) {
        const orderid = order.orderid;

        api.orderSave(order).then((response) => {

            console.log('onSaveClick:');
            console.dir(response);
            this.props.saveClick(this.state.order);
        }).catch((err) => { 
            console.log(err);
        })
        
        
    }

    onCancelClick() {
        this.props.cancelClick();
    }

    render() {
        
        const order = this.state.order; 

        const status_buttons =  this.state.statuses.map((status, index) => <MenuItem key={'mi' + index} eventKey={status.StatusId} >{status.Name}</MenuItem>);                                               

        const status_display = this.props.view_only ? order.OrderStatus : 
                                                    <DropdownButton bsStyle={order.OrderStatusId == 3 || order.OrderStatusId == 4 ? 'danger': 'primary' } title={order.OrderStatus ? order.OrderStatus: 'unknown'} onSelect={(e, key) => this.onStatusClick(e, key)} id="dropdown-size-medium">
                                                        {status_buttons}
                                                    </DropdownButton>;
      
        return (

            order.OrderStatus ? 
            <div className="page order-view">
                
                <h2>Order - {order.OrderNumber}</h2>
                <div className="row">
                    <div className="col-sm-6">
                        
                                                <div>
                            <div className="fld fld1">Id</div>
                            <div className="fld fld2">{order.OrderId}</div>
                        </div>
                        <div>
                            <div className="fld fld1">Operator Id</div>
                            <div className="fld fld2">{order.OperatorId}</div>
                        </div>
                        <div>
                            <div className="fld fld1">Album Type</div>
                            <div className="fld fld2">{order.AlumType}</div>
                        </div>
                        <div>
                            <div className="fld fld1">Quantity</div>
                            <div className="fld fld2">{order.Quantity}</div>
                        </div>
                         <div>
                            <div className="fld fld1">Order Date</div>
                            <div className="fld fld2">{order.OrderDate}</div>
                        </div>
                        <div>
                            <div className="fld fld1">Status</div>
                            <div className="fld fld2">{status_display}
                        </div>
                        <div>
                            <div className="fld fld1">Tracking Number</div>
                            <div className="fld fld2">{order.TrackingNumber}</div>
                        </div>
                        <div>
                            <div className="fld fld1">Tracking Date</div>
                            <div className="fld fld2">{order.TrackingDate}</div>
                        </div>
                    
                </div>


                    </div>
                    <div className="col-sm-6">
                        
                        <div>
                            <div className="fld fld1">Name</div>
                            <div className="fld fld2">{order.Name}</div>
                        </div>
                        <div>
                            <div className="fld fld1">Address</div>
                            <div className="fld fld2">{order.Address}</div>
                        </div>
                        <div>
                            <div className="fld fld1">PhoneNumber</div>
                            <div className="fld fld2">{order.PhoneNumber}</div>
                        </div>
                        <div>
                            <div className="fld fld1">FileName1</div>
                            <div className="fld fld2">{order.FileName1}</div>
                        </div>
                        <div>
                            <div className="fld fld1">FileName2</div>
                            <div className="fld fld2">{order.FileName2}</div>
                        </div>
                        <div>
                            <div className="fld fld1">Shipping Type</div>
                            <div className="fld fld2">{order.ShippingType}</div>
                        </div>
                        <div>
                            <div className="fld fld1">Shipping Address</div>
                            <div className="fld fld2">{order.ShippingAddress}</div>
                        </div>
                        <div>
                            <div className="fld fld1">Mail</div>
                            <div className="fld fld2">{order.Mail}</div>
                        </div>

                    </div>
                </div>
                <div style={{clear: "both"}}></div>
               
               
                <div style={{display: this.props.view_only ? 'none': 'block'}}>
                    <Button bsStyle="success" onClick={this.onSaveClick.bind(this, this.state.order)}>Save</Button>&nbsp;
                    <Button bsStyle="danger" onClick={this.onCancelClick.bind(this)}>Cancel</Button>
                    
                </div>
                
            </div>
    
        :
             <div>Loading...</div>);
        
        
    }
}