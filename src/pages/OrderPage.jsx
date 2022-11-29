/* eslint-disable jsx-a11y/label-has-associated-control */

export default function OrderPage() {
  return (
    <>
      <div>
        <img src="" alt="상품이미지" />
        <div>
          <p>제조사</p>
          <p>여기에는 상품명</p>
        </div>
        <div>
          <p>구매수량: 1</p>
          <p>총 상품금액: 10,000원</p>
        </div>
      </div>
      <form action="">
        <div>
          <label htmlFor="recipient-name">받는 분 성함</label>
          <input id="recipient-name" type="text" />
          <p>3~7자까지 한글만 사용가능</p>
        </div>
        <div>
          <label htmlFor="recipient-address">받는 분 주소</label>
          <input id="recipient-address" type="text" />
        </div>
        <div>
          <label htmlFor="message">받는 분께 보내는 메세지</label>
          <input id="message" type="text" />
          <p>100글자 이내로 입력해주세요</p>
        </div>
        <button type="submit">선물하기</button>
      </form>
    </>
  );
}
