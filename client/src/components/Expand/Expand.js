import React from "react";
import {
	Collapsible,
	CollapsibleItem,
	Button
} from "react-materialize";

const Expand = props => (
	<div>
		<Collapsible style={{margin: "0"}}>
			<CollapsibleItem header={props.task} icon='place'>
				{props.howTo}
			</CollapsibleItem>
		</Collapsible>
	</div>
);

export default Expand;