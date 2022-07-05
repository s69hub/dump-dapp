import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ConnectButton from "../ConnectButton/ConnectButton";
import dump from "../../images/dump.svg";
import telegram from "../../images/telegram.svg";
import twitter from "../../images/twitter.svg";
import { FcBullish, FcNews } from "react-icons/fc";
import { IoSwapVerticalOutline } from "react-icons/io5";

export default function Menu() {
  return (
    <Navbar collapseOnSelect expand="md" className="fixed-top" variant="dark">
      <Container>
        <Navbar.Brand className="ps-md-3">
          <img
            src={dump}
            alt="DumpToken.net"
            height="20"
            className="shadow-filter"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="text-center">
            <Link to="/" className="nav-link">
              <Button variant="secondary">
                <FcBullish size="25" className="shadow-filter" /> Chart
              </Button>
            </Link>
            <Link to="/swap" className="nav-link">
              <Button variant="secondary">
                <IoSwapVerticalOutline size="25" className="shadow-filter" />{" "}
                Swap
              </Button>
            </Link>
            <a
              href="https://docs.google.com/document/d/1jgyNSMX8x8sYRVV67mzrouPuokhib0BIbMQBe0wM4lQ/edit?usp=sharing"
              target="_blank"
              className="nav-link"
            >
              <Button variant="secondary">
                <FcNews size="25" className="shadow-filter" /> Litepaper
              </Button>
            </a>
            <a
              href="https://t.me/+tCppOVSzIL01ZjRk"
              target="_blank"
              className="nav-link"
            >
              <Button variant="secondary">
                <img
                  src={telegram}
                  alt="Telegram"
                  height="25px"
                  className="shadow-filter me-2"
                />
                Join Telegram!
              </Button>
            </a>

            <a
              href="https://twitter.com/DumpToken"
              target="_blank"
              className="nav-link"
            >
              <Button variant="secondary">
                <img
                  src={twitter}
                  alt="Twitter"
                  height="25px"
                  className="shadow-filter me-2"
                />
                Follow on Twitter!
              </Button>
            </a>
          </Nav>
          <div className="me-md-0 ms-md-auto d-flex justify-content-center mt-md-0 mt-2 mb-md-0 mb-1">
            <ConnectButton />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
