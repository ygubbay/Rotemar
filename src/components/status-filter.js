import React from 'react';
import { Button } from 'react-bootstrap';
import * as api from '../api';
import cx from 'classnames';

export default class StatusFilter extends React.Component {


    constructor(props) {
        super(props);

        this.state = { statuses: [], all_on: false };

        
        
    }

    componentDidMount() {

        api.getOrderStatuses().then((response) => 
        {
            var statuses = response.data.reverse();
            statuses.map((value) => {value.on = true});

            this.setState({ statuses: statuses });

            
        }).catch((err) => console.log(err) );
    }

    toggleStatusClick(status_name) {
        console.log('toggleStatusClick event:');
        
        const new_stats = this.state.statuses.map((status) => {

            if (status.Name == status_name)
            {
                status.on = !status.on;
            }
            return status;
        });
        this.setState({ statuses: new_stats });

        var statuses_on = [];
        new_stats.map((status) => {
            if (status.on)
            {
                statuses_on.push(status);
            }
        })
        this.props.handleStatusListChange(statuses_on);
    }
    

    toggleAllStatusClick() {
        console.log('toggleAllStatusClick event:');
        
        const new_stats = this.state.statuses.map((status) => {

            status.on = !this.state.all_on;
            return status;
        });
        this.setState({ statuses: new_stats, all_on: !this.state.all_on });
        this.props.handleStatusListChange(new_stats);

        var statuses_on = [];
        new_stats.map((status) => {
            if (status.on)
            {
                statuses_on.push(status);
            }
        })
        this.props.handleStatusListChange(statuses_on);
    }


    render() {

        var status_buttons = (this.state.statuses).map((status, index) =>  <button className={cx('status-buttons', {'on': status.on}, {'off': !status.on})} key={index} onClick={this.toggleStatusClick.bind(this, status.Name)}>{status.Name}</button> );
            


        return (

            <div className="status-filter">
                
                <button className={cx('status-buttons', {'on': this.state.all_on}, {'off': !this.state.all_on})} key="All" onClick={this.toggleAllStatusClick.bind(this)}>הכל</button>
                {status_buttons}
            </div>
        )
    }
}