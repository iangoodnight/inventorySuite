import React from "react";
import {
	Navbar,
	NavItem
} from "react-materialize";

const Nav = props => (
	<Navbar className='head' brand='Inventory Management' right>
		<NavItem onClick={() => console.log('test click')}>Getting started </NavItem>
	</Navbar>	
);

export default Nav;