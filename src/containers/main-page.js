
import _ from 'lodash';
import React from 'react';

import * as utils from '../utils';


import { Alert, Button } from 'react-bootstrap';
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

                <hr className="section-divider" />

                <div>
                    <div className="col-sm-4">
                        <div className="tbl-header">משתני התמהיל</div>
                        <div className="green-cell">טלוויזיה - קשת</div>
                        <div className="green-cell">טלוויזיה - רשת</div>
                        <div className="green-cell">טלוויזיה - ערוץ 10</div>
                        <div className="yellow-cell">Google Adwords</div>
                        <div className="yellow-cell">Facebook</div>
                        <div className="yellow-cell">Youtube</div>
                        <div className="yellow-cell">Banners</div>
                        <div className="yellow-cell">Outbrain/Taboola</div>
                        <div className="yellow-cell">Remarketing</div>
                        <div className="blue-cell">שילוט חוצות</div>
                        <div className="blue-cell">חסויות</div>
                        <div className="blue-cell">עיתונות מודפסות</div>
                    </div>
                    <div className="col-sm-4">
                        <div className="tbl-header">תקציב (באלפי ₪)</div>
                        <div className="white-cell"><input type="text" className="input-var" /></div>                        
                        <div className="white-cell"><input type="text" className="input-var" /></div>                        
                        <div className="white-cell"><input type="text" className="input-var" /></div>                        
                        <div className="white-cell"><input type="text" className="input-var" /></div>                        
                        <div className="white-cell"><input type="text" className="input-var" /></div>                        
                        <div className="white-cell"><input type="text" className="input-var" /></div>                        
                        <div className="white-cell"><input type="text" className="input-var" /></div>                        
                        <div className="white-cell"><input type="text" className="input-var" /></div>                        
                        <div className="white-cell"><input type="text" className="input-var" /></div>                        
                        <div className="white-cell"><input type="text" className="input-var" /></div>                        
                        <div className="white-cell"><input type="text" className="input-var" /></div>                        
                        <div className="white-cell"><input type="text" className="input-var" /></div>                        
                    </div>
                    <div className="col-sm-4">
                        <div className="tbl-header">RMRI index</div>
                        
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
