
import _ from 'lodash';
import React from 'react';

import * as api from '../api';

import OrderView from '../components/order-view';
import { getTrackingPageOrder} from '../actions/userActions';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { Navbar, Button } from 'react-bootstrap';
import Header from '../components/Header';



import Pager from 'rc-pager';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class TrackingPage extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
            tracking_page_order: null,
            order_number: '',
            tracking_number: '',
            tracking_number_saved: false
        }
  
    }

    componentWillMount() {

        if (!this.props.user.login)
            this.props.history.push('/login');
    }

    componentDidMount() {
        this.focusOrderNumber();
    }


    componentWillReceiveProps(nextProps) 
    {
        if (nextProps.user.tracking_page_order)
        {
            this.setState({ tracking_page_order: nextProps.user.tracking_page_order }); 
            this.TrackingNumberInput.focus();
        }
        
    }

    focusOrderNumber() {
        this.OrderNumberInput.focus();
    }

    onOrderNumberChange(event) {

        
        const order_number = event.target.value;
        console.log('trackingnumber focus:', order_number);
        this.setState({order_number: order_number});

        // getOrder
        this.props.getTrackingPageOrder(order_number);
    }


    onTrackingNumberChange(event) 
    {
        const tracking_number = event.target.value;
        this.setState({tracking_number: tracking_number});
        console.log('onTrackingNumberChange', tracking_number);

        const last_change_time = new Date();
        this.setState({ last_tracking_change: last_change_time })
        setTimeout(() => { this.saveTrackingNumber(last_change_time) }, 1000);
        
    }

    saveTrackingNumber(last_change_time) 
    {

        // skip if chars received with timeout period
        if (last_change_time != this.state.last_tracking_change)
        {
            return;
        }

        //saveTrackingNumber
        if (this.state.order_number && this.state.tracking_number) {

            api.saveTrackingNumber(this.state.order_number, this.state.tracking_number).then((response) => {

            this.props.history.push('/orders');
            console.log('onTrackingNumberChange:');
            console.dir(response);
        }).catch((err) => {

            console.log(err);
        });
        }
    }



    render() {

        const tracking_order = this.state.tracking_page_order;

        var display_order = tracking_order ? 
                             <div>
                                <hr />

                                <OrderView order={tracking_order} view_only={true} />
                            </div>: '';

            return (
            <div className="ts-page tracking-page">
                <Header />
                <h2>Delivery Tracking</h2>

                <div className="line">
                      <div className="fld fld1">
                        <label>Order Number:</label>
                      </div>
                      <div className="fld fld2">
                        <input type="text" className="input-scan"  ref={(input) => { this.OrderNumberInput = input; }} onChange={this.onOrderNumberChange.bind(this)} disabled={this.state.tracking_page_order} />
                      </div>
                </div>

                <div className="line">
                     <div className="fld fld1">
                        <label>Tracking Number:</label>
                      </div>
                      <div className="fld fld2">
                        <input type="text" className="input-scan" ref={(input) => {this.TrackingNumberInput = input; }} onChange={this.onTrackingNumberChange.bind(this)} />
                      </div>
                </div>

              
               {display_order}

            </div>
            );
    }
}

   
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
      getTrackingPageOrder
    
  }, dispatch);
}

const mapStateToProps = (state) => {

    var myProps = _.assign({}, { user: state.user });
    return myProps;

};

export default connect(mapStateToProps, mapDispatchToProps)(TrackingPage);


