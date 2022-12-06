Feature('주문한 내역 보기');

Scenario('사용자가 주문 목록에서 주문을 클릭했을 경우', ({ I }) => {
  I.setUpUser();
  I.login('ahsal1234');
  I.setUpOrder({
    id: 1,
    manufacturer: 'Jocker',
    productName: '초콜릿',
    amount: 1,
    price: 10000,
    purchaseDate: '2022-11-28',
    receiver: '김이박최아샬',
    address: '서울시 조커구 아샬동',
    message: '압도적 감사',
  });

  I.amOnPage('/');

  I.click('주문조회');

  I.click('초콜릿', '.orders');

  I.see('Jocker');
  I.see('구매수량');
  I.see('2022-11-28');
  I.see('김이박최아샬');
  I.see('서울시 조커구 아샬동');
  I.see('압도적 감사');
});
