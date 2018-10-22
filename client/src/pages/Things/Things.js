import React, { Component } from "react";
import { Row, Input, Button, Collapsible, CollapsibleItem, Modal } from "react-materialize";
import API from "../../utils/API";
import "./Things.css";

class Things extends Component {

	constructor(props) {
		super(props);
		this.state = {
			things: [],
			task: "",
			howTo: "",
			modalTask: "",
			modalHowTo: "",
			didSwitchParentObject: true
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(e) {
		this.setState({ [e.target.name] : e.target.value });
	}

	handleSubmit = event => {
		event.preventDefault();
		console.log("this.state: " + this.state);
		const data = {
			task: this.state.task,
			howTo: this.state.howTo
		};
		// to be used later with the withUser services
		// const { history } = this.props;
		console.log("Saving data: ", data);
		API.submitThings(data)
			.then(res => {
				console.log("Uploaded successfully");
				this.setState({
					task: "",
					howTo: ""
				});
			})
			.catch(err => console.log("submitThings: ", err));
		this.loadThings();
	}

	handleUpdate = event => {
		event.preventDefault();
		const id = event.target.getAttribute('thingid');
		const rawData = {
			task: this.state.modalTask,
			howTo: this.state.modalHowTo
		};
		const removeFalsy = obj => {
			let newObj = {};
			Object.keys(obj).forEach((prop) => {
				if (obj[prop]) { newObj[prop] = obj[prop];
				}
			})
			return newObj;
		}
		const data = removeFalsy(rawData);
		API.changeThings(id, data)
			.then(res => {
				console.log("Updated successfully");
				this.setState({
					modalTask: "",
					modalHowTo: ""
				});
			})
			.catch(err => console.log("changeThings: ", err));
		this.loadThings();
	}

	loadThings = () => {
		API.getThings()
			.then(res => {
				console.log("getting things: ", res.data);
				this.setState({
					things: res.data
				})
			})
			.catch(err => console.log("error getting things: ", err));
	}

	deleteThings = (data) => {
		const delId = data._id;
		API.deleteThings(delId)
			.then(res => {
				console.log("deleting things: ", delId);
				this.loadThings();
			})
			.catch(err => console.log("error deleting things: ", err));
	}

	componentDidMount() {
		this.loadThings();
	}

	componentDidUpdate () {
		if (this.didSwitchParentObject) {
			this.didSwitchParentObject = false;
			this.refs.modalTask = this.state.modalTask;
		}
	}

	render() {
		return (
			<div className="container">
				<div className="container title">
					<h4>Things to Remember</h4>
				</div>
				{this.state.things.length ? (
					<Collapsible>
					{this.state.things.map((thing, i) => (
						<CollapsibleItem header={thing.task} icon='place' key={thing._id}>
							<Row className="displayHowTo">
								<pre>{thing.howTo}</pre>
							</Row>
							<Row className="action-buttons">
								<Modal
									header={thing.task}
									trigger={
										<Button 
											className="actions col s1 offset-s9"
											thingid={thing._id}
											onClick={this.updateState}
											>Update
										</Button>}
									actions={
										<div>
											<form thingid={thing._id} onSubmit={this.handleUpdate} >
												<Input
													placeholder={thing.task}
													ref="modalTask"
													task={thing.task}
													name="modalTask"
													defaultValue={thing.task}						
													onBlur= {this.handleInputChange}
												/>
												<Input
													type="textarea"
													ref="modalHowTo"
													placeholder={thing.howTo}
													howto={thing.howTo}
													name="modalHowTo"
													defaultValue={thing.howTo}
													onBlur= {this.handleInputChange}
												/>
												<Button 
													modal="close"
													className="actions"
													>Update
												</Button>
											</form>
										</div>
									}>
								</Modal>
								<Button className="actions col s1 red" onClick={this.deleteThings.bind(this, thing)}>Delete</Button>
							</Row>
						</CollapsibleItem>					
					))}
					</Collapsible>
				) : (
				<div>
				  <h3> Uh-oh, looks like we are having some problems finding what you are looking for! </h3>
				</div>
				)}
				<div>
					<form onSubmit={this.handleSubmit}>
						<Row>
		          <Input
		          	placeholder="Task"
		          	name="task" 
		          	s={6} 
		          	value={this.state.task}
		          	onChange={this.handleInputChange}
		          />
		          <Input
		          	type="textarea"
		          	name="howTo" 
		          	placeholder="How to perform task" 
		          	s={12} 
		          	value={this.state.howTo}
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

export default Things;