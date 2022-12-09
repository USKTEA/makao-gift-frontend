import styled from 'styled-components';

import numberFormat from '../utils/numberFormat';

import url from '../utils/url';

const Product = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;

  padding-left: 100px;
`;

const ImageWrapper = styled.div`
  width: 150px;
  height: 150px;
  margin-right: 26px;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
`;

const DescWrapper = styled.div`
  color: ${((props) => props.theme.text.secondary)};
  font-size: ${((props) => props.theme.size.h6)};
  em {
    color: ${((props) => props.theme.text.tertiary)};
  }
  strong {
    margin: 8px 0 42px 0;
  }

  em, strong {
    display: block;
  }
  p + p {
    margin-top: 8px;
  }
`;

export default function ProductArea(
  {
    imageUrl, manufacturer, name, quantity, cost,
  },
) {
  return (
    <Product>
      <ImageWrapper>
        <img src={url(imageUrl)} alt="상품이미지" />
      </ImageWrapper>
      <DescWrapper>
        <em>{manufacturer}</em>
        <strong>{name}</strong>
        <p>{`구매수량: ${quantity}`}</p>
        <p>{`총 상품금액: ${numberFormat(cost)}원`}</p>
      </DescWrapper>
    </Product>
  );
}
