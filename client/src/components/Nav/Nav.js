import React, { Component } from "react";
import { Link } from 'react-router-dom';
import M from "materialize-css";
import "./Nav.css";

class Nav extends Component { 

  componentDidMount() {
    let elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, {inDuration: 300, outDuration: 225, coverTrigger: false, hover: true});
  }

	render() {
		return (
			<div className="container-fluid">
				<ul id="dropdown1" className="dropdown-content">
					<li><Link to="/cameras">Cameras</Link></li>
					<li><Link to="/chrome">Chrome Machines</Link></li>
					<li><Link to="/completed">Completed PCs</Link></li>
					<li><Link to="/computers">Computers</Link></li>
					<li><Link to="/linux">Linux Machines</Link></li>
					<li><Link to="/network">Network Devices</Link></li>
					<li><Link to="/other">Others</Link></li>
					<li><Link to="/phones">Phones</Link></li>
					<li><Link to="/printers">Printers</Link></li>
					<li><Link to="/radios">Radios</Link></li>
					<li><Link to="/servers">Servers</Link></li>
					<li><Link to="/tablets">Tablets</Link></li>
					<li><Link to="/things">Things to Remember</Link></li>
				</ul>
				<nav>
					<div className="nav-wrapper">
						<a href="#" className="brand-logo">Inventory Management</a>
						<ul className="right hide-on-med-and-down">
							<li><a href="#">Log in/Log out</a></li>
							<li><a className="dropdown-trigger" href="#!" data-target="dropdown1">Pages<i className="material-icons right">arrow_drop_down</i></a></li>
						</ul>
					</div>
				</nav>  
			</div>
		);
	}
}

export default Nav;
