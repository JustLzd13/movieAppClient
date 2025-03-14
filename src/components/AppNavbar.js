import { useContext, useEffect, useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

import UserContext from '../UserContext';

export default function AppNavbar() {
    const { user } = useContext(UserContext);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    // Update navbar when token changes
    useEffect(() => {
        const checkToken = () => {
            setIsLoggedIn(!!localStorage.getItem("token"));
        };

        window.addEventListener("storage", checkToken);
        return () => window.removeEventListener("storage", checkToken);
    }, []);

    return (
        <Navbar bg="dark" variant="dark" expand="lg"> {/* Black navbar with white text */}
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="text-white">Movie Application</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/" className="text-white">Home</Nav.Link>

                        {isLoggedIn ? (
                            <>
                                <Nav.Link as={NavLink} to="/movies" className="text-white">Movies</Nav.Link>
                                <Nav.Link as={Link} to="/logout" className="text-white">Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login" className="text-white">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register" className="text-white">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
