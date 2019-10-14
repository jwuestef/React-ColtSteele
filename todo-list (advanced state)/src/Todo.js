import React, { Component } from 'react'
import './Todo.css'

export default class Todo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            task: this.props.task
        }
        this.handleRemove = this.handleRemove.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleToggleCompletion = this.handleToggleCompletion.bind(this);
    }

    handleRemove() {
        this.props.removeTodo(this.props.id);
    }

    toggleForm() {
        this.setState({
            isEditing: !this.state.isEditing
        })
    }

    handleUpdate(e) {
        e.preventDefault();
        this.props.updateTodo(this.props.id, this.state.task)
        this.setState({ isEditing: false })
    }

    handleChange(e) {
        this.setState({
            task: e.target.value
        })
    }

    handleToggleCompletion(e) {
        this.props.toggleCompletion(this.props.id)
    }

    render() {
        let result;
        if (this.state.isEditing) {
            result = (
                <div>
                    <form onSubmit={this.handleUpdate}>
                        <input type="text" name='task' value={this.state.task} onChange={this.handleChange} />
                        <button>Save</button>
                    </form>
                </div>
            )
        } else {
            result = (
                <div>
                    <button onClick={this.toggleForm}>Edit</button>
                    <button onClick={this.handleRemove}>X</button>
                    <li className={this.props.completed ? 'completed' : ''} onClick={this.handleToggleCompletion}>{this.props.task}</li>
                </div>
            )
        }
        return result
    }

}
