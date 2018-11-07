import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Row, Input, Button, Collapsible, CollapsibleItem, Modal } from "react-materialize";
import API from "../../utils/API";
import "./Cameras.css";

const moment = require("moment");

class Cameras extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cameras: [],
			toggle: false,
			location: "",
			camera_name: "",
			host_name: "",
			mac_address: "",
			model: "",
			static_IP: "",
			sd_card_size: "",
			SNMP: false,
			notes: "",
			last_verified: "",
			modal_location: "",
			modal_camera_name: "",
			modal_host_name: "",
			modal_mac_address: "",
			modal_model: "",
			modal_static_IP: "",
			modal_sd_card_size: "",
			modal_SNMP: false,
			modal_notes: "",
			modal_last_verified: ""
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggleAll = this.toggleAll.bind(this);
	}

	handleInputChange(e) {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({ 
			[name] : value 
		});
	}

	handleSubmit = event => {
		event.preventDefault();
		// console.log("this.state: ", this.state);
		const data = {
			location: this.state.location,
			camera_name: this.state.camera_name,
			host_name: this.state.host_name,
			mac_address: this.state.mac_address,
			model: this.state.model,
			static_IP: this.state.static_IP,
			sd_card_size: this.state.sd_card_size,
			SNMP: this.state.SNMP,
			notes: this.state.notes,
			last_verified: this.state.last_verified
		};
		// to be used later with the withUser services
		// const { history } = this.props;
		console.log("Saving data: ", data);
		API.submitCameras(data)
			.then(res => {
				console.log("Uploaded successfully");
				this.setState({
					location: "",
					camera_name: "",
					host_name: "",
					mac_address: "",
					model: "",
					static_IP: "",
					sd_card_size: "",
					SNMP: false,
					notes: ""				
				});
			})
			.catch(err => console.log("submitCameras: ", err));
		this.loadCameras();		

	}

	loadCameras = () => {
		API.getCameras()
			.then(res => {
				// console.log("getting cameras: ", res.data);
				// console.log("current state: ", this.state);
				this.setState({
					cameras: res.data
				})
			})
			.catch(err => console.log("error getting cameras: ", err));
	}

	handleUpdate = event => {
		event.preventDefault();
		const id = event.target.getAttribute('cameraid');
		const date = this.state.modal_last_verified ? moment(this.state.modal_last_verified).format() : "";
		const rawData = {
			location: this.state.modal_location,
			camera_name: this.state.modal_camera_name,
			host_name: this.state.modal_host_name,
			mac_address: this.state.modal_mac_address,
			model: this.state.modal_model,
			static_IP: this.state.modal_static_IP,
			sd_card_size: this.state.modal_sd_card_size,
			SNMP: this.state.modal_SNMP,
			notes: this.state.modal_notes,
			last_verified: date
		};
		console.log("rawData: ", rawData);
		const removeFalsy = obj => {
			let newObj = {};
			Object.keys(obj).forEach((prop) => {
				if (obj[prop]) { newObj[prop] = obj[prop];
				}
			})
			return newObj;
		}
		const data = removeFalsy(rawData);
		console.log("data: ", data);
		API.changeCameras(id, data)
			.then(res => {
				console.log("Updated successfully");
				this.setState({
					modal_location: "",
					modal_camera_name: "",
					modal_host_name: "",
					modal_mac_address: "",
					modal_model: "",
					modal_static_IP: "",
					modal_sd_card_size: "",
					modal_SNMP: false,
					modal_notes: "",
					modal_last_verified: ""
				});
			})
			.catch(err => console.log("changeCameras: ", err));
		this.loadCameras();
	}

	deleteCameras = (data) => {
		const delId = data._id;
		API.deleteCameras(delId)
			.then(res => {
				// console.log("deleting cameras: ", delId);
				this.loadCameras();
			})
			.catch(err => console.log("error deleting cameras: ", err));
	}

	toggleAll() {
		var x = document.getElementsByTagName("li");
		var y = document.getElementsByClassName("collapsible-header");
		var z = document.getElementsByClassName("collapsible-body");
		// console.log(this.state.toggleState);
		if (!this.state.toggleState) {
			for (let i of x) {
				i.classList.add("active");
			};
			for (let j of y) {
				j.classList.add("active");
			};
			for (let k of z) {
				k.style.display = "block";
			}; 
			// console.log("triggering toggle");
		} else {
			for (let i of x) {
				i.classList.remove("active");
			};
			for (let j of y) {
				j.classList.remove("active");
			};
			for (let k of z) {
				k.style.display = "none";
			}; 
			// console.log("triggering toggle");
		}
		this.setState({
			toggleState: !this.state.toggleState
		});
	}

	componentDidMount() {
		this.loadCameras();
	}

	componentDidUpdate () {
		// To allow for links on page
	  let hash = this.props.location.hash.replace('#', '');
    if (hash) {
      let node = ReactDOM.findDOMNode(this.refs[hash]);
      if (node) {
        node.scrollIntoView();
      }
    }
	}

	render() {
		return (
			<div className="container" ref="top">
				<div className="container">
					<Row>
						<h4 className="page-header">Cameras</h4>
					</Row>					
				</div>
				{this.state.cameras.length ? (
					<Collapsible>
					{this.state.cameras.map((camera, i) => (
						<CollapsibleItem header={camera.static_IP} icon='place' key={camera._id}>
							<Row>
								<pre>
								Location: {camera.location}<br/>
								Camera Name in Axis: {camera.camera_name}<br/>
								Host Name: {camera.host_name}<br/>
								Mac Address: {camera.mac_address}<br/>
								Model: {camera.model}<br/>
								Static IP: {camera.static_IP}<br/>
								SD Card Size: {camera.sd_card_size}<br/>
								SNMP: {String(camera.SNMP)}<br/>
								Notes: {camera.notes}<br/>
								Last Verified: {moment(camera.last_verified).format("MMMM-DD-YY")}<br/>
								</pre>
							</Row>
							<Row className="action-buttons">
								<Modal
									style={{height: "200%"}}
									header={camera.static_IP}
									trigger={
										<Button
											className="actions col s1 offset-s9"
											cameraid={camera._id}
											>Update
										</Button>}
									actions={
										<div>
											<form 
												cameraid={camera._id}
												onSubmit={this.handleUpdate}
											>
												<Row>
													<Input
														label="Location"
														name="modal_location"
														s={4}
														defaultValue={camera.location}
														onChange={this.handleInputChange} 
													/>
													<Input
														label="Camera Name in Axis"
														name="modal_camera_name"
														s={4}
														defaultValue={camera.camera_name}
														onChange={this.handleInputChange}
													/>
													<Input
														label="Host Name"
														name="modal_host_name"
														s={4}
														defaultValue={camera.host_name}
														onChange={this.handleInputChange}
													/>
													<Input
														label="Mac Address"
														name="modal_mac_address"
														s={3}
														defaultValue={camera.mac_address}
														onChange={this.handleInputChange}
													/>
													<Input
														label="Model"
														name="modal_model"
														s={3}
														defaultValue={camera.model}
														onChange={this.handleInputChange}
													/>
													<Input
														label="Static IP"
														name="modal_static_IP"
														s={3}
														defaultValue={camera.static_IP}
														onChange={this.handleInputChange}
													/>
													<Input
														label="SD Card Size"
														name="modal_sd_card_size"
														s={3}
														defaultValue={camera.sd_card_size}
														onChange={this.handleInputChange}
													/>
													<Input
														label="SNMP"
														name="modal_SNMP"
														s={12}
														type="checkbox"
														checked={camera.SNMP}
														onChange={this.handleInputChange}
													/>
													<Input 
														label="Notes"
														name="modal_notes"
														s={12}
														type="textarea"
														defaultValue={camera.notes}
														onChange={this.handleInputChange}
													/>
													<Input 
														label="Last Verified"
														name="modal_last_verified"
														s={12}
														defaultValue={moment(camera.last_verified).format("MM-DD-YY")}
														onChange={this.handleInputChange}
													/>
												</Row>
												<Row>
													<Button
														modal="close"
														className="actions col s2 red"
													>Update
													</Button>
												</Row>
											</form>
										</div>
									}>
								</Modal>
								<Button 
									className="actions col s1 red" 
									onClick={this.deleteCameras.bind(this, camera)}
								>Delete
								</Button>
							</Row>
						</CollapsibleItem>
					))}
					</Collapsible>
				) : (
				<div>
					<h3> Uh-oh, looks like we are having some problems finding what you are looking for.</h3>
				</div>
				)}
				<div className="add-form" ref="submit_form">
					<h5>Add a New Camera</h5>
					<form id="submit_form" onSubmit={this.handleSubmit}>
						<Row>
							<Input						
								placeholder="Location"
								name="location"
								s={4}
								value={this.state.location}
								onChange={this.handleInputChange} 
							/>
							<Input
								placeholder="Camera Name in Axis"
								name="camera_name"
								s={4}
								value={this.state.camera_name}
								onChange={this.handleInputChange}
							/>
							<Input
								placeholder="Host Name"
								name="host_name"
								s={4}
								value={this.state.host_name}
								onChange={this.handleInputChange}
							/>
							<Input
								placeholder="Mac Address"
								name="mac_address"
								s={3}
								value={this.state.mac_address}
								onChange={this.handleInputChange}
							/>
							<Input
								placeholder="Model"
								name="model"
								s={3}
								value={this.state.model}
								onChange={this.handleInputChange}
							/>
							<Input
								placeholder="Static IP"
								name="static_IP"
								s={3}
								value={this.state.static_IP}
								onChange={this.handleInputChange}
							/>
							<Input
								placeholder="SD Card Size"
								name="sd_card_size"
								s={3}
								value={this.state.sd_card_size}
								onChange={this.handleInputChange}
							/>
							<Input
								label="SNMP"
								name="SNMP"
								s={12}
								type="checkbox"
								checked={this.state.SNMP}
								onChange={this.handleInputChange}
							/>
							<Input 
								placeholder="Notes"
								name="notes"
								s={12}
								type="textarea"
								value={this.state.notes}
								onChange={this.handleInputChange}
							/>
							<Input 
								placeholder="Last Verified"
								name="last_verified"
								s={12}
								value={this.state.last_verified}
								onChange={this.handleInputChange}
							/>
						</Row>
						<Row>
							<Button
								waves='light'
								large={true}
								type="submit"
							>Submit
							</Button>
						</Row>
					</form>
				</div>
	      <div>
					<Button floating fab='vertical' icon='find_in_page' className='red' large style={{bottom: '45px', right: '24px'}}>
  					<Button floating icon='expand_more' onClick={this.toggleAll} node="a" href="#top" className='red'/>
  					<Button floating icon='add' className='yellow darken-1' node="a" href="#submit_form"/>
					</Button>
	      </div> 				
			</div>
		);
	}

}

export default Cameras;