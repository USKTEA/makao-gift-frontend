export default function ProductDetailPage() {
  return (
    <div>
      <img src="" alt="상품이미지" />
      <p>초콜릿</p>
      <p>10,000원</p>
      <table>
        <tbody>
          <tr>
            <td>
              제조사
            </td>
            <td>
              제조사명
            </td>
          </tr>
          <tr>
            <td>구매수량</td>
            <td>
              <div>
                <button type="button">-</button>
                <span>1</span>
                <button type="button">+</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>상품설명</td>
            <td>이 상품은 이러합니다</td>
          </tr>
        </tbody>
      </table>
      <div>
        <span>
          총 상품금액:
          {' '}
          <strong>10,000원</strong>
        </span>
      </div>
      <div>
        <button type="button">선물하기</button>
      </div>
    </div>
  );
}
