import React from 'react';
import {
    Navbar,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

function Header() {
    return(
        <div>
            <Navbar className="navbar navbar-expand-lg" style={style.navBar}>
                <Nav style={{padding:".5em"}}>
                    <NavItem style={style.logo}>
                        <b>SEULGI's Blog</b>
                    </NavItem>
                    <NavItem className="float-right" style={style.logout}>
                        LOGOUT
                    </NavItem>
                    <NavItem className="float-right" style={style.contact}>
                        CONTACT
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    );
}

const style = {
    navBar: {
        borderBottom: "1px solid #4f4f4f"
    },
    logo: {
        color: "#F48060",
    },
    logout: {
        color: "#4f4f4f",
        marginLeft: "1000px",
    },
    contact: {
        color: "#4f4f4f",
        marginLeft: "50px",
    }
}

export default Header;