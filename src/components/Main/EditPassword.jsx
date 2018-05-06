import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { EditPassword as EditPassAction } from '../../store/password/password.action'

class EditPassword extends Component {
	constructor() {
		super()
		this.state = {
			editId: '',
			editUrl: '',
			editEmail: '',
			editPass: ''
		}
	}

	componentDidMount() {
		this.setState({
			editId: this.props.data.id,
			editUrl: this.props.data.url,
			editEmail: this.props.data.email,
			editPass: this.props.data.password
		})
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
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
                  onChange={this.handleChange} required/>
									<label htmlFor={"editPass"+id}>Password</label>
								</div>
								<div className="input-field col s12">
									<button type="submit" className="btn teal waves-effect waves-light">Edit</button>
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