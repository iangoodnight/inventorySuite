import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Row, Input, Button, Collapsible, CollapsibleItem, Modal } from "react-materialize";
import API from "../../utils/API";
import "./Chrome.css";
const moment = require("moment");

class Chrome extends Component {

	constructor(props) {
		super(props);
		this.state = {
			computers: [],
			toggle: false,
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
			modal_user: "",
			modal_location: "",
			modal_serial_number: "",
			modal_mac_address: "",
			modal_mac_address_2: "",
			modal_asset_ID: "",
			modal_labeled: false,
			modal_ram_size: "",
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
				// console.log("getting chrome machines: ", res.data);
				// console.log("current state: ", this.state);
				this.setState({
					computers: res.data
				})
			})
			.catch(err => console.log("error getting chrome machines: ", err));
	}

	handleUpdate = event => {
		event.preventDefault();
		const id = event.target.getAttribute('computerid');
		const date = this.state.modalLast_verified ? moment(this.state.modal_last_verified).format() : "";
		const rawData = {
			user: this.state.modal_user,
			location: this.state.modal_location,
			serial_number: this.state.modal_serial_number,
			mac_address: this.state.modal_mac_address,
			mac_address_2: this.state.modal_mac_address_2,
			asset_ID: this.state.modal_asset_ID,
			labeled: this.state.modal_labeled,
			ram_size: this.state.modal_ram_size,
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
		API.changeChrome(id, data)
			.then(res => {
				console.log("Updated successfully");
				this.setState({
					modal_user: "",
					modal_location: "",
					modal_serial_number: "",
					modal_mac_address: "",
					modal_mac_address_2: "",
					modal_asset_ID: "",
					modal_labeled: false,
					modal_ram_size: "",
					modal_notes: "",
					modal_last_verified: ""
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

	toggleAll() {
		var x = document.getElementsByTagName("li");
		var y = document.getElementsByClassName("collapsible-header");
		var z = document.getElementsByClassName("collapsible-body");
		console.log(this.state.toggleState);
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
			console.log("triggering toggle");
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
			console.log("triggering toggle");
		}
		this.setState({
			toggleState: !this.state.toggleState
		});
	}

	componentDidMount() {
		this.loadChrome();
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
						<h4 className="page-header">Chrome Machines</h4>
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
														name="modal_user"
														s={4}
														defaultValue={computer.user}
														onChange={this.handleInputChange} 
													/>
													<Input
														label="Location"
														name="modal_location"
														s={4}
														defaultValue={computer.location}
														onChange={this.handleInputChange}
													/>
													<Input
														label="Serial Number"
														name="modal_serial_number"
														s={4}
														defaultValue={computer.serial_number}
														onChange={this.handleInputChange}
													/>
													<Input
														label="Mac Address"
														name="modal_mac_address"
														s={6}
														defaultValue={computer.mac_address}
														onChange={this.handleInputChange}
													/>
													<Input
														label="Mac Address 2"
														name="modal_mac_address_2"
														s={6}
														defaultValue={computer.mac_address_2}
														onChange={this.handleInputChange}
													/>
													<Input
														label="Asset ID"
														name="modal_asset_ID"
														s={4}
														defaultValue={computer.asset_ID}
														onChange={this.handleInputChange}
													/>
													<Input
														label="Labeled"
														name="modal_labeled"
														s={4}
														type="checkbox"
														checked={computer.labeled}
														onChange={this.handleInputChange}
													/>
													<Input
														label="Ram Size"
														name="modal_ram_size"
														s={4}
														defaultValue={computer.ram_size}
														onChange={this.handleInputChange}
													/>
													<Input 
														label="notes"
														name="modal_notes"
														s={12}
														type="textarea"
														defaultValue={computer.notes}
														onChange={this.handleInputChange}
													/>
													<Input 
														label="Last Verified"
														name="modal_last_verified"
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
				<div className="add-form" ref="submit_form">
					<h5>Add a New Chrome Machine</h5>
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

export default Chrome;