
import _ from 'lodash';
import React from 'react';



export default class TodoStats extends React.Component {

    constructor(props) {
        super(props);
       
    }


    format_hhmm(mins) {

        return this.pad(parseInt(mins / 60), 2) + ':' + this.pad(parseInt(mins % 60), 2);
    }
    
     pad(num, size) {
        var s = "000000000" + num;
        return s.substr(s.length-size);
    }


    render() {

        
        return (
            
            <div>

                <h2 style={{ fontSize: '1.2em', marginTop: '10px', fontWeight: 'bold'}}>Statistics</h2>
                <div>
                    <div className="field-box">
                        <div className="todo-label">Today</div>
                        <div className="todo-field">{this.format_hhmm(this.props.daily_minutes)}</div>
                    </div>
                    <div className="field-box">
                        <div className="todo-label">Week</div>
                        <div className="todo-field">{this.format_hhmm(this.props.weekly_minutes)}</div>
                    </div>
                    <div className="field-box">
                        <div className="todo-label">Month</div>
                        <div className="todo-field">{this.format_hhmm(this.props.monthly_minutes) }</div>
                    </div>
                </div>
            </div>
        );
    }
}

