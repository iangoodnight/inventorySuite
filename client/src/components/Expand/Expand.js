import React from "react";
import {
	Collapsible,
	CollapsibleItem,
	Row,
	Button
} from "react-materialize";
import "./Expand.css";

const Expand = props => (
	<div>
		<Collapsible style={{margin: "0"}}>
			<CollapsibleItem header={props.task.task} icon='place'>
				<Row>
					{props.task.howTo}
				</Row>
				<Row className="action-buttons">
					<Button className="actions col s1 offset-s9">Update</Button>
					<Button className="actions col s1 red"  onClick={props.onClick}>Delete</Button>
				</Row>
			</CollapsibleItem>
		</Collapsible>
	</div>
);

export default Expand;