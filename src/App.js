import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import Rechart from "./components/Rechart/Rechart";
import BagValue from "./components/BagValue/BagValue";
import Soon from "./components/Soon/Soon";
import { Fragment } from "react";
import { Container } from "react-bootstrap";

function App() {

  return (
    <Router>
      <Menu />
      <Container className="container-main">
        <Routes>
          <Route path="/" element={<Soon/>} />
          <Route
            path="/chart"
            element={
              <Fragment>
                <BagValue />
                <Rechart />
              </Fragment>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
