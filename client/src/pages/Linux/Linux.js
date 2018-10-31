import React, { Component } from "react";
import { Row, Input, Button, Collapsible, CollapsibleItem, Modal } from "react-materialize";
import API from "../../utils/API";
import "./Linux.css";
const moment = require("moment");

class Linux extends Component {

	constructor(props) {
		super(props);
		this.state = {
			computers: [],
			user: "",
			department: "",
			location: "",
			model: "",
			serial_number: "",
			mac_address: "",
			mac_address_2: "",
			pc_description: "",
			pc_name: "",
			OS: "",
			VNC: false,
			labeled: false,
			SSH: false,
			notes: "",
			last_verified: "",
			modalUser: "",
			modalDepartment: "",
			modalLocation: "",
			modalModel: "",
			modalSerial_number: "",
			modalMac_address: "",
			modalMac_address_2: "",
			modalPc_description: "",
			modalPc_name: "",
			modalOS: "",
			modalVNC: false,
			modalLabeled: false,
			modalSSH: false,
			modalNotes: "",
			modalLast_verified: ""	
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(e) {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		// console.log("handling input change where name: ", name, " and value: ", value);
		this.setState({ 
			[name] : value 
		});
	}

	handleSubmit = event => {
		event.preventDefault();
		console.log("this.state: ", this.state);
		const data = {
			user: this.state.user,
			department: this.state.department,
			location: this.state.location,
			model: this.state.model,
			serial_number: this.state.serial_number,
			mac_address: this.state.mac_address,
			mac_address_2: this.state.mac_address_2,
			pc_description: this.state.pc_description,
			pc_name: this.state.pc_name,
			OS: this.state.OS,
			VNC: this.state.VNC,
			labeled: this.state.labeled,
			SSH: this.state.SSH,
			notes: this.state.notes,
			last_verified: this.state.last_verified	
		};
		// to be used later with the withUser services
		// const { history } = this.props;
		console.log("Saving data: ", data);
		API.submitLinux(data)
			.then(res => {
				console.log("Uploaded successfully");
				this.setState({
					user: "",
					department: "",
					location: "",
					model: "",
					serial_number: "",
					mac_address: "",
					mac_address_2: "",
					pc_description: "",
					pc_name: "",
					OS: "",
					VNC: false,
					labeled: false,
					SSH: false,
					notes: "",
					last_verified: ""					
				});
			})
			.catch(err => console.log("submitLinux: ", err));
		this.loadLinux();		

	}

	loadLinux = () => {
		API.getLinux()
			.then(res => {
				console.log("getting computers: ", res.data);
				console.log("current state: ", this.state);
				this.setState({
					computers: res.data
				})
			})
			.catch(err => console.log("error getting computers: ", err));
	}

	handleUpdate = event => {
		event.preventDefault();
		const id = event.target.getAttribute('computerid');
		const date = this.state.modalLast_verified ? moment(this.state.modalLast_verified).format() : "";
		const rawData = {
			user: this.state.modalUser,
			department: this.state.modalDepartment,
			location: this.state.modalLocation,
			model: this.state.modalModel,
			serial_number: this.state.modalSerial_number,
			mac_address: this.state.modalMac_address,
			mac_address_2: this.state.modalMac_address_2,
			pc_description: this.state.modalPc_description,
			pc_name: this.state.modalPc_name,
			OS: this.state.modalOS,
			VNC: this.state.modalVNC,
			labeled: this.state.modalLabeled,
			SSH: this.state.modalSSH,
			notes: this.state.modalNotes,
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
		API.changeLinux(id, data)
			.then(res => {
				console.log("Updated successfully");
				this.setState({
					modalUser: "",
					modalDepartment: "",
					modalLocation: "",
					modalModel: "",
					modalSerial_number: "",
					modalMac_address: "",
					modalMac_address_2: "",
					modalPc_description: "",
					modalPc_name: "",
					modalOS: "",
					modalVNC: false,
					modalLabeled: false,
					modalSSH: false,
					modalNotes: "",
					modalLast_verified: ""
				});
			})
			.catch(err => console.log("changeLinux: ", err));
		this.loadLinux();
	}

	deleteLinux = (data) => {
		const delId = data._id;
		API.deleteLinux(delId)
			.then(res => {
				console.log("deleting computers: ", delId);
				this.loadLinux();
			})
			.catch(err => console.log("error deleting computers: ", err));
	}

	componentDidMount() {
		this.loadLinux();
	}

	render() {
		return (
			<div className="container">
				<div className="container">
					<Row>
						<h4>Linux Machines</h4>
					</Row>					
				</div>
				{this.state.computers.length ? (
					<Collapsible>
					{this.state.computers.map((computer, i) => (
						<CollapsibleItem header={computer.pc_name} icon='place' key={computer._id}>
							<Row>
								<pre>
								User: {computer.user}<br/>
								Department: {computer.department}<br/>
								Location: {computer.location}<br/>
								Model: {computer.model}<br/>
								Serial Number: {computer.serial_number}<br/>
								Mac Address: {computer.mac_address}<br/>
								Mac Address 2: {computer.mac_address_2}<br/>
								PC Description: {computer.pc_description}<br/>
								PC Name: {computer.pc_name}<br/>
								OS: {computer.OS}<br/>
								VNC: {String(computer.VNC)}<br/>
								Labeled: {String(computer.labeled)}<br/>
								SSH: {String(computer.SSH)}<br/>
								Notes: {computer.notes}<br/>
								Last Verified: {moment(computer.last_verified).format("MMMM-DD-YY")}<br/>
								</pre>
							</Row>
							<Row className="action-buttons">
								<Modal
									style={{height: "200%"}}
									header={computer.pc_name}
									trigger={
										<Button
											className="actions col s1 offset-s9"
											computerid={computer._id}
											>Update
										</Button>}
									actions={
										<div>
											<form 
												computerid={computer._id}
												onSubmit={this.handleUpdate}
											>
												<Row>
													<Input
														label="User"
														name="modalUser"
														s={4}
														defaultValue={computer.user}
														onChange={this.handleInputChange} 
													/>
													<Input
														label="Department"
														name="modalDepartment"
														s={4}
														defaultValue={computer.department}
														onChange={this.handleInputChange}
													/>
													<Input
														label="Location"
														name="modalLocation"
														s={4}
														defaultValue={computer.location}
														onChange={this.handleInputChange}
													/>
													<Input
														label="Model"
														name="modalModel"
														s={6}
														defaultValue={computer.model}
														onChange={this.handleInputChange}
													/>
													<Input
														label="Serial Number"
														name="modalSerial_number"
														s={6}
														defaultValue={computer.serial_number}
														onChange={this.handleInputChange}
													/>
													<Input
														label="Mac Address"
														name="modalMac_address"
														s={6}
														defaultValue={computer.mac_address}
														onChange={this.handleInputChange}
													/>
													<Input
														label="Mac Address 2"
														name="modalMac_address_2"
														s={6}
														defaultValue={computer.mac_address_2}
														onChange={this.handleInputChange}
													/>
													<Input
														label="PC Description"
														name="modalPc_description"
														s={4}
														defaultValue={computer.pc_description}
														onChange={this.handleInputChange}
													/>
													<Input
														label="PC Name"
														name="modalPc_name"
														s={4}
														defaultValue={computer.pc_name}
														onChange={this.handleInputChange}
													/>
													<Input
														label="OS"
														name="modalOS"
														s={4}
														defaultValue={computer.OS}
														onChange={this.handleInputChange}
													/>
													<Input
														label="VNC"
														name="modalVNC"
														s={4}
														type="checkbox"
														checked={computer.VNC}
														onChange={this.handleInputChange}
													/>
													<Input
														label="Labeled"
														name="modalLabeled"
														s={4}
														type="checkbox"
														checked={computer.labeled}
														onChange={this.handleInputChange}
													/>
													<Input
														label="SSH"
														name="modalSSH"
														s={4}
														type="checkbox"
														checked={computer.SSH}
														onChange={this.handleInputChange}
													/>
													<Input 
														label="notes"
														name="modalNotes"
														s={12}
														type="textarea"
														defaultValue={computer.notes}
														onChange={this.handleInputChange}
													/>
													<Input 
														label="Last Verified"
														name="modalLast_verified"
														s={12}
														defaultValue={moment(computer.last_verified).format("MM-DD-YY")}
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
									onClick={this.deleteLinux.bind(this, computer)}
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
				<div>
					<Button waves='light'>Button</Button>
				</div>
				<div>
					<form onSubmit={this.handleSubmit}>
						<Row>
							<Input
								placeholder="User"
								name="user"
								s={4}
								value={this.state.user}
								onChange={this.handleInputChange} 
							/>
							<Input
								placeholder="Department"
								name="department"
								s={4}
								value={this.state.department}
								onChange={this.handleInputChange}
							/>
							<Input
								placeholder="Location"
								name="location"
								s={4}
								value={this.state.location}
								onChange={this.handleInputChange}
							/>
							<Input
								placeholder="Model"
								name="model"
								s={6}
								value={this.state.model}
								onChange={this.handleInputChange}
							/>
							<Input
								placeholder="Serial Number"
								name="serial_number"
								s={6}
								value={this.state.serial_number}
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
								placeholder="Mac Address 2"
								name="mac_address_2"
								s={6}
								value={this.state.mac_address_2}
								onChange={this.handleInputChange}
							/>
							<Input
								placeholder="PC Description"
								name="pc_description"
								s={4}
								value={this.state.pc_description}
								onChange={this.handleInputChange}
							/>
							<Input
								placeholder="PC Name"
								name="pc_name"
								s={4}
								value={this.state.pc_name}
								onChange={this.handleInputChange}
							/>
							<Input
								label="OS"
								name="OS"
								s={4}
								value={this.state.OS}
								onChange={this.handleInputChange}
							/>
							<Input
								label="VNC"
								name="VNC"
								s={4}
								type="checkbox"
								checked={this.state.VNC}
								onChange={this.handleInputChange}
							/>
							<Input
								label="Labeled"
								name="labeled"
								s={4}
								type="checkbox"
								checked={this.state.labeled}
								onChange={this.handleInputChange}
							/>
							<Input
								label="SSH"
								name="SSH"
								s={4}
								type="checkbox"
								checked={this.state.SSH}
								onChange={this.handleInputChange}
							/>
							<Input 
								placeholder="notes"
								name="notes"
								s={12}
								type="textarea"
								value={this.state.notes}
								onChange={this.handleInputChange}
							/>
							<Input 
								placeholder="Last Verified"
								name="last_verified"
								type="date"
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
			</div>
		);
	}

}

export default Linux;