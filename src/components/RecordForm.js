import React from 'react'
import { create } from '../api/RecordsAPIs'

class RecordForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            date: '',
            title: '',
            amount: ''
        }
    }

    validButton(){
        return this.state.date && this.state.title && this.state.amount
    }

    handleChange = (e) =>{
        let name, obj
        name = e.target.name
        this.setState((
            obj = {},
            obj["" + name] = e.target.value,
            obj
        ))
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        let newRecordArray = {
            date: this.state.date,
            title: this.state.title,
            amount: parseInt(this.state.amount)
        }
        create(newRecordArray).then(
            response => this.props.handleNewRecord(response.data),
            this.setState({
                date: '',
                title: '',
                amount: ''
            })
        ).catch(
            error => this.setState({
                error: error
            })
        )
    }

    render() {
        return (
            <form className="form-inline mb-3" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input 
                        type="text" 
                        className='form-control mr-1' 
                        placeholder='Date' 
                        name='date' 
                        value={this.state.date}
                        onChange={this.handleChange}
                        />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        className = 'form-control mr-1'
                        placeholder='Title' 
                        name='title' 
                        value={this.state.title}
                        onChange={this.handleChange}
                        />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        className = 'form-control mr-1'
                        placeholder='Amount' 
                        name='amount'
                        value={this.state.amount}
                        onChange={this.handleChange}
                        />
                </div>
                <button type="submit" className="btn btn-primary" disabled={!this.validButton()}>Create Record</button>
            </form>
        )
    }
}

export default RecordForm;