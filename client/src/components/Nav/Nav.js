import React from "react";
import {
	Navbar,
	NavItem
} from "react-materialize";
import "./Nav.css";

const Nav = props => (
	<div className='container-fluid'>
		<Navbar className='head' brand='Inventory Management' right>
			<NavItem onClick={() => console.log('test click')}>Getting started </NavItem>
		</Navbar>
	</div>	
);

export default Nav;