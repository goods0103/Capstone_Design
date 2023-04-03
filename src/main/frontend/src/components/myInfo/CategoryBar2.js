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

function CategoryBar2() {
    const { pathname } = useLocation();

    return (
        <>
            <Nav justify variant="tabs">
                <Nav.Item>
                    <StyledLink to="/MySpec" isActive={pathname === "/MySpec"}>My Spec</StyledLink>
                </Nav.Item>
                <Nav.Item>
                    <StyledLink to="/category2/myCpu" isActive={pathname === "/category2/myCpu"}>My Cpu</StyledLink>
                </Nav.Item>
                <Nav.Item>
                    <StyledLink to="/category2/myGpu" isActive={pathname === "/category2/myGpu"}>My Gpu</StyledLink>
                </Nav.Item>
                <Nav.Item>
                    <StyledLink to="/category2/myRam" isActive={pathname === "/category2/myRam"}>My Ram</StyledLink>
                </Nav.Item>
            </Nav>
        </>
    );
}

export default CategoryBar2;