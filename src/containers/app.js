
import React from 'react';
import {
  BrowserRouter,
  Route,
  Link, browserHistory
} from 'react-router-dom'
import Header from '../components/Header';
import MainPage from './main-page';

import { isLoggedIn } from '../utils';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class App extends React.Component {

    componentDidUpdate(prevProps) {
        const { dispatch, redirectUrl } = this.props
        const isLoggingOut = prevProps.isLoggedIn && !this.props.isLoggedIn
        const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn

        
    }
  
    render() {

                                   
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={MainPage} />         
                        
                </div>
                
            </BrowserRouter>
        );
    }
      
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.loggedIn,
    redirectUrl: state.redirectUrl
  }
}

export default connect(mapStateToProps)(App)
          
