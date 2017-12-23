
import _ from 'lodash';
import React from 'react';

import * as api from '../api';

import OrdersTable from '../components/orders-table';
import OrderView from '../components/order-view';
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { Navbar, Button } from 'react-bootstrap';
import Header from '../components/Header';


import { yyyymmdd } from '../utils';
import Pager from 'rc-pager';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class DailyOrdersPage extends React.Component {
  constructor(props) {
        super(props);

        const current_date = new Date();
        const today_date = new Date();
        

          this.state = {
                datePickerOpen: false,
                selectedDay: today_date,
            }
  
    }

    componentWillMount() {

        if (!this.props.user.login)
            this.props.history.push('/login');
    }

    componentDidMount() {
        
    }


    componentWillReceiveProps(nextProps) 
    {
        if (nextProps.selectedDay) {

            this.getOrdersByDay(nextProps.selectedDay);
        }
        
    }


    getOrdersByDay(yyyymmdd)
    {
        api.getDailyOrders(yyyymmdd).then((response) => {

            this.setState({ orders: response.data });
        }).catch((err) => {

            alert(err);
        });
    }

    handleDayPickerOpen() {
        this.setState( { datePickerOpen: !this.state.datePickerOpen})
    }

    handleDayClick = (day) => {
    
        console.log('selectedDay=', day);
        this.setState({ selectedDay: day });
        this.getOrdersByDay(yyyymmdd(day));
        
        this.handleDayPickerOpen();
    }


    onPrintOrdersClick() 
    {
        api.ordersDailyPdf(yyyymmdd(this.state.selectedDay)).then((response) => {


            const pdf_url = response.data.pdf;
            console.log('downloading:', pdf_url);
            this.setState({ pdf_print: pdf_url })
            
            setTimeout(() => { downloadFile(this.state.pdf_print); }, 1000);
            
            
        }).catch((err) => {
            console.log(err);
        })
    }


    render() {

        const day_picker = this.state.datePickerOpen ? (
        
                <div className="day-picker-dd">
                    <DayPicker
                    defaultValue = { this.state.selectedDay  }
                    initialMonth={this.state.selectedDay}
                    selectedDays={ this.state.selectedDay }
                    onDayClick={ this.handleDayClick.bind(this) } />
                </div>): (<div></div>);

            const orders_table = this.state.orders && this.state.orders.length > 0 ?  <OrdersTable orders={this.state.orders} />: '';

            return (
            <div className="ts-page">
                <Header />
                <h2>Daily Orders</h2>

                <div className="ts-daypicker col-xs-6">
                    <div>
                        <div>
                            <input className="todo-day" type="text" value={this.state.selectedDay.toString().substr(0, 15)}  readOnly />
                            <span id="open-daypicker">
                                <Glyphicon style={{color: '#337ab7', fontSize: '1.3em', cursor: 'pointer'}} glyph={this.state.datePickerOpen ? "chevron-up": "chevron-down"} onClick={this.handleDayPickerOpen.bind(this)}  />
                            </span>
                        </div>
                    </div>

                    {day_picker}
 
                </div> 
                <div className="col-xs-6" style={{textAlign: "right"}}>
                    <Button bsSize="lg" bsStyle="success" onClick={this.onPrintOrdersClick.bind(this)}>Print Daily Orders</Button>
                </div>
                <div style={{clear: "both"}}></div>
                <hr />
                <div>

                    
                    {orders_table}
                </div>
                <div style={{clear: "both"}}></div>

            </div>
            );
    }
}

   
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
      
    
  }, dispatch);
}

const mapStateToProps = (state) => {

    var myProps = _.assign({}, { user: state.user });
    return myProps;

};

export default connect(mapStateToProps, mapDispatchToProps)(DailyOrdersPage);




window.downloadFile = function (sUrl) {

    //iOS devices do not support downloading. We have to inform user about this.
    if (/(iP)/g.test(navigator.userAgent)) {
       //alert('Your device does not support files downloading. Please try again in desktop browser.');
       window.open(sUrl, '_blank');
       return false;
    }

    //If in Chrome or Safari - download via virtual link click
    if (window.downloadFile.isChrome || window.downloadFile.isSafari) {
        //Creating new link node.
        var link = document.createElement('a');
        link.href = sUrl;
        link.setAttribute('target','_blank');

        if (link.download !== undefined) {
            //Set HTML5 download attribute. This will prevent file from opening if supported.
            var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
            link.download = fileName;
        }

        //Dispatching click event.
        if (document.createEvent) {
            var e = document.createEvent('MouseEvents');
            e.initEvent('click', true, true);
            link.dispatchEvent(e);
            return true;
        }
    }

    // Force file download (whether supported by server).
    if (sUrl.indexOf('?') === -1) {
        sUrl += '?download';
    }

    window.open(sUrl, '_blank');
    return true;
}

window.downloadFile.isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
window.downloadFile.isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;

