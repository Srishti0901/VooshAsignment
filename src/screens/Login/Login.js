import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../../components/FormContainer/formContainer";
import Loader from "../../components/Loader/loader";
import styles from "./login.module.css";
import { loginUser, signupGoogleLogin } from "../../api/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
    const body = {
      email: email,
      password: password,
    };
    try {
      const res = await loginUser(body);
      if (res?.success) {
        sessionStorage.setItem("token", res?.data?.token);
        sessionStorage.setItem("userId", res?.data?.user_id);
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
  };

  const SignUpGoogleAuth = () => {
    signupGoogleLogin().then((res) => {});
  };

  return (
    <div className={styles.loginContainer}>
      <FormContainer>
        <Form onSubmit={submitHandler} className={styles.formContainer}>
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
          {errorMessage !== "" && (
            <div className={styles.errorMessage}>{errorMessage}</div>
          )}
          <Button
            type="submit"
            variant="primary"
            className="mt-3 w-100 br-0"
            disabled={isLoading}
          >
            Log In
          </Button>

          <Row className="py-3">
            <Col className={styles.linkRow}>
              {`Don't have an account?  `}{" "}
              <span className={styles.linkSpan}>
                <Link to="/signup">SignUp</Link>
              </span>
            </Col>
          </Row>
          <Row className={styles.googleLoginRow}>
            <Button
              className={styles.googleLoginButton}
              onClick={SignUpGoogleAuth}
            >
              Login with <span className={styles.googleLoginText}>Google</span>
            </Button>
          </Row>
        </Form>
      </FormContainer>
    </div>
  );
};

export default Login;
