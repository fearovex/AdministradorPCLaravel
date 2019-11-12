/**
 * Form Dialog
 */
/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

//Actions
import { addNewClient } from "Actions";

class AddClient extends React.Component {

	state = {
		open: false,
		fields: {},
		errors: {}
	};

	handleClickOpen = () => {
		this.setState({
			open: true,
			fields: {},
			errors: {}
		});
	};

	handleClose = () => {
		this.setState({ open: false });
		this.setState({
			fields: {},
			errors: {}
		});
	};

	//handle form validation
	handleValidation() {
		let fields = this.state.fields;
		let errors = {};
		let formIsValid = true;

		//FName
		if (!fields["name"]) {
			formIsValid = false;
			errors["name"] = "Cannot be empty";
		}

		if (typeof fields["name"] !== "undefined") {
			if (!fields["name"].match(/^[a-zA-Z]+$/)) {
				formIsValid = false;
				errors["name"] = "Only letters";
			}
		}

		//Email
		if (!fields["email"]) {
			formIsValid = false;
			errors["email"] = "Cannot be empty";
		}

		if (typeof fields["email"] !== "undefined") {
			let lastAtPos = fields["email"].lastIndexOf('@');
			let lastDotPos = fields["email"].lastIndexOf('.');

			if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
				formIsValid = false;
				errors["email"] = "Email is not valid";
			}
		}

		//mobile num.
		if (!fields["mobile"]) {
			formIsValid = false;
			errors["mobile"] = "Cannot be empty";
		}

		if (typeof fields["mobile"] !== "undefined") {
			if (!fields["mobile"].match(/^[a-zA-Z]+$/)) {
				formIsValid = false;
				errors["mobile"] = "number is not valid";
			}
		}

		//country
		if (!fields["location"]) {
			formIsValid = false;
			errors["location"] = "Cannot be empty";
		}

		if (typeof fields["location"] !== "undefined") {
			if (!fields["location"].match(/^[a-zA-Z]+$/)) {
				formIsValid = false;
				errors["location"] = "Only letters";
			}
		}

		this.setState({ errors: errors });
		return formIsValid;
	}

	handleChange(field, e) {
		let fields = this.state.fields;
		fields[field] = e.target.value;
		this.setState({ fields });
	}

	//submit form data
	onFormSubmit(e) {
		e.preventDefault();
		if (this.handleValidation()) {
			this.props.addNewClient(this.state.fields);
			this.setState({ open: false });
		} else {
			alert("Form has errors.")
		}
	}

	render() {
		return (
			<div>
				<Button variant="contained" color="primary" onClick={this.handleClickOpen}>
					Add
               <i className="material-icons pl-10">add</i>
				</Button>
				<Dialog className="client-dialog" open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
					<DialogContent>
						<div>
							<form onSubmit={this.onFormSubmit.bind(this)}>
								<div className="row">
									<div className="col-sm-12 col-md-12 col-lg-12 mb-20">
										<TextField
											fullWidth
											id="standard-name"
											label="Name"
											className="iron-form-input-wrap"
											error={this.state.errors["name"] ? true : false}
											ref="name"
											onChange={this.handleChange.bind(this, "name")}
											value={this.state.fields["name"] ? this.state.fields["name"] : ''}
										/>
										<span className="error">{this.state.errors["name"]}</span>
									</div>
									<div className="col-sm-12 col-md-12 col-lg-12 mb-20">
										<TextField
											fullWidth
											id="standard-name"
											label="Contact No"
											className="iron-form-input-wrap"
											error={this.state.errors["mobile"] ? true : false}
											ref="mobile"
											onChange={this.handleChange.bind(this, "mobile")}
											value={this.state.fields["mobile"] ? this.state.fields["mobile"] : ''}
										/>
										<span className="error">{this.state.errors["mobile"]}</span>
									</div>
									<div className="col-sm-12 col-md-12 col-lg-12 mb-20">
										<TextField
											fullWidth
											id="standard-email"
											label="email"
											className="iron-form-input-wrap"
											error={this.state.errors["email"] ? true : false}
											refs="email"
											onChange={this.handleChange.bind(this, "email")}
											value={this.state.fields["email"] ? this.state.fields["email"] : ''}
										/>
										<span className="error">{this.state.errors["email"]}</span>
									</div>
									<div className="col-sm-12 col-md-12 col-lg-12">
										<TextField
											fullWidth
											id="standard-name"
											label="location"
											className="iron-form-input-wrap"
											error={this.state.errors["location"] ? true : false}
											ref="location"
											onChange={this.handleChange.bind(this, "location")}
											value={this.state.fields["location"] ? this.state.fields["location"] : ''}
										/>
										<span className="error">{this.state.errors["location"]}</span>
									</div>
								</div>
								<div className="pt-25 text-right">
									<Button variant="contained" onClick={this.handleClose} className="btn-danger mr-15 text-white">
										Cancel
            		         </Button>
									<Button className="btn-success text-white text-capitalize" type="submit">Submit</Button>
								</div>
							</form>
						</div>
					</DialogContent>
				</Dialog>
			</div>
		);
	}
}

const mapStateToProps = ({ CrmReducer }) => {
	const { clientsData } = CrmReducer;
	return { clientsData };
}

export default connect(mapStateToProps, {
	addNewClient
})(AddClient);