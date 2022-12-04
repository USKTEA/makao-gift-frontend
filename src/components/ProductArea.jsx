import numberFormat from '../utils/numberFormat';

export default function ProductArea(
  {
    imageUrl, manufacturer, name, quantity, cost,
  },
) {
  return (
    <div>
      <img src={imageUrl} alt="상품이미지" />
      <div>
        <p>{manufacturer}</p>
        <p>{name}</p>
      </div>
      <div>
        <p>{`구매수량: ${quantity}`}</p>
        <p>{`총 상품금액: ${numberFormat(cost)}원`}</p>
      </div>
    </div>
  );
}
