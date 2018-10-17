import React, { Component } from "react";
import { Row, Input } from "react-materialize";

class ThingsForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			task: "",
			howTo: ""
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleSubmit = event => {
		event.preventDefault();
		console.log("this.state: " + this.state);
		const data = {
			task: this.state.task,
			howTo: this.state.howTo
		}
		// to be used later with the withUser services
		const { history } = this.props;
		console.log("Saving data: ", data);
	}

}