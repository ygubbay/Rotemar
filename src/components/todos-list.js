import _ from 'lodash';
import React from 'react';
import TodosListHeader from './todos-list-header';
import TodosListItem from './todos-list-item';

//import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
//import { loginUser } from '../actions/userActions';


export default class TodosList extends React.Component {

    constructor(props) {
        super(props);
    }

    RemoveTS(ts)
    {
        this.props.onDelete(ts);
    }

    renderItems() {
        return _.map(this.props.ts, (todo, index) => <TodosListItem key={index} ts={todo} onDelete={(task) => this.RemoveTS(task)} />);
        
    }


    componentWillUpdate(nextProps) {
        console.log('TodoList Update: ' + JSON.stringify(nextProps));
    }

    render() {


        console.log(this.props);
        return (

            <table>
                <TodosListHeader />
                <tbody>
                    {this.renderItems()}
                </tbody>
            </table>
        );
    }
}



          
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loginUser
  }, dispatch);
}

const mapStateToProps = (state) => {

  const new_state = _.assign({}, state);
  return new_state.user;
};

//export default connect(mapStateToProps, mapDispatchToProps)(TodosList);
