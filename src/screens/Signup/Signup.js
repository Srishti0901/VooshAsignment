import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../../components/FormContainer/formContainer";
import styles from "./signup.module.css";
import { signupUser, signupGoogleLogin } from "../../api/api";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (password !== confirmPassword) {
      setErrorMessage("Password does not match.");
    } else {
      setIsLoading(true);
      const body = {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      };
      try {
        const res = await signupUser(body);
        if (res?.success) {
          sessionStorage.setItem("token", res?.data?.token);
          sessionStorage.setItem("userId", res?.data?.userId);
          navigate("/");
        } else {
          setErrorMessage(
            res?.error ? res.error : "Something went wrong. Please try again."
          );
        }
      } catch (error) {
        setErrorMessage("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const SignUpGoogleAuth = () => {
    signupGoogleLogin().then((res) => {});
  };

  return (
    <div className={styles.signupContainer}>
      <FormContainer>
        <Form onSubmit={submitHandler} className={styles.formContainer}>
          <Form.Group className="my-3" controlId="firstName">
            <Form.Control
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-3" controlId="lastName">
            <Form.Control
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-3" controlId="email">
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-3" controlId="email">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-3" controlId="confirmPassword">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {errorMessage !== "" && (
            <div className={styles.errorMessage}>{errorMessage}</div>
          )}
          <Button
            type="submit"
            variant="primary"
            className="mt-3 w-100 br-0"
            disabled={isLoading}
          >
            Sign Up
          </Button>

          <Row className="py-3">
            <Col className={styles.linkRow}>
              Already an Account?
              <span className={styles.linkSpan}>
                <Link to="/login">LogIn</Link>
              </span>
            </Col>
          </Row>
          <Row className={styles.googleSignupRow}>
            <Button
              className={styles.googleSignupButton}
              onClick={SignUpGoogleAuth}
            >
              SignUp with{" "}
              <span className={styles.googleSignupText}>Google</span>
            </Button>
          </Row>
        </Form>
      </FormContainer>
    </div>
  );
};

export default Signup;
