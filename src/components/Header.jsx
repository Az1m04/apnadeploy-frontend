import React, { useState } from "react";
import styled from "@emotion/styled";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const Navbar = styled.div`
    padding: 0 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .active {
      color: #eee;
     

      border-bottom: 2px solid #eee;
    }
  `;

  const Menu = styled.ul`
    list-style: none;
    display: flex;
    gap: 8px;
    margin: 0px;
    text-align: center;
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      display: ${isMenuOpen ? "block" : "none"};
      position: absolute;
      top: 80px;
      left: 0;
      width: 100%;
      z-index: 100;
    }
  `;

  const MenuItem = styled.li`
    @media (max-width: 768px) {
      margin-bottom: 12px;
    }
  `;

  const ActiveLink = styled(NavLink)`
    text-decoration: none;
    cursor: pointer;
    color: #ccc;
    padding: 5px 0px;
    &:hover {
      color: #eee;
      border-bottom: 2px solid #eee;
    }
  `;

  const BrandName = styled(Link)`
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    text-transform: uppercase;
    background: -webkit-linear-gradient(#eee, #333);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    :hover {
      color: #646cff;
    }
  `;

  const HamburgerIcon = styled.div`
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    z-index: 5;
    @media (max-width: 768px) {
      display: flex;
    }
    div {
      width: 2rem;
      height: 0.25rem;
      background-color: #ccc;
      border-radius: 10px;
      transform-origin: 1px;
      transition: all 0.3s linear;

      &:nth-of-type(1) {
        transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
      }

      &:nth-of-type(2) {
        transform: ${({ open }) =>
          open ? "translateX(100%)" : "translateX(0)"};
        opacity: ${({ open }) => (open ? 0 : 1)};
      }

      &:nth-of-type(3) {
        transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
      }
    }
  `;

  return (
    <Navbar id="header" className="header">
      <BrandName to="/">Apna Deploy</BrandName>
      <HamburgerIcon
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        open={isMenuOpen}
      >
        <div />
        <div />
        <div />
      </HamburgerIcon>
      <Menu>
        {/* <MenuItem>
          <ActiveLink to="/logs" onClick={() => setIsMenuOpen(false)}>
            Logs
          </ActiveLink>
        </MenuItem> */}
        <MenuItem>
          <ActiveLink to="/deploy" onClick={() => setIsMenuOpen(false)}>
            Deploy
          </ActiveLink>
        </MenuItem>
      </Menu>
    </Navbar>
  );
};

export default Header;
