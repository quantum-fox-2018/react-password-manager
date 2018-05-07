import React, { Component } from 'react';
import {observer} from 'mobx-react'

import ReactTable from "react-table";
import 'react-table/react-table.css'

import auth from '../store/auth'
import user from '../store/user'

@observer class loadData extends Component {
  componentWillMount() {
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
            <p>{row.value}</p>
          ) : (
            <p>{user.hashPassword(row.value)}</p>
          )}
        </div>
      )
    },{
      Header: 'Created At',
      accessor: 'createdAt',
      Cell: row => (
        <div>
          <p>{this.timestamp(row.value)}</p>
        </div>
      )
    },{
      Header: 'Updated At',
      accessor: 'updatedAt',
      Cell: row => (
        <div>
          {!row.value ? (
            <p>...</p>
          ) : (
            <p>{this.timestamp(row.value)}</p>
          )}
        </div>
      )
    },{
      Header: 'Action',
      Cell: row => (
        <div key={row.original.id}>
          <button onClick={ ()=> user.editPassword(auth.userId, row.original.id) }>edit</button>
          <button onClick={ ()=> user.showPassword(auth.userId, row.original.id) }>see</button>
          <button onClick={ ()=> user.deleteData(auth.userId, row.original.id) }>delete</button>
        </div>
      )
    }]
    return (
    <div style={{paddingBottom:"100px"}}>
      <ReactTable
        data={user.listData}
        columns={columns}
        defaultPageSize={5}
      />
    </div>
    )
  }
}

export default loadData;