import React, { Component } from 'react'
import swal from 'sweetalert2'

class Loading extends Component {
  render(){
    return (
      <div>
        {
          swal.showLoading()
        }
      </div>
    )
  }
}

export default Loading 