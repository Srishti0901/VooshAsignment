import { useLayoutEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";
import icon from "../../assets/calendar-solid.svg";
import styles from "./header.module.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [path, setPath] = useState("");
  const location = useLocation();

  useLayoutEffect(() => {
    const token = sessionStorage.getItem("token");
    setPath(location?.pathname);
    if (location?.pathname === "/" && token !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]);

  const handleLogout = () => {
    sessionStorage.clear();
  };

  return (
    <header>
      <Navbar expand="lg" collapseOnSelect className={styles.navbar}>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img alt="" src={icon} className={styles.brandIcon}></img>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isLoggedIn ? (
              <>
                <LinkContainer
                  to="/login"
                  className={styles.logoutLink}
                  onClick={handleLogout}
                >
                  <Nav.Link>Logout</Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <>
                <LinkContainer
                  to="/login"
                  className={
                    path === "/login"
                      ? styles.loginsignupLinkActive
                      : styles.loginsignupLink
                  }
                >
                  <Nav.Link>Log In</Nav.Link>
                </LinkContainer>
                <LinkContainer
                  to="/signup"
                  className={
                    path === "/signup"
                      ? styles.loginsignupLinkActive
                      : styles.loginsignupLink
                  }
                >
                  <Nav.Link>Sign Up</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
