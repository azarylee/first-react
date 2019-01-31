import React from 'react'
import propTypes from 'prop-types'
import { update, remove } from '../api/RecordsAPIs'

class Record extends React.Component {
    constructor(){
        super()
        this.state = {
            edit: false,
            error: null
        }
    }

    handleToggle = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    handleEdit = (e) => {
        e.preventDefault();
        const record = {
            date: this.refs.date.value,
            title: this.refs.title.value,
            amount: Number.parseInt(this.refs.amount.value, 0),
        }
        console.log(record)
        update(this.props.record.id,record).then(
            response => {
                this.setState({
                    edit: false
                })
                this.props.handleEditRecord(this.props.record,response.data)
            }
        ).catch(
            error => 
            this.setState({
                error: error
            })
        )
    }

    handleDelete = (e) => {
        e.preventDefault()
        remove(this.props.record.id).then(
            response => console.log(response),
            this.props.handleDeleteRecord(this.props.record)
        ).catch(
            error => console.log(error)
        )
    }

    recordRow(){
        return (
            <tr>
                <td>{this.props.record.date}</td>
                <td>{this.props.record.title}</td>
                <td>{this.props.record.amount}</td>
                <td>
                    <button className="btn btn-info mr-1" onClick={this.handleToggle}>Edit</button>
                    <button className="btn btn-danger mr-1" onClick={this.handleDelete}>Delete</button>
                </td>
            </tr>
        )
    }

    recordForm(){
        return (
            <tr>
                <td><input type="text" className="form-control" defaultValue={this.props.record.date} ref="date"/></td>
                <td><input type="text" className="form-control" defaultValue={this.props.record.title} ref="title"/></td>
                <td><input type="text" className="form-control" defaultValue={this.props.record.amount} ref="amount"/></td>
                <td>
                    <button className="btn btn-info mr-1" onClick={this.handleEdit}>Update</button>
                    <button className="btn btn-danger mr-1" onClick={this.handleToggle}>Cancel</button>
                </td>
            </tr>
        )
    }

    render() {
        if(this.state.edit){
            return this.recordForm()
        } else {
            return this.recordRow()
        }
    }
}

Record.propTypes = {
    id: propTypes.string,
    date: propTypes.string,
    title: propTypes.string,
    amount: propTypes.number
}

export default Record;