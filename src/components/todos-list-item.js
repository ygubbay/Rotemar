import React from 'react';

export default class TodosListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false
        }
    }

    onEditClick() {
        this.setState( {isEditing: true});
    }

    onDeleteClick() {
        this.props.onDelete(this.props.ts);
    }

    onCancelClick() {
        this.setState( {isEditing: false});
    }

    renderActionSection() {
        if (!this.state.isEditing)
        {
            return (<td><button onClick={this.onEditClick.bind(this)}>Edit</button>
                    <button onClick={this.onDeleteClick.bind(this)}>Delete</button>
                    </td>);
        }
        else {
            return (<td><button>Save</button>
                    <button onClick={this.onCancelClick.bind(this)}>Close</button>
                    </td>
            )}
    }

    render() {

        var taskStyle={ color: this.props.ts.isCompleted ? 'green': 'red'};
        return (            
            <tr>
                <td style={taskStyle}>{this.props.ts.task}</td>
                
                {this.renderActionSection()}
                    
            </tr>
        );
    }
}