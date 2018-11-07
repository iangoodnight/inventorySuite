import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Row, Input, Button, Collapsible, CollapsibleItem, Modal } from "react-materialize";
import API from "../../utils/API";
import "./NetworkDevices.css";

const moment = require("moment");

class NetworkDevices extends Component {

	constructor(props) {
		super(props);
		this.state = {
			devices: [],
			toggle: false,
			location: "",
			manufacturer: "",
			mac_address: "",
			device_type: "",
			model: "",
			host_name: "",
			serial_number: "",
			username: "",
			password: "",
			static_IP: "",
			SNMP_updated: false,
			last_config_backup: "",
			notes: "",
			in_use: true,
			modal_location: "",
			modal_manufacturer: "",
			modal_mac_address: "",
			modal_device_type: "",
			modal_model: "",
			modal_host_name: "",
			modal_serial_number: "",
			modal_username: "",
			modal_password: "",
			modal_static_IP: "",
			modal_SNMP_updated: false,
			modal_last_config_backup: "",
			modal_notes: "",
			modal_in_use: true
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
			manufacturer: this.state.manufacturer,
			mac_address: this.state.mac_address,
			device_type: this.state.device_type,
			model: this.state.model,
			host_name: this.state.host_name,
			serial_number: this.state.serial_number,
			username: this.state.username,
			password: this.state.password,
			static_IP: this.state.static_IP,
			SNMP_updated: this.state.SNMP_updated,
			last_config_backup: this.state.last_config_backup,
			notes: this.state.notes,
			in_use: this.state.in_use
		};
		// to be used later with the withUser services
		// const { history } = this.props;
		console.log("Saving data: ", data);
		API.submitNetwork(data)
			.then(res => {
				console.log("Uploaded successfully");
				this.setState({
					location: "",
					manufacturer: "",
					mac_address: "",
					device_type: "",
					model: "",
					host_name: "",
					serial_number: "",
					username: "",
					password: "",
					static_IP: "",
					SNMP_updated: false,
					last_config_backup: "",
					notes: ""			
				});
			})
			.catch(err => console.log("submitCameras: ", err));
		this.loadNetwork();		

	}

	loadNetwork = () => {
		API.getNetwork()
			.then(res => {
				// console.log("getting network devices: ", res.data);
				// console.log("current state: ", this.state);
				this.setState({
					devices: res.data
				})
			})
			.catch(err => console.log("error getting network devices: ", err));
	}

	handleUpdate = event => {
		event.preventDefault();
		const id = event.target.getAttribute('networkid');
		const date = this.state.modal_last_config_backup ? moment(this.state.modal_last_config_backup).format() : "";
		const rawData = {
			location: this.state.modal_location,
			manufacturer: this.state.modal_manufacturer,
			mac_address: this.state.modal_mac_address,
			device_type: this.state.modal_device_type,
			model: this.state.modal_model,
			host_name: this.state.modal_host_name,
			serial_number: this.state.modal_serial_number,
			username: this.state.modal_username,
			password: this.state.modal_password,
			static_IP: this.state.modal_static_IP,
			SNMP_updated: this.state.modal_SNMP_updated,
			last_config_backup: date,
			notes: this.state.modal_notes,
			in_use: this.state.modal_in_use
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
		API.changeNetwork(id, data)
			.then(res => {
				console.log("Updated successfully");
				this.setState({
					modal_location: "",
					modal_manufacturer: "",
					modal_mac_address: "",
					modal_device_type: "",
					modal_model: "",
					modal_host_name: "",
					modal_serial_number: "",
					modal_username: "",
					modal_password: "",
					modal_static_IP: "",
					modal_SNMP_updated: false,
					modal_last_config_backup: "",
					modal_notes: "",
					modal_in_use: true
				});
			})
			.catch(err => console.log("changeCameras: ", err));
		this.loadNetwork();
	}

	deleteNetwork = (data) => {
		const delId = data._id;
		API.deleteNetwork(delId)
			.then(res => {
				// console.log("deleting network devices: ", delId);
				this.loadNetwork();
			})
			.catch(err => console.log("error deleting network device: ", err));
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
		this.loadNetwork();
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
						<h4 className="page-header">Network Devices</h4>
					</Row>					
				</div>
				{this.state.devices.length ? (
					<Collapsible>
					{this.state.devices.map((device, i) => (
						<CollapsibleItem header={device.host_name} icon='place' key={device._id}>
							<Row>
								<pre>
								Location: {device.location}<br/>
								Manufacturer: {device.manufacturer}<br/>
								Mac Address: {device.mac_address}<br/>
								Device Type: {device.device_type}<br/>
								Model: {device.model}<br/>
								Host Name: {device.host_name}<br/>
								Serial Number: {device.serial_number}<br/>
								Username: {device.username}<br/>
								Password: {device.password}<br/>
								Static IP: {device.static_IP}<br/>
								SNMP Updated: {String(device.SNMP_updated)}<br/>
								Date of Last Config Backup: {moment(device.last_config_backup).format("MMMM-DD-YY")}<br/>
								Notes: {device.notes}<br/>
								</pre>
							</Row>
							<Row className="action-buttons">
								<Modal
									style={{height: "200%"}}
									header={device.host_name}
									trigger={
										<Button
											className="actions col s1 offset-s9"
											deviceid={device._id}
											>Update
										</Button>}
									actions={
										<div>
											<form 
												deviceid={device._id}
												onSubmit={this.handleUpdate}
											>
												<Row>
													<Input
														label="Location"
														name="modal_location"
														s={6}
														defaultValue={device.location}
														onChange={this.handleInputChange} 
													/>
													<Input
														label="Manufacturer"
														name="modal_manufacturer"
														s={6}
														defaultValue={device.manufacturer}
														onChange={this.handleInputChange}
													/>
													<Input
														label="Mac Address"
														name="modal_mac_address"
														s={6}
														defaultValue={device.mac_address}
														onChange={this.handleInputChange}
													/>
													<Input
														label="Device Type"
														name="modal_device_type"
														s={6}
														defaultValue={device.device_type}
														onChange={this.handleInputChange}
													/>
													<Input
														label="Model"
														name="modal_model"
														s={4}
														defaultValue={device.model}
														onChange={this.handleInputChange}
													/>
													<Input
														label="Host Name"
														name="modal_host_name"
														s={4}
														defaultValue={device.host_name}
														onChange={this.handleInputChange}
													/>
													<Input
														label="Serial Number"
														name="modal_serial_number"
														s={4}
														defaultValue={device.serial_number}
														onChange={this.handleInputChange}
													/>
													<Input
														label="Username"
														name="modal_username"
														s={4}
														defaultValue={device.username}
														onChange={this.handleInputChange}
													/>
													<Input
														label="Password"
														name="modal_password"
														s={4}
														defaultValue={device.password}
														onChange={this.handleInputChange}
													/>
													<Input
														label="Static IP"
														name="modal_static_IP"
														s={4}
														defaultValue={device.static_IP}
														onChange={this.handleInputChange}
													/>
													<Input
														label="SNMP Updated"
														name="modal_SNMP_updated"
														s={12}
														type="checkbox"
														checked={device.SNMP_updated}
														onChange={this.handleInputChange}
													/>
													<Input 
														label="Date of Last Config Backup"
														name="modal_last_config_backup"
														s={12}
														defaultValue={moment(device.last_config_backup).format("MM-DD-YY")}
														onChange={this.handleInputChange}
													/>
													<Input 
														label="Notes"
														name="modal_notes"
														s={12}
														type="textarea"
														defaultValue={device.notes}
														onChange={this.handleInputChange}
													/>										
													<Input
														label="Currently in Use"
														name="modal_in_use"
														s={12}
														type="checkbox"
														checked={device.in_use}
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
									onClick={this.deleteNetwork.bind(this, device)}
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
					<h5>Add a New device</h5>
					<form onSubmit={this.handleSubmit}>
						<Row>
							<Input						
								placeholder="Location"
								name="location"
								s={6}
								value={this.state.location}
								onChange={this.handleInputChange} 
							/>
							<Input
								placeholder="Manufacturer"
								name="manufacturer"
								s={6}
								value={this.state.manufacturer}
								onChange={this.handleInputChange}
							/>
							<Input
								placeholder="Mac Address"
								name="mac_address"
								s={6}
								value={this.state.mac_address}
								onChange={this.handleInputChange}
							/>
							<Input
								placeholder="Device Type"
								name="device_type"
								s={6}
								value={this.state.device_type}
								onChange={this.handleInputChange}
							/>
							<Input
								placeholder="Model"
								name="model"
								s={4}
								value={this.state.model}
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
								placeholder="Serial Number"
								name="serial_number"
								s={4}
								value={this.state.serial_number}
								onChange={this.handleInputChange}
							/>
							<Input
								placeholder="Username"
								name="username"
								s={4}
								value={this.state.username}
								onChange={this.handleInputChange}
							/>
							<Input
								placeholder="Password"
								name="password"
								s={4}
								value={this.state.password}
								onChange={this.handleInputChange}
							/>
							<Input
								placeholder="Static IP"
								name="static_IP"
								s={4}
								value={this.state.static_IP}
								onChange={this.handleInputChange}
							/>
							<Input
								label="SNMP Updated"
								name="SNMP_updated"
								s={12}
								type="checkbox"
								checked={this.state.SNMP_updated}
								onChange={this.handleInputChange}
							/>
							<Input 
								placeholder="Date of Last Config Backup"
								name="last_config_backup"
								s={12}
								value={this.state.last_config_backup}
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

export default NetworkDevices;