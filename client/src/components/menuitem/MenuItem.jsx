import React from "react";
import { randomRgbaColor } from "../../utils";
import { Link } from "react-scroll";
import styled from "styled-components";

const Title = styled.span`
  transform: scale(1);
  &:hover {
    transition: all 0.5s;
    transform: scale(1.1);
  }
`;

const Container = styled.div``;

export default function (props) {
  const { name, Icon, to } = props;
  return (
    <Container>
      <Link
        className="subMenu"
        to={to}
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
        activeClass="active"
      >
        <Icon className="icon" style={{ color: randomRgbaColor(1) }} />
        <Title>{name}</Title>
      </Link>
    </Container>
  );
}
