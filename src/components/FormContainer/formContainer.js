import { useLayoutEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import styles from "./formContainer.module.css";

const FormContainer = ({ children }) => {
  const [path, setPath] = useState("");
  const location = useLocation();

  useLayoutEffect(() => {
    setPath(location?.pathname);
  }, [location]);

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6} className="mb-3 p-0">
          <h2 className={styles.heading}>
            {path === "/login" ? "LogIn" : "Signup"}
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} className={`card p-5 ${styles.cardContainer}`}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
