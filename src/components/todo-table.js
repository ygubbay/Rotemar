
import _ from 'lodash';
import React from 'react';



export default class TodoTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            todos: props.todos,
            is_date_col: this.props.is_date_col? true: false,
            is_project_col: this.props.is_project_col ? true: false
        };

    }

    onTodoDoubleClick(todo) {
        this.props.onRowDoubleClick(todo);
    }
    
    render() {  

        var project_col_display = this.state.is_project_col ? { display: 'inline-block'}: { display: 'none'};
        var date_col_display = this.state.is_date_col ? { display: 'inline-block'}: { display: 'none'};
        
        var header_row = (<div className="row-todo">
                            <div className="tbl-col-hdr col-todo-1" style={project_col_display}>
                                Project
                            </div>
                            <div className="tbl-col-hdr col-todo-2">
                                Description
                            </div>
                            <div className="tbl-col-hdr col-todo-3">
                                Start
                            </div>
                            <div className="tbl-col-hdr col-todo-4">
                                End
                            </div>
                            <div className="tbl-col-hdr col-todo-5">
                                Break
                            </div>
                            <div className="tbl-col-hdr col-todo-6">
                                Duration
                            </div>
                            <div className="tbl-col-hdr col-todo-7" style={date_col_display}>
                                Date
                            </div>
                        </div>);
        var rows = [];
        for (var i=0; i<this.props.todos.length; i++)
        {
            var todo = this.props.todos[i];
            var row = (<div key={todo.tsentryid} className="row-todo" onDoubleClick={this.onTodoDoubleClick.bind(this, todo)}> 
                            <div className="tbl-col col-todo-1" style={project_col_display}>
                                {todo.projects && todo.projects.length > 0 ? todo.projects[0].name: ''}
                            </div>
                            <div className="tbl-col col-todo-2">
                                {todo.description}
                            </div>
                            <div className="tbl-col col-todo-3">
                                {todo.starttime.toString().substr(11, 5)}
                            </div>
                            <div className="tbl-col col-todo-4">
                                {todo.endtime.toString().substr(11, 5)}
                            </div>
                            <div className="tbl-col col-todo-5">
                                {todo.break}
                            </div>
                            <div className="tbl-col col-todo-6">
                                {((new Date(todo.endtime))-(new Date(todo.starttime)))/60000 - todo.break}
                            </div>
                            <div className="tbl-col col-todo-7" style={date_col_display}>
                                {todo.entrydate.substr(0, 10)}
                            </div> 
                        </div>);
            rows.push(row);
        }
        return (
            

            <div className="tbl-todo">
                
                {header_row}
                {rows}
            </div>
        );
    }
}

