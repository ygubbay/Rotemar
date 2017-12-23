import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {  withRouter } from 'react-router-dom'


class EnsureLoggedInContainer extends React.Component {
   constructor(props) {
        super(props);

        this.state = { };
  
    }

  //  componentDidMount() {
     
  //   //const { dispatch, currentURL } = this.props
  //   console.log('EnsureLoggedInContainer.componentDidMount');
  //   if (!this.props.user.login) {
  //     // set the current url/path for future redirection (we use a Redux action)
  //     // then redirect (we use a React Router method)
  //     //dispatch(setRedirectUrl(currentURL))
  //      this.props.history.push('/login');
       
  //   }
  // }

  // componentDidMount()
  // {
  //   if (!this.props.user.login)
  //     this.props.history.push('/login');
  // }


  componentWillReceiveProps(nextProps) 
  {
    if (this.props.user.login) 
    {
      // do nothing
    }
    else 
    {
      this.props.history.push('/login');
    }
  }




  render() {
    console.log('EnsureLoggedInContainer.render:');
    console.dir(this.state);
    console.dir(this.props);
    return (!this.props.user.login) ? <div></div> : this.props.children;
  }
}

     
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
}

const mapStateToProps = (state) => {

    var myProps = _.assign({}, { user: state.user });
    return myProps;

};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EnsureLoggedInContainer))