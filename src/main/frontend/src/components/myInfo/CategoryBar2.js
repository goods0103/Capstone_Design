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
text-decoration : none;
line-height: 1.8;
border: none;
font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
color: ${(props) => (props.isActive ? "rgb(48,213,200)" : "white")};
&:hover {
  color: #999;
}
`;

function CategoryBar2() {
    const { pathname } = useLocation();

    return (
        <>
            <Nav>
                <Nav.Item>
                    <StyledLink to="/MyCategoryCpu" isActive={pathname === "/MyCategoryCpu"}>CPU</StyledLink>
                </Nav.Item>
                <Nav.Item>
                    <StyledLink to="/MyCategoryGpu" isActive={pathname === "/MyCategoryGpu"}>GPU</StyledLink>
                </Nav.Item>
                <Nav.Item>
                    <StyledLink to="/MyCategoryRam" isActive={pathname === "/MyCategoryRam"}>RAM</StyledLink>
                </Nav.Item>
                <Nav.Item>
                    <StyledLink to="/category/game1" isActive={pathname === "/category/game1"}>GAME</StyledLink>
                </Nav.Item>
                <Nav.Item>
                    <StyledLink to="/category/bottleneck1" isActive={pathname === "/category/bottleneck1"}>BOTTLENECK</StyledLink>
                </Nav.Item>
            </Nav>
        </>
    );
}

export default CategoryBar2;