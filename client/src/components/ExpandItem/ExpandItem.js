import React from "react";
import { 
	CollapsibleItem,
	Button
} from "react-materialize"

const ExpandItem = props => (
	<div>
		<CollapsibleItem header={props.task} icon='place'>
			{props.howTo}
		</CollapsibleItem>		
	</div>
);

export default ExpandItem;