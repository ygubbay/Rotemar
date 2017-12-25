
import _ from 'lodash';
import React from 'react';

import * as utils from '../utils';


import { Alert, Button, ProgressBar } from 'react-bootstrap';
import { loginUser, dismissAlerts } from '../actions/userActions';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class LoginPage extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
        
    }

    componentWillMount() {

        // need to do a logout here...

        
        const email = utils.getCookie('email');

        if (email != undefined)
        {
            this.setState({ email: email });
        }
    }

   shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps) || JSON.stringify(this.state) !== JSON.stringify(nextState);
   }

    onLoginButtonClick(event) {

        this.props.loginUser(this.state.email, this.state.password);
        event.preventDefault();
    }

   onEmailChange(event) {
       this.props.dismissAlerts();
       this.setState({email: event.target.value});
   }

   onPasswordChange(event) {
       this.props.dismissAlerts();
       this.setState({password: event.target.value});
   }

   onAlertDismiss() {
       this.props.dismissAlerts();
   }

    componentWillReceiveProps(nextProps) 
    {
        if (nextProps.user.login)
        {
            utils.setCookie('email', this.state.email);
            this.props.history.push('/orders');
        }

    }


    render() {

        const is_input_valid = this.state.email && this.state.email.length > 5 &&
                                this.state.password && this.state.password.length > 4;

        const alert_element = this.props.user && this.props.user.alerts && this.props.user.alerts.length  ? 
                    <Alert bsStyle="danger" onDismiss={this.onAlertDismiss.bind(this)}>
                        {this.props.user.alerts[0].msg}
                    </Alert>: '';

        const rmri_indexes = [43, 23, 28, 54, 143, 3, 5, 2, 12, 23, -2, 2, 32, 18, 7, 60, 4];
        const max_index = 143;
        return (

            <div className="main-page">
               <form onSubmit={this.onLoginButtonClick.bind(this)}>

                <div>

                    <div className="customer-logo col-sm-3"></div>
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
                        <div className="my-row ">
                            <div className="my-col green">טלוויזיה - קשת</div>
                            <div className="my-col"><input type="text" className="input-var" /></div>
                            <div className="my-col"> <ProgressBar bsStyle="info" now={rmri_indexes[0]/max_index*100} label={rmri_indexes[0]} /></div>
                            <div style={{ clear: "both"}}></div>
                        </div>
                         <div className="my-row ">
                            <div className="my-col green">טלוויזיה - רשת</div>
                            <div className="my-col"><input type="text" className="input-var" /></div>
                            <div className="my-col"> <ProgressBar bsStyle="warning" now={rmri_indexes[1]/max_index*100} label={rmri_indexes[1]} /></div>
                            <div style={{ clear: "both"}}></div>
                        </div>
                         <div className="my-row ">
                            <div className="my-col green">טלוויזיה - ערוץ 10</div>
                            <div className="my-col"><input type="text" className="input-var" /></div>
                            <div className="my-col"> <ProgressBar bsStyle="danger" now={rmri_indexes[2]/max_index*100} label={rmri_indexes[2]} /></div>
                            <div style={{ clear: "both"}}></div>
                        </div>
                         <div className="my-row ">
                            <div className="my-col yellow">Google Adwords</div>
                            <div className="my-col"><input type="text" className="input-var" /></div>
                            <div className="my-col"> <ProgressBar bsStyle="info" now={rmri_indexes[3]/max_index*100} label={rmri_indexes[3]} /></div>
                            <div style={{ clear: "both"}}></div>
                        </div>
                         <div className="my-row ">
                            <div className="my-col yellow">Facebook</div>
                            <div className="my-col"><input type="text" className="input-var" /></div>
                            <div className="my-col"> <ProgressBar bsStyle="success" now={rmri_indexes[4]/max_index*100} label={rmri_indexes[4]} /></div>
                            <div style={{ clear: "both"}}></div>
                        </div>
                         <div className="my-row ">
                            <div className="my-col yellow">Youtube</div>
                            <div className="my-col"><input type="text" className="input-var" /></div>
                            <div className="my-col"> <ProgressBar bsStyle="info" now={rmri_indexes[5]/max_index*100} label={rmri_indexes[5]} /></div>
                            <div style={{ clear: "both"}}></div>
                        </div>
                        
                         <div className="my-row ">
                            <div className="my-col yellow">Banners</div>
                            <div className="my-col"><input type="text" className="input-var" /></div>
                            <div className="my-col"> <ProgressBar bsStyle="info" now={rmri_indexes[6]/max_index*100} label={rmri_indexes[6]} /></div>
                            <div style={{ clear: "both"}}></div>
                        </div>
                         <div className="my-row ">
                            <div className="my-col yellow">Outbrain/Taboola</div>
                            <div className="my-col"><input type="text" className="input-var" /></div>
                            <div className="my-col"> <ProgressBar bsStyle="info" now={rmri_indexes[7]/max_index*100} label={rmri_indexes[7]} /></div>
                            <div style={{ clear: "both"}}></div>
                        </div>
                         <div className="my-row ">
                            <div className="my-col yellow">Remarketing</div>
                            <div className="my-col"><input type="text" className="input-var" /></div>
                            <div className="my-col"> <ProgressBar bsStyle="info" now={rmri_indexes[8]/max_index*100} label={rmri_indexes[8]} /></div>
                            <div style={{ clear: "both"}}></div>
                        </div>
                         <div className="my-row ">
                            <div className="my-col blue">שילוט חוצות</div>
                            <div className="my-col"><input type="text" className="input-var" /></div>
                            <div className="my-col"> <ProgressBar bsStyle="info" now={rmri_indexes[9]/max_index*100} label={rmri_indexes[9]} /></div>
                            <div style={{ clear: "both"}}></div>
                        </div>
                         <div className="my-row ">
                            <div className="my-col blue">חסויות</div>
                            <div className="my-col"><input type="text" className="input-var" /></div>
                            <div className="my-col"> <ProgressBar bsStyle="info" now={rmri_indexes[10]/max_index*100} label={rmri_indexes[10]} /></div>
                            <div style={{ clear: "both"}}></div>
                        </div>
                         <div className="my-row ">
                            <div className="my-col blue">עיתונות מודפסות</div>
                            <div className="my-col"><input type="text" className="input-var" /></div>
                            <div className="my-col"> <ProgressBar bsStyle="info" now={rmri_indexes[11]/max_index*100} label={rmri_indexes[11]} /></div>
                            <div style={{ clear: "both"}}></div>
                        </div>
                        
                         <div className="my-row">
                            <div className="tbl-header my-col">משתנים נוספים</div>
                            <div className="tbl-header my-col"></div>
                            <div className="tbl-header my-col"></div>
                            <div style={{ clear: "both"}}></div>
                        </div>
    
                         <div className="my-row ">
                            <div className="my-col beige">קריאיטיב: זמרות</div>
                            <div className="my-col"><input type="text" className="input-var" /></div>
                            <div className="my-col"> <ProgressBar bsStyle="info" now={rmri_indexes[12]/max_index*100} label={rmri_indexes[12]} /></div>
                            <div style={{ clear: "both"}}></div>
                        </div>
                         <div className="my-row ">
                            <div className="my-col beige">קריאיטיב: שף מפורסם</div>
                            <div className="my-col"><input type="text" className="input-var" /></div>
                            <div className="my-col"> <ProgressBar bsStyle="info" now={rmri_indexes[13]/max_index*100} label={rmri_indexes[13]} /></div>
                            <div style={{ clear: "both"}}></div>
                        </div>
                         <div className="my-row ">
                            <div className="my-col beige">קמפיין קריאטיב: מסר ישיר</div>
                            <div className="my-col"><input type="text" className="input-var" /></div>
                            <div className="my-col"> <ProgressBar bsStyle="info" now={rmri_indexes[14]/max_index*100} label={rmri_indexes[14]} /></div>
                            <div style={{ clear: "both"}}></div>
                        </div>
                         <div className="my-row ">
                            <div className="my-col beige">קמפיין מתחרים</div>
                            <div className="my-col"><input type="text" className="input-var" /></div>
                            <div className="my-col"> <ProgressBar bsStyle="info" now={rmri_indexes[15]/max_index*100} label={rmri_indexes[15]} /></div>
                            <div style={{ clear: "both"}}></div>
                        </div>
                         <div className="my-row ">
                            <div className="my-col beige">משתנים נוספים</div>
                            <div className="my-col"><input type="text" className="input-var" /></div>
                            <div className="my-col"> <ProgressBar bsStyle="info" now={rmri_indexes[16]/max_index*100} label={rmri_indexes[16]} /></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
