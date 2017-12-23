
import _ from 'lodash';
import React from 'react';

import { setTSList, newTS, removeTS } from '../actions/tsActions';
import TodoStats from '../components/todo-stats';
import TodoEntry from '../components/todo-entry';

import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

import * as api from '../api';

import TodoTable from '../components/todo-table';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { Navbar, Button } from 'react-bootstrap';


export default class TodoPage extends React.Component {

    constructor(props) {
        super(props);

        const current_date = new Date();
        const today_date = new Date();
        

          this.state = {
                datePickerOpen: false,
                selectedDay: today_date,
                todos: [],
                customerid: 1,  // need to get from login

                todo: {
                    userid: 1, // login
                    description: '', 
                    starthour: current_date.getHours(), 
                    startminute: 0,
                    endhour: current_date.getHours() + 1,
                    endminute: 0,
                    break: 0,
                    tsentryid: 0,  // new todo
                    projectid: 0 }, // dummy
                projects: [],  // dummy

                daily_minutes: 0,
                weekly_minutes: 0,
                monthly_minutes: 0
            }
    }

    componentWillMount() {
        this.readProjects();
        this.readDailyTodos(this.state.selectedDay);
        this.readDailyStats(this.state.selectedDay);
    }

    readProjects = () => {

        const _this = this;
        api.projectsGetActive(this.state.customerid).then((response) => {
            
            // default - first project will be selected
            _this.setState({ projects: response.data, projectid: response.data[0].projectid });
            //
        }).catch((err) => {
            console.log(err);
        });
    }


    saveTodo = (todo) => {
        this.readDailyTodos(this.state.selectedDay);
        this.readDailyStats(this.state.selectedDay);
    }


    deleteTodo = (tsentryid) => {
        this.readDailyTodos(this.state.selectedDay);
        this.readDailyStats(this.state.selectedDay);
    }

    readDailyTodos = (sel_date) => {

        const yyyyMMdd = sel_date.getFullYear() + this.pad(sel_date.getMonth()+1, 2) + this.pad(sel_date.getDate(), 2);
        const _this = this;
        api.todosGetByDay(yyyyMMdd).then((response) => {

            _this.setState({todos: response.data});
        }).catch((err) => {
            console.log(err);
        })
    }

    readDailyStats = (sel_date) => {
        const yyyyMMdd = sel_date.getFullYear() + this.pad(sel_date.getMonth()+1, 2) + this.pad(sel_date.getDate(), 2);
        const _this = this;
        api.todosGetDailyStats(yyyyMMdd).then((response) => {

            if (response.data.is_error) {
                // show error
                console.log(response.message);
            }
            else {
                let data = response.data;
                _this.setState({daily_minutes: data.daily_minutes,
                                weekly_minutes: data.weekly_minutes,
                                monthly_minutes: data.monthly_minutes});
            }
        }).catch((err) => {
            console.log(err);
        })
    }


  handleDayClick = (day) => {
    
    this.setState({ 
      selectedDay: day
    })
    this.readDailyTodos(day);
    this.readDailyStats(day);
    this.handleDayPickerOpen();
  }

  

    pad(num, size) {
        var s = "000000000" + num;
        return s.substr(s.length-size);
    }

    handleDayPickerOpen() {
        this.setState( { datePickerOpen: !this.state.datePickerOpen})
    }

    editTodo(todo) {
        const starttime = new Date(todo.starttime);
        const endtime = new Date(todo.endtime);

        const todo2 = {...todo, 
            starthour: starttime.getUTCHours(), 
            startminute: starttime.getUTCMinutes(),
            endhour: endtime.getUTCHours(),
            endminute: endtime.getUTCMinutes(),
        }
        this.setState({ todo: todo2 });
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
                            
        return (
            
            <div>

                <h2>Daily - Todo List</h2>
                <div className="ts-daypicker">
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

                <TodoEntry projects = {this.state.projects}
                             todo={this.state.todo} 
                             selectedDay={this.state.selectedDay} 
                             onSaveTodo={(todo) => {this.saveTodo(todo)}}
                             onDeleteTodo={(tsentryid) => {this.deleteTodo(tsentryid)}} />

                <div className="ts-stats">
                    <TodoStats daily_minutes={this.state.daily_minutes} 
                                weekly_minutes={this.state.weekly_minutes}
                                monthly_minutes={this.state.monthly_minutes} />
                </div>

                <TodoTable todos={this.state.todos} 
                        is_date_col={false} 
                        is_project_col={true} 
                        onRowDoubleClick={(todo) => this.editTodo(todo)} />
            </div>
        );
    }
      
}