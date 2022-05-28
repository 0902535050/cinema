import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TvShowContainer = styled.div`
  width: 100%;
  min-height: auto;
  display: flex;
  border-bottom: 1px solid #fff;
  padding: 6px 8px;
  align-items: center;
  cursor: pointer;
`;

const Thumbnail = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  flex: 0.4;
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
`;

const Name = styled.h3`
  font-size: 13px;
  color: orange;
  margin-left: 10px;
  margin-right: 10px;
  flex: 2;
  font-weight: bold;
  word-wrap: break-word;
`;

const Rating = styled.span`
  color: #000;
  font-size: 14px;
  display: flex;
  flex: 0.2;
  background-color: yellow;
  border-radius: 7px;
  height: 25px;
  width: 30px;
  padding: 3px;
  justify-content: center;
`;

export function TvShow({ item }) {
  return (
    <TvShowContainer>
      <Link to={{ pathname: "/detail", movie: item }}>
        <div className="itemAria d-flex">
          <Thumbnail>
            <img src={item.img} />
          </Thumbnail>
          <Name>{item.title}</Name>
          <Rating>{item.imdb}</Rating>
        </div>
      </Link>
    </TvShowContainer>
  );
}
