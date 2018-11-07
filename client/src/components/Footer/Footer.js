import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./Footer.css";

class Footer extends Component { 
	render() {
		return (
			<div className="container-fluid">
        <footer className="page-footer">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Inventory Management</h5>
                <p className="grey-text text-lighten-4">Pages built based on the "IT Inventory List" google sheet shared by the IT department at Bulk Apothecary &copy; 2018.  A React based web-app developed by Ian Goodnight.</p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Links</h5>
                <div className="row>">
	                <ul>
	                  <li className="col l4 s6"><Link className="grey-text text-lighten-3" to="/">Home</Link></li>
	                  <li className="col l4 s6"><Link className="grey-text text-lighten-3" to="/cameras#top">Cameras</Link></li>
	                  <li className="col l4 s6"><Link className="grey-text text-lighten-3" to="/chrome#top">Chrome</Link></li>
	                  <li className="col l4 s6"><Link className="grey-text text-lighten-3" to="/completed#top">Completed</Link></li>
	                  <li className="col l4 s6"><Link className="grey-text text-lighten-3" to="/computers#top">Computers</Link></li>
	                  <li className="col l4 s6"><Link className="grey-text text-lighten-3" to="/linux#top">Linux</Link></li>
	                  <li className="col l4 s6"><Link className="grey-text text-lighten-3" to="/network#top">Network</Link></li>
	                  <li className="col l4 s6"><Link className="grey-text text-lighten-3" to="/others#top">Others</Link></li>
	                  <li className="col l4 s6"><Link className="grey-text text-lighten-3" to="/phones#top">Phones</Link></li>
	                  <li className="col l4 s6"><Link className="grey-text text-lighten-3" to="/printers#top">Printers</Link></li>
	                  <li className="col l4 s6"><Link className="grey-text text-lighten-3" to="/radios#top">Radios</Link></li>
	                  <li className="col l4 s6"><Link className="grey-text text-lighten-3" to="/servers#top">Servers</Link></li>
	                  <li className="col l4 s6"><Link className="grey-text text-lighten-3" to="/tablets#top">Tablets</Link></li>
	                  <li className="col l4 s6"><Link className="grey-text text-lighten-3" to="/things#top">Things</Link></li>
	                </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
            © 2018 Ian Goodnight
            <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
            </div>
          </div>
        </footer>

			</div>
		)
	}	
}

export default Footer;