import React, { Component } from 'react';
import {observer} from 'mobx-react'

import ReactTable from "react-table";
import 'react-table/react-table.css'

import auth from '../store/auth'
import user from '../store/user'

@observer class loadData extends Component {
  componentDidMount() {
    user.loadData(auth.userId)
  }

  timestamp (time) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let date = new Date(time).getDate()
    let month = new Date(time).getMonth()
    let year = new Date(time).getFullYear()
    return (date < 10)? `0${date} ${months[month]} ${year}`: `${date} ${months[month]} ${year}`
  }

  render() {
    const columns = [{
      Header: 'Url',
      accessor: 'url'
    },{
      Header: 'Username',
      accessor: 'username'
    },{
      Header: 'Password',
      accessor: 'password',
      Cell: row => (
        <div>
          {row.original.showPassword ? (
            <span>{row.value}</span>
          ) : (
            <span>{user.hashPassword(row.value)}</span>
          )}
        </div>
      )
    },{
      Header: 'Created At',
      accessor: 'createdAt',
      Cell: row => (
        <div>
          <span>{this.timestamp(row.value)}</span>
        </div>
      )
    },{
      Header: 'Updated At',
      accessor: 'updatedAt',
      Cell: row => (
        <div>
          {!row.value ? (
            <span>...</span>
          ) : (
            <span>{this.timestamp(row.value)}</span>
          )}
        </div>
      )
    },{
      Header: 'Action',
      Cell: row => (
        <div key={row.original.id}>
          <button onClick={ ()=> user.editPassword(auth.userId, row.original.id) }><i className="fas fa-pen-square"></i></button>
          <button onClick={ ()=> user.showPassword(auth.userId, row.original.id) }><i className="fas fa-eye"></i></button>
          <button onClick={ ()=> user.deleteData(auth.userId, row.original.id) }><i className="fas fa-trash"></i></button>
        </div>
      )
    }]
    return (
    <div className="listTable">
      <ReactTable
        data={user.listData}
        columns={columns}
        defaultPageSize={5}
        showPageSizeOptions= {false}
      />
    </div>
    )
  }
}

export default loadData;