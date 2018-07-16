import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { EditPassword as EditPassAction } from '../../store/password/password.action'
import PasswordValidation from './PasswordValidation'

class EditPassword extends Component {
	constructor() {
		super()
		this.state = {
			editId: '',
			editUrl: '',
			editEmail: '',
			editPass: '',
			upperCaseE: false,
      lowerCaseE: false,
      specialCharE: false,
      numberE: false,
      minLengthE: false,
      isItValidE: false
		}
	}

	componentDidMount() {
		this.setState({
			editId: this.props.data.id,
			editUrl: this.props.data.url,
			editEmail: this.props.data.email,
			editPass: this.props.data.password
		}, () => {
			this.uCaseValidation()
      this.lCaseValidation()
      this.sCharValidation()
      this.numberValidation()
      this.lengthValidation()
		})
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	pwdHandleChange = (e) => {
		this.setState({
			editPass: e.target.value
		}, () => {
			this.uCaseValidation()
      this.lCaseValidation()
      this.sCharValidation()
      this.numberValidation()
      this.lengthValidation()
		})
	}

	uCaseValidation = () => {
    let upperCase = /[A-Z]/g.test(this.state.editPass)
    if (upperCase) {
      this.setState({ upperCaseE: true }, () => this.checkAllValidation())
    } else {
      this.setState({ upperCaseE: false })
    }
    // console.log('upperCase ', upperCase)
  }

  lCaseValidation = () => {
    let lowerCase = /[a-z]/g.test(this.state.editPass)
    if (lowerCase) {
      this.setState({ lowerCaseE: true }, () => this.checkAllValidation())
    } else {
      this.setState({ lowerCaseE: false })
    }
    // console.log('lowerCase ', lowerCase)
  }

  sCharValidation = () => {
    // \W => nonword char
    let specialChar = /\W/g.test(this.state.editPass)
    if (specialChar) {
      this.setState({ specialCharE: true }, () => this.checkAllValidation())
    } else {
      this.setState({ specialCharE: false })
    }
    // console.log('special char ', specialChar)
  }

  numberValidation = () => {
    // \d digit char
    let number =  /\d/g.test(this.state.editPass)
    if (number) {
      this.setState({ numberE: true }, () => this.checkAllValidation())
    } else {
      this.setState({ numberE: false })
    }
    // console.log('number ', number)
  }

  lengthValidation = () => {
    if (this.state.editPass.length < 6) {
      // console.log('length', false)
      this.setState({ minLengthE: false })
    } else {
      // console.log('length', true)
      this.setState({ minLengthE: true }, () => this.checkAllValidation())
    }
  }

  checkAllValidation = () => {
    let editButton = document.querySelector('#submit'+this.props.data.id)
    let upperCase = this.state.upperCaseE
    let lowerCase = this.state.lowerCaseE
    let specialChar = this.state.specialCharE
    let number = this.state.numberE
    let minLength = this.state.minLengthE
    let url = this.state.editUrl
    let email = this.state.editEmail 

    if (upperCase && lowerCase && specialChar &&
    number && minLength) {
      if (editButton&& url && email) {
        editButton.classList.remove('disabled')
      }
      this.setState({isItValidE: true})
    } else {
      if (editButton&& url && email) {
        editButton.classList.add('disabled')
      }
      this.setState({ isItValidE: false})
    }
  }

  resetState = () => {
    this.setState({
      ...this.state,
      editUrl: '',
      editEmail: '',
      editPass: ''
    })
    // let url = document.getElementById('editUrl')
    // let email = document.getElementById('editEmail')
    // let pass = document.getElementById('editPass')
    // if ( url && email && pass ) {
    //   url.value = ''
    //   email.value = ''
    //   pass.value = ''
    // }
  }

	submitChange = (e) => {
		e.preventDefault()
		let userId = this.props.user.userId
		let changes = {
			...this.props.data,
			url: this.state.editUrl,
			email: this.state.editEmail,
			password: this.state.editPass
		}
		this.props.EditPassAction(changes, userId)
	}

	render() {
		const { id } = this.props.data
		let PassVal = ''
		if (!this.state.isItValidE) {
			PassVal = (
			<PasswordValidation 
				upperCase={ this.state.upperCaseE }
				lowerCase={ this.state.lowerCaseE }
				specialChar={ this.state.specialCharE }
				number={ this.state.numberE }
				minLength={ this.state.minLengthE }
			/>)
		}

		return (
			<div id={"edit"+id} className="modal fade" role="dialog">
				<div className="modal-dialog">
					<div className="row">
						<form className="col s12" onSubmit={this.submitChange}>
							<h4 className="header2">Edit Password</h4>
							<div className="row">
								<div className="input-field col s12">
									<input id={"editUrl"+id} type="text" name="editUrl"
									className="validate" value={this.state.editUrl}
                  onChange={this.handleChange} required/>
									<label htmlFor={"editUrl"+id}>Url</label>
								</div>
								<div className="input-field col s12">
									<input id={"editEmail"+id} type="text" name="editEmail"
									className="validate" value={this.state.editEmail}
                  onChange={this.handleChange} required/>
									<label htmlFor={"editEmail"+id}>Email / Username</label>
								</div>
								<div className="input-field col s12">
									<input id={"editPass"+id} type="password" name="editPass"
									className="validate" value={this.state.editPass}
                  onChange={this.pwdHandleChange} required/>
									<label htmlFor={"editPass"+id}>Password</label>
								</div>
								<div className="input-field col s12">
									{PassVal}
								</div>
								<div className="input-field col s12">
									<button id={"submit"+id} type="submit" className="btn teal waves-effect waves-light">Edit</button>
									<button className="btn teal" data-dismiss="modal">Cancel</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
  user: state.user,
  passwords: state.passwords
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  EditPassAction
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditPassword)