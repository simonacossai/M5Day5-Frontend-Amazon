import React, { Component } from 'react'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom'


class NavBar extends Component {
    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="p-1 m-0">
                    <Navbar.Brand href="#home"><img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" className="p-0 mt-2 ml-2" style={{width:"90px", height:"35px"}}/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                         
                        </Nav>
                        <Nav>
                            <Link to="/">
                            <div className="nav-link">Home</div>
                            </Link>
                            <Link to="/form">
                            <div className="nav-link">Add a product</div>
                            </Link>
                            <Link to="/cart">
                            <div className="nav-link">Cart</div>
                            </Link>


                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default withRouter(NavBar); 
