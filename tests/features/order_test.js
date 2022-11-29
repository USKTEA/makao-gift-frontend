Feature('상품 주문하기');

const amount = 20000;
const price = 10000;

Before(({ I }) => {
  I.setUpUser();
  I.changeAmount(amount);
  I.setUpProduct(
    {
      id: 1,
      productName: '초콜릿',
      price,
      description: 'yammy chocolate',
      manufacturer: 'Jocker',
    },
  );
  I.order({ productName: '초콜릿', amount: 1 });
});

Scenario('사용자는 자신이 선물하려는 상품의 정보를 알 수 있다', ({ I }) => {
  I.see('Jocker');
  I.see('초콜릿');
  I.see('구매수량: 1');
  I.see('총 상품금액: 10,000원');
});

Scenario(
  '사용자가 받는 분 성함, 받는 분 주소, 받는 분께 보내는 메시지를 양식에 맞게 입력했을 경우',
  ({ I }) => {
    I.fillField('받는 분 성함', '김이박최아샬');
    I.fillField('받는 분 주소', '서울시 조커구 아샬동');
    I.fillField('받는 분께 보내는 메세지', '압도적 감사');

    I.click('선물하기');

    I.see('내가 주문한 내역입니다');
    I.see('To. 김이박최아샬');
    I.see(`내 잔액:${amount - price}`);
  },
);

Scenario('사용자가 받는 분 성함을 한글 이외의 문자를 입력했을 경우', ({ I }) => {
  I.fillField('받는 분 성함', 'Ashal');
  I.fillField('받는 분 주소', '서울시 조커구 아샬동');
  I.fillField('받는 분께 보내는 메세지', '압도적 감사');

  I.click('선물하기');

  I.see('이름을 다시 확인해주세요');
  I.see(`내 잔액:${amount}`);
});

Scenario('사용자가 받는 분 성함을 한글 3자 이내로 입력했을 경우', ({ I }) => {
  I.fillField('받는 분 성함', '아샬');
  I.fillField('받는 분 주소', '서울시 조커구 아샬동');
  I.fillField('받는 분께 보내는 메세지', '압도적 감사');

  I.click('선물하기');

  I.see('이름을 다시 확인해주세요');
  I.see(`내 잔액:${amount}`);
});

Scenario('사용자가 받는 분 성함을 한글 7자 이상 입력했을 경우', ({ I }) => {
  I.fillField('받는 분 성함', '이거슨마치라잌아샬');

  I.see('이거슨마치라잌');
});

Scenario('사용자가 받는 분 성함을 입력하지 않았을 경우', ({ I }) => {
  I.fillField('받는 분 성함', '');
  I.fillField('받는 분 주소', '서울시 조커구 아샬동');
  I.fillField('받는 분께 보내는 메세지', '압도적 감사');

  I.click('선물하기');

  I.see('성함을 입력해주세요');
  I.see(`내 잔액:${amount}`);
});

Scenario('사용자가 받는 분 주소를 입력하지 않았을 경우', ({ I }) => {
  I.fillField('받는 분 성함', '김이박최아샬');
  I.fillField('받는 분 주소', '');
  I.fillField('받는 분께 보내는 메세지', '압도적 감사');

  I.click('선물하기');

  I.see('주소를 입력해주세요');
  I.see(`내 잔액:${amount}`);
});

Scenario('사용자가 받는 분께 보내는 메세지를 100자 이상 입력하는 경우', ({ I }) => {
  I.fillField('받는 분 성함', '김이박최아샬');
  I.fillField('받는 분 주소', '서울시 조커구 아샬동');
  I.fillField('받는 분께 보내는 메세지', '압도적감사압도적감사압도적감사압도적감사압도적감사'
  + '압도적감사압도적감사압도적감사압도적감사압도적감사압도적감사압도적감사압도적감사압도적감사압도적감사'
  + '압도적감사압도적감사압도적감사압도적감사압도적감사'
  + '백자넘는부분');

  I.dontSee(/백자넘는부분/);
});
