import React, { Component } from 'react'
import swal from 'sweetalert2'

class HideLoading extends Component {
  render() {
    return (
      <div>
        {
          swal.hideLoading()
        }
        {
          swal.close()
        }
       
      </div>
    )
  }
}

export default HideLoading 