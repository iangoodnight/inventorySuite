import React from "react";
import {
	Collapsible,
	CollapsibleItem,
	Button
} from "react-materialize";

const Expand = props => (
	<div className="container">
		<Collapsible>
			<CollapsibleItem header={props.task} icon='place'>
				{props.howTo}
			</CollapsibleItem>
		</Collapsible>
	</div>
);

export default Expand;