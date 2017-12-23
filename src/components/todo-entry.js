
import _ from 'lodash';
import React from 'react';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { Navbar, Button } from 'react-bootstrap';

import * as api from '../api';


export default class TodoEntry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todo: this.props.todo,
            selectedDay: this.props.selectedDay,
            userid: 1,   // from login
            project_options: _.map(this.props.projects, this.getProjectOption)

        }

        this.state.todo.projectid = this.props.projects.length > 0 ? this.props.projects[0].projectid: 0;
    }

    componentDidMount() {
        this.descriptionInput.focus();
    }

    componentWillReceiveProps(nextProps) {

        // handle edit Todo event
        if (this.props.todo.tsentryid != nextProps.todo.tsentryid) {

            this.setState({ todo: nextProps.todo });
        }

        if (this.state.project_options.length == 0 && this.props.projects.length > 0)
        {
            this.setState({ project_options:  _.map(this.props.projects, this.getProjectOption) })
        }
    }



    format_hhmm(mins) {

        return this.pad(parseInt(mins / 60), 2) + ':' + this.pad(parseInt(mins % 60), 2);
    }
    
     pad(num, size) {
        var s = "000000000" + num;
        return s.substr(s.length-size);
    }

    getProjectOption = (project) => {
  
      var is_selected = (this.state.todo.projectid == project.projectid) ? {selected: true}: {};
      return (<option key={project.projectid} {...is_selected} value={project.projectid}>{project.name}</option>);
    }

    handleProjectChange(event) {

        const todo = {...this.state.todo, projectid: parseInt(event.target.value )};
        this.setState({ todo })
    }

    handleInputChange(event) {

      const name =  event.target.name;
      const todo = this.state.todo;
      todo[name] = event.target.value;
      this.setState({ todo });
  }

  handleTimeClick(event) {
      const name_op = event.target.id;

      const id = name_op.substr(0, 3); // sta/end
      const op = name_op.substr(4, 2);  // up/dn
      const am = name_op.substr(7, 2);  // hr/mi

      const min_name = id == 'sta' ? 'startminute': 'endminute';
      const hr_name = id == 'sta' ? 'starthour': 'endhour';

      let min_value = 0;
      let hr_value = 0;

      if (am == 'mi') {

          // minute
          

          const step_amount = 15;
          if (op == 'up') {

            // Up minute
            if ((this.state.todo[min_name]+step_amount) > 59) {

                 min_value = this.state.todo[min_name]+step_amount - 60;
                 hr_value = this.state.todo[hr_name] < 23 ? this.state.todo[hr_name] + 1: 0;

            }
            else {

                 min_value = this.state.todo[min_name]+step_amount;
                 hr_value = this.state.todo[hr_name];
            }
          }
          else {

              // Down minute
               if ((this.state.todo[min_name]-step_amount) < 0) {

                 min_value = this.state.todo[min_name]-step_amount + 60;
                 hr_value = this.state.todo[hr_name] > 0 ? this.state.todo[hr_name] - 1: 23;

                }
                else {

                     min_value = this.state.todo[min_name]-step_amount;
                     hr_value = this.state.todo[hr_name] ;
                }
          }
      } 
      else {

          // edit hour
          const step_amount = 1;
           min_value = this.state.todo[min_name];

          if (op == 'up') {
            
            // Up hour
             hr_value = (this.state.todo[hr_name] < 23) ? this.state.todo[hr_name] + 1: 0;

          }
          else {

            // Down hour
             hr_value = (this.state.todo[hr_name] > 0) ? this.state.todo[hr_name] - 1: 0;
          }
      }

      const td = {...this.state.todo, [min_name]: min_value, [hr_name]: hr_value };
      this.setState({ todo: td });
  }


    handleNewTodoClick() {
        
        const todo = { description: '', 
                        starthour: (new Date()).getHours(), 
                        startminute: 0,
                        endhour: (new Date()).getHours() + 1,
                        endminute: 0,
                        break: 0,
                        tsentryid: 0,
                        projectid: this.state.todo.projectid,
                        userid: this.state.userid   
                    };
        this.setState({ todo });

    }
    handleSaveTodoClick() {

        const _this = this;

        const sel_day = this.props.selectedDay;
        const starttime = new Date(Date.UTC(sel_day.getFullYear(), 
            sel_day.getMonth(),
            sel_day.getDate(),
            this.state.todo.starthour,
            this.state.todo.startminute
        ))

        const endtime = new Date(Date.UTC(sel_day.getFullYear(), 
            sel_day.getMonth(),
            sel_day.getDate(),
            this.state.todo.endhour,
            this.state.todo.endminute
        ))
        
        const todo = { description: this.state.todo.description, 
                        starttime,
                        endtime,
                        break: this.state.todo.break,
                        tsentryid: this.state.todo.tsentryid,
                        projectid: this.state.todo.projectid,
                        userid: this.state.todo.userid,
                        entrydate: this.props.selectedDay,
                    };
        

        api.todoSave(todo).then((response) => {

            this.handleNewTodoClick();
            this.props.onSaveTodo(todo);
            

        }).catch((err) => {
            console.log(err);
        })
        

    }
    handleDeleteTodoClick() {

        if (!this.props.todo.tsentryid)
            return;

        api.todoDelete(this.props.todo.tsentryid).then((response) => {
            this.handleNewTodoClick();
            this.props.onDeleteTodo(this.props.todo.tsentryid);
            
        }).catch((err) => {
            console.log(err);
        });
   
    }
  


    render() {

        
        const duration = (this.state.todo.endhour - this.state.todo.starthour) * 60 + (this.state.todo.endminute - this.state.todo.startminute) - this.state.todo.break;
        const tsentryid_display = this.state.todo.tsentryid ? this.state.todo.tsentryid: '';

        return (
            
                <div className="ts-entry-box">
                    <div>
                        <label className="on-top">Project</label>
                        <select className="select-proj" value={this.state.todo.projectid} onChange={this.handleProjectChange.bind(this)}> 
                            {this.state.project_options? this.state.project_options: []}
                        </select>
                        <button className="btn btn-success" style={{ fontSize: '0.8em', 'marginLeft': '10px'}}>New Project</button>
                    </div>
                    <div style={{marginTop: '10px'}}>
                        <label className="on-top">Description</label>
                        <input type="text" ref={(input) => { this.descriptionInput = input; }} name="description" style={{ width: '100%'}} value={this.state.todo.description} onChange={this.handleInputChange.bind(this)}/>
                    </div>

                    <div style={{marginTop: '25px'}}>
                      
                        <div className="button-up-col" style={{ marginLeft: '56px'}} onClick={this.handleTimeClick.bind(this)}><Glyphicon id="sta_up_hr" glyph="chevron-up" /></div>
                        <div className="button-up-col" style={{ marginLeft: '20px'}} onClick={this.handleTimeClick.bind(this)}><Glyphicon id="sta_up_mi" glyph="chevron-up" /></div>
                        <div className="button-up-col" style={{ marginLeft: '73px'}} onClick={this.handleTimeClick.bind(this)}><Glyphicon id="end_up_hr" glyph="chevron-up" /></div>
                        <div className="button-up-col" style={{ marginLeft: '20px'}} onClick={this.handleTimeClick.bind(this)}><Glyphicon id="end_up_mi" glyph="chevron-up"/></div>
                    </div>
                    <div>
                        <label>Start</label>
                        <input type="text" className="time-text" style={{marginLeft: '5px'}} maxLength="2" name="starthour" value={this.pad(this.state.todo.starthour, 2)} onChange={this.handleInputChange.bind(this)} />
                        <input type="text" className="time-text" style={{marginLeft: '5px'}}  maxLength="2" name="startminute" value={this.pad(this.state.todo.startminute, 2)}  onChange={this.handleInputChange.bind(this)}/>
                        
                        <label style={{marginLeft: '20px'}}>End</label>
                        <input type="text"  className="time-text" style={{marginLeft: '5px'}}  maxLength="2" name="endhour" value={this.pad(this.state.todo.endhour, 2)}  onChange={this.handleInputChange.bind(this)}/>
                        <input type="text"  className="time-text"  style={{marginLeft: '5px'}} maxLength="2" name="endminute" value={this.pad(this.state.todo.endminute, 2)}  onChange={this.handleInputChange.bind(this)}/>
                    </div>
                    <div style={{marginTop: '5px'}}>
                      
                        <div className="button-up-col" style={{ marginLeft: '56px'}} onClick={this.handleTimeClick.bind(this)}><Glyphicon id="sta_dn_hr" glyph="chevron-down"  /></div>
                        <div className="button-up-col" style={{ marginLeft: '20px'}} onClick={this.handleTimeClick.bind(this)}><Glyphicon id="sta_dn_mi" glyph="chevron-down" /></div>
                        <div className="button-up-col" style={{ marginLeft: '73px'}} onClick={this.handleTimeClick.bind(this)}><Glyphicon id="end_dn_hr" glyph="chevron-down" /></div>
                        <div className="button-up-col" style={{ marginLeft: '20px'}} onClick={this.handleTimeClick.bind(this)}><Glyphicon id="end_dn_mi" glyph="chevron-down"/></div>
                    </div>

                    <div className="two-col">
                        <label>Break</label>
                        <input type="text" className="input-control" value={this.state.todo.break} />
                    </div>
                    <div className="two-col">
                        <label>Duration</label>
                        <input type="text" className="input-control readonly" readOnly value={duration} />
                    </div>
                    <hr />

                    <button className="btn btn-primary btn-small" onClick={this.handleNewTodoClick.bind(this)}>New</button>
                    <button className="btn btn-primary btn-small" onClick={this.handleSaveTodoClick.bind(this)}>Save</button>
                    <button className="btn btn-primary btn-small" onClick={this.handleDeleteTodoClick.bind(this)}>Delete</button>

                    <input type="text" id="ts_id" className="readonly" value={tsentryid_display} readOnly />
                </div>
        );
    }
}

