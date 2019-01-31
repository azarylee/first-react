import React from 'react';
import Record from './Record'
import RecordForm from './RecordForm'
import AmountBox from './AmountBox'
import { getAll } from '../api/RecordsAPIs'


class Records extends React.Component {
  constructor(){
    super()
    this.state = {
      error: null,
      isLoading: false,
      records: [],
      
    }
  }

  componentDidMount(){
    getAll().then(
      response => 
      this.setState({
        records: response.data,
        isLoading: true
      }),
    ).catch(
      error => 
      this.setState({
            isLoading: true,
            error
      })
    )
  }

  addRecord = (record) =>{
    this.setState({
        error: null,
        isLoading: true,
        records: [
          ...this.state.records,
          record
        ]
    })
  }

  updateRecord = (record,data) =>{
    console.log('updateRecord')
    console.log(record)
    console.log(data)
    const recordIndex = this.state.records.indexOf(record)
    const newRecords = this.state.records.map((item,index) =>{
      if (index !== recordIndex) {
        return item
      }
      return{
        ...item,
        ...data
      }
    })
    this.setState({
      records: newRecords
    })
  }

  deleteRecord = (record) => {
    console.log('deleteRecord')
    console.log(record)
    const recordIndex = this.state.records.indexOf(record)
    const newRecords = this.state.records.filter((item,index) => index !== recordIndex)
    this.setState({
      records: newRecords
    })
  }

  credits(){
    let credits = this.state.records.filter((record) => {
      return record.amount >=0
    })
    let num = credits.map((item)=>{
      return item.amount
    })
    return num.reduce((prev, curr) => {
      return prev + curr
    })
  }

  debits(){
    console.log(this.state.records)
    let debits = this.state.records.filter((record) => {
      return record.amount < 0
    })
    console.log(debits)
    let num = debits.map((item) => {
      return item.amount
    })
    return num.reduce((prev, curr) => {
      return prev + curr
    })
  }

  balance = () => {
    return this.credits() + this.debits()
  }

  loadCss = () => {
    return {opacity: '0.5'}
  }

  render() {
    const { error, isLoading, records } = this.state
    let recordsComponent
    let AmountBoxItem
    if(error){
      recordsComponent = <div> Error: { error.response.data } </div>
    } else if(!isLoading){
      recordsComponent = <div> Loading... </div>
    } else {
      recordsComponent = (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => 
              <Record 
                key={record.id} 
                record={record} 
                handleEditRecord={this.updateRecord}
                handleDeleteRecord={this.deleteRecord}
                />
            )}
          </tbody>
        </table>    
      )
    }

    if(isLoading){
      AmountBoxItem = (
        <div className = "row mb-3" >
          <AmountBox text='Credit' type='success' amount={this.credits()} css={this.loadCss()} />
          <AmountBox text='Debit' type='danger' amount={this.debits()} />
          <AmountBox text='Balance' type='info' amount={this.balance()} />
        </div>
      )
    }

    return (
      <div className = "Records ml-5 mt-5" >
          <h2>Records</h2>
          {AmountBoxItem}
            
          
          <RecordForm handleNewRecord={this.addRecord}/>
          {recordsComponent}
      </div>
    )
  }
}

export default Records;
