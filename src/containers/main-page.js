
import _ from 'lodash';
import React from 'react';

const config = require('../config.js');
import * as utils from '../utils';


import { Alert, Button, ProgressBar } from 'react-bootstrap';
import { loginUser, dismissAlerts } from '../actions/userActions';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class MainPage extends React.Component {
  constructor(props) {
        super(props);


        const rmri_indexes = config.rmri_indexes; 

        const main_group = [];
        const additional_group = [];
        
        rmri_indexes.map( (r) => {
            if (r.group == 'main')
            {
                main_group.push(r);
            }
            if (r.group == 'additional') 
            {
                additional_group.push(r);
            }
        })      

        this.state = {
            main_group: main_group,
            additional_group: additional_group,
            total_cost: 0,
            total_sales: 0
        }


    }

    getRowsFromData(rmri_indexes) {


        var rows = [];
        var max_index = 0;
        rmri_indexes.map((r) => {
            if (r.value > max_index) 
                    max_index = r.value;
        });

        rmri_indexes.map((r) => {

                

                let progress_color = "";
                if (r.value/max_index*100 >= 50)
                {
                    progress_color = "success";
                }
                else if (r.value/max_index*100 >= 25) 
                {
                    progress_color = "info";
                }
                else if (r.value/max_index*100 >= 10)
                {
                    progress_color = "warning";
                }
                else {
                    progress_color = "danger";
                }
                const row = <div className="my-row " key={r.name}>
                                <div className={"my-col " + r.color}>{r.name}</div>
                                <div className="my-col"><input type="text" className="input-var" onChange={this.onCostChange.bind(this, r)} /></div>
                                <div className="my-col"> <ProgressBar bsStyle={progress_color} now={r.value/max_index*100} label={r.value} /></div>
                                <div style={{ clear: "both"}}></div>
                            </div>
                rows.push(row);
            })
        return rows;

    }

    onCostChange(rmri_index, event) {

        let rmri = this.state.main_group.find((r) => {
            return r.name == rmri_index.name;
        })

        if (!rmri)
        {
            rmri = this.state.additional_group.find((r) => {
                return r.name == rmri_index.name;
            })
        }

        rmri.cost = parseInt(event.target.value);

        // recalculate total cost
        let total_cost = 0;
        this.state.main_group.map((r) => {
            total_cost += (r.cost ? r.cost: 0);
        })
        this.state.additional_group.map((r) => {
            total_cost += (r.cost ? r.cost: 0);
        })

        // recalculate total sales
        let total_sales = 0;
        this.state.main_group.map((r) => {
            total_sales += (r.cost ? r.cost * r.value: 0);
        })
        this.state.additional_group.map((r) => {
            total_sales += (r.cost ? r.cost * r.value: 0);
        })
        this.setState({ total_cost: total_cost, total_sales: total_sales });
    }


    render() {


        const alert_element = this.props.user && this.props.user.alerts && this.props.user.alerts.length  ? 
                    <Alert bsStyle="danger" onDismiss={this.onAlertDismiss.bind(this)}>
                        {this.props.user.alerts[0].msg}
                    </Alert>: '';

        const main_group_rows = this.getRowsFromData(this.state.main_group);
        const additional_group_rows = this.getRowsFromData(this.state.additional_group);

        
        const max_index = 143;
        return (

            <div className="main-page">
               <form>

                <div>

                    <div className="customer-logo col-sm-3">
                        Your brand logo
                    </div>
                    <div className="rotemar-title col-sm-6">
                        <div>
                            <div className="rmri-title">RMRI
                                <div className="tm-title">TM</div>
                            </div>
                            
                        </div>
                        <div className="slogan-title">Marketing Decisions Made Better.</div>
                        
                    </div>
                    <div className="rotemar-logo col-sm-3"></div>
                    <div style={{clear: "both"}}></div>
                </div>

                <div className="main-tbl">
                    
                    

                        <div className="my-row">
                            <div className="tbl-header my-col">משתני התמהיל</div>
                            <div className="tbl-header my-col">תקציב (באלפי ₪)</div>
                            <div className="tbl-header my-col">RMRI index</div>
                            <div style={{ clear: "both"}}></div>
                        </div>

                        {main_group_rows}
                        
                        
                         <div className="my-row">
                            <div className="tbl-header my-col">משתנים נוספים</div>
                            <div className="tbl-header my-col"></div>
                            <div className="tbl-header my-col"></div>
                            <div style={{ clear: "both"}}></div>
                        </div>
    
                         {additional_group_rows}
                        
                         <div className="my-row total">
                            <div className="total-costs-label my-col">סה"כ הוצאה (באלפי ₪)</div>
                            <div className="total-costs-value my-col">{this.state.total_cost}</div>
                            <div style={{ clear: "both"}}></div>
                        </div>

                         <div className="my-row total sales">
                            <div className="total-sales-label my-col">מכירות (באלפי ₪)</div>
                            <div className="total-sales-value my-col">{this.state.total_sales}</div>
                            <div style={{ clear: "both"}}></div>
                        </div>

                    </div>
               
               </form>
            </div>
        );
    }
}


          
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loginUser,
    dismissAlerts
  }, dispatch);
}

const mapStateToProps = (state) => {

    var myProps = _.assign({}, { user: state.user });
    return myProps;

};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
