import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { grabDominantColor, RgbTypes } from "../../utils/image";

const Image = styled.img`
  width: auto;
  height: 100%;
`;

const ImageWrapper = styled.div`
  min-width: 100px;
  max-width: 100px;
  height: 100px;
  border: 1px solid #333;
  overflow: hidden;
  border-radius: 3px;
  margin-right: 15px;
`;

const ListWrapper = styled.a`
  display: flex;
  width: 400px;
  height: 102px;
  margin: 15px 0;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: #333;
  text-decoration: none;

  active,
  hover {
    color: #333;
  }
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: bold;
  line-height: 1.5;
  color: ${(props) => props.color || "#333"};
`;

type ResultListTypes = {
  id?: number;
  image?: string;
  openLicense?: number;
  servings?: number;
  sourceUrl?: string;
  title?: string;
  readyInMinutes?: number;
  baseUri?: string;
};

const ResultList: React.FC<ResultListTypes> = ({
  id,
  image,
  openLicense,
  servings,
  sourceUrl,
  title,
  readyInMinutes,
}) => {
  const [rgba, setRgba] = useState<string>("rgb(255,255,255)");
  const getDominantColor = async (url: string) => {
    const result: RgbTypes = await grabDominantColor(url);
    setRgba(`rgba(${result.r}, ${result.g}, ${result.b}, 1)`);
  };

  useEffect(() => {
    if (image) {
      getDominantColor(image);
    }
  }, [image]);

  return (
    <ListWrapper href={sourceUrl} target="_blank">
      <ImageWrapper>
        <Image src={image} alt={title} />
      </ImageWrapper>
      <div>
        <Title color={rgba}>{title}</Title>
        <div>
          <span>Serving Size: {servings} </span>
          <span>Ready in: {readyInMinutes} </span>
        </div>
      </div>
    </ListWrapper>
  );
};

export default ResultList;
