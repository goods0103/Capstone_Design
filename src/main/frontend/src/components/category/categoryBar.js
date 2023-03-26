import Nav from 'react-bootstrap/Nav';
import { Link as ReactRouterDomLink, useLocation } from "react-router-dom";
import styled from "styled-components";

const Link = ({ isActive, children, ...props }) => {
	return <ReactRouterDomLink {...props}>{children}</ReactRouterDomLink>;
};

const StyledLink = styled(Link)`
  box-sizing: border-box;
  display: block;
  padding: 6px 12px;
  margin: 0 auto;
  text-align: center;
  text-decoration:none;
  border-radius: 10px;
  line-height: 1.8;
  border: 1px solid lightgray;
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
  color: ${(props) => (props.isActive ? "rgb(25,103,206)" : "black")};
`;

function CategoryBar() {
    const { pathname } = useLocation();

    return (
      <>
        <Nav justify variant="tabs">
          <Nav.Item>
            <StyledLink to="/category/c1" isActive={pathname === "/category/c1"}>CPU</StyledLink>
          </Nav.Item>
          <Nav.Item>
            <StyledLink to="/category/c2" isActive={pathname === "/category/c2"}>GPU</StyledLink>
          </Nav.Item>
          <Nav.Item>
            <StyledLink to="/category/c3" isActive={pathname === "/category/c3"}>RAM</StyledLink>
          </Nav.Item>
          <Nav.Item>
            <StyledLink to="/category/c4" isActive={pathname === "/category/c4"}>Game</StyledLink>
          </Nav.Item>
          <Nav.Item>
            <StyledLink to="/category/c5" isActive={pathname === "/category/c5"}>Spec</StyledLink>
          </Nav.Item>
          
        </Nav>
      </>
      );
}

export default CategoryBar;