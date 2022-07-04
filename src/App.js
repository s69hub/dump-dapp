import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import Soon from "./components/Soon/Soon";
import { Container } from "react-bootstrap";
import Info from "./components/Info/Info";
import { useMoralis } from "react-moralis";
import { useEffect } from "react";
import { StateProvider } from "./contexts/StateContext";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import Swap from "./components/Swap/Swap";

TimeAgo.addDefaultLocale(en);

function App() {
  const { Moralis } = useMoralis();
  useEffect(() => {
    Moralis.enableWeb3();
  }, []);

  return (
    <StateProvider>
      <Router>
        <Menu />
        <Container className="container-main">
          <Routes>
            <Route path="/" element={<Soon />} />
            <Route path="/info" element={<Info />} />
            <Route path="/swap" element={<Swap />} />
          </Routes>
        </Container>
      </Router>
    </StateProvider>
  );
}

export default App;
