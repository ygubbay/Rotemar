
import _ from 'lodash';
import React from 'react';
import TodosList from './todos-list';
import CreateTodo from './create-todo';
import { setTSList, newTS, removeTS } from '../actions/tsActions';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


const todos = [
{
    task: 'make react tutorial',
    isCompleted: false
},
{
    task: 'eat dinner',
    isCompleted: true
}
]
class TODOPage extends React.Component {

    constructor(props) {
        super(props);

        this.props.setTSList(todos);
        
    }

    CreateTodo(task) {

        task.isCompleted = false;

        this.props.newTS(task);
    }


    RemoveTS(task) 
    {
        this.props.removeTS(task);
    }


    render() {
        return (
            
            <div>
                <h1>React Todos App</h1>

                <CreateTodo onCreate={(task) =>this.CreateTodo(task)} />
                <TodosList ts={this.props.ts } onDelete={(task) => this.RemoveTS(task)} />
            </div>
        );
    }
}



          
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setTSList, newTS, removeTS
  }, dispatch);
}

const mapStateToProps = (state) => {

    var myProps = _.assign({}, { user: state.user }, { ts: state.ts });
    return myProps;

};

export default connect(mapStateToProps, mapDispatchToProps)(TODOPage);
