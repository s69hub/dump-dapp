import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import Soon from "./components/Soon/Soon";
import { Container } from "react-bootstrap";
import Info from "./components/Info/Info";

function App() {
  return (
    <Router>
      <Menu />
      <Container className="container-main">
        <Routes>
          <Route path="/" element={<Soon />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
