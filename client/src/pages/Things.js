import React, { Component } from "react";
import { Row, Input, Button } from "react-materialize";
import Expand from "../components/Expand";
import API from "../utils/API";

class Things extends Component {

	constructor(props) {
		super(props);
		this.state = {
			things: [],
			task: "",
			howTo: ""
		};
		this.handleInputChange = this.handleInputChange.bind(this);
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
		}
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

	componentDidMount() {
		this.loadThings();
	}

	render() {
		return (
			<div className="container">
				<div className="container title">
					<h4>Things to Remember</h4>
				</div>
				{this.state.things.length ? (
					<div>
					{this.state.things.map(thing => (
						<Expand task={thing.task} howTo={thing.howTo} key={thing._id}/>
					))}
					</div>
				) : (
				<div>
				  <h3> Uh-oh, looks like we are having some problems finding what you are looking for! </h3>
				</div>
				)}
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
		);
	}

}

export default Things