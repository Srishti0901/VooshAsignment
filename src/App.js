import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import { Container } from "react-bootstrap";
import Header from "./components/Header/Header";
import { useEffect } from "react";

function App() {
  return (
    <>
      <Header />
      <Container className="'my-2">
        <Outlet />
      </Container>
    </>
  );
}

export default App;
