import React, { Component } from "react";
import { Row, Input, Button, Collapsible, CollapsibleItem, Modal } from "react-materialize";
import API from "../../utils/API";
import "./Chrome.css";
const moment = require("moment");

class Chrome extends Component {

	constructor(props) {
		super(props);
		this.state = {
			computers: [],
			user: "",
			location: "",
			serial_number: "",
			mac_address: "",
			mac_address_2: "",
			asset_ID: "",
			labeled: false,
			ram_size: "",
			notes: "",
			last_verified: "",
			modalUser: "",
			modalLocation: "",
			modalSerial_number: "",
			modalMac_address: "",
			modalMac_address_2: "",
			modalAsset_ID: "",
			modalLabeled: false,
			modalRam_size: "",
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
			location: this.state.location,
			serial_number: this.state.serial_number,
			mac_address: this.state.mac_address,
			mac_address_2: this.state.mac_address_2,
			asset_ID: this.state.asset_ID,
			labeled: this.state.labeled,
			ram_size: this.state.ram_size,
			notes: this.state.notes,
			last_verified: this.state.last_verified	
		};
		// to be used later with the withUser services
		// const { history } = this.props;
		console.log("Saving data: ", data);
		API.submitChrome(data)
			.then(res => {
				console.log("Uploaded successfully");
				this.setState({
					user: "",
					location: "",
					serial_number: "",
					mac_address: "",
					mac_address_2: "",
					asset_ID: "",
					labeled: false,
					ram_size: "",
					notes: "",
					last_verified: ""					
				});
			})
			.catch(err => console.log("submitChrome: ", err));
		this.loadChrome();		

	}

	loadChrome = () => {
		API.getChrome()
			.then(res => {
				console.log("getting chrome machines: ", res.data);
				console.log("current state: ", this.state);
				this.setState({
					computers: res.data
				})
			})
			.catch(err => console.log("error getting chrome machines: ", err));
	}

	handleUpdate = event => {
		event.preventDefault();
		const id = event.target.getAttribute('computerid');
		const date = this.state.modalLast_verified ? moment(this.state.modalLast_verified).format() : "";
		const rawData = {
			user: this.state.modalUser,
			location: this.state.modalLocation,
			serial_number: this.state.modalSerial_number,
			mac_address: this.state.modalMac_address,
			mac_address_2: this.state.modalMac_address_2,
			asset_ID: this.state.modalAsset_ID,
			labeled: this.state.modalLabeled,
			ram_size: this.state.modalRam_size,
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
		API.changeChrome(id, data)
			.then(res => {
				console.log("Updated successfully");
				this.setState({
					modalUser: "",
					modalLocation: "",
					modalSerial_number: "",
					modalMac_address: "",
					modalMac_address_2: "",
					modalAsset_ID: "",
					modalLabeled: false,
					modalRam_size: "",
					modalNotes: "",
					modalLast_verified: ""
				});
			})
			.catch(err => console.log("changeChrome: ", err));
		this.loadChrome();
	}

	deleteChrome = (data) => {
		const delId = data._id;
		API.deleteChrome(delId)
			.then(res => {
				console.log("deleting computers: ", delId);
				this.loadChrome();
			})
			.catch(err => console.log("error deleting chrome machines: ", err));
	}

	componentDidMount() {
		this.loadChrome();
	}

	render() {
		return (
			<div className="container">
				<div className="container">
					<Row>
						<h4>Chrome Machines</h4>
					</Row>					
				</div>
				{this.state.computers.length ? (
					<Collapsible>
					{this.state.computers.map((computer, i) => (
						<CollapsibleItem header={computer.asset_ID} icon='place' key={computer._id}>
							<Row>
								<pre>
								User: {computer.user}<br/>
								Location: {computer.location}<br/>
								Serial Number: {computer.serial_number}<br/>
								Mac Address: {computer.mac_address}<br/>
								Mac Address 2: {computer.mac_address_2}<br/>
								Asset ID: {computer.asset_ID}<br/>
								Labeled: {String(computer.labeled)}<br/>
								Ram Size: {computer.ram_size}<br/>
								Notes: {computer.notes}<br/>
								Last Verified: {moment(computer.last_verified).format("MMMM-DD-YY")}<br/>
								</pre>
							</Row>
							<Row className="action-buttons">
								<Modal
									style={{height: "200%"}}
									header={computer.asset_id}
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
														label="Location"
														name="modalLocation"
														s={4}
														defaultValue={computer.location}
														onChange={this.handleInputChange}
													/>
													<Input
														label="Serial Number"
														name="modalSerial_number"
														s={4}
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
														label="Asset ID"
														name="modalAsset_ID"
														s={4}
														defaultValue={computer.asset_ID}
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
														label="Ram Size"
														name="modalRam_size"
														s={4}
														defaultValue={computer.ram_size}
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
									onClick={this.deleteChrome.bind(this, computer)}
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
								placeholder="Location"
								name="location"
								s={4}
								value={this.state.location}
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
								placeholder="Asset ID"
								name="asset_ID"
								s={4}
								value={this.state.asset_ID}
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
								label="Ram Size"
								name="ram_size"
								s={4}
								value={this.state.SSH}
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

export default Chrome;