Feature('상품 주문하기');

const amount = 50000;
const price = 10000;

const numberFormat = (number) => Intl.NumberFormat().format(number);

Before(({ I }) => {
  I.clearDatabase();
  I.setUpUser();
  I.changeAmount({ memberId: 1, amount });
  I.setUpProduct(
    {
      id: 1,
      name: '초콜릿',
      price,
      description: 'yammy chocolate',
      manufacturer: 'Jocker',
      imageUrl: '1',
    },
  );
  I.login('ashal1234');
  I.click('스토어');
  I.amOnPage('/products/1');
  I.see('Jocker');
  I.see('초콜릿');
  I.click('send-gift');
});

Scenario(
  '사용자가 받는 분 성함, 받는 분 주소, 받는 분께 보내는 메시지를 양식에 맞게 입력했을 경우',
  ({ I }) => {
    I.fillField('받는 분 성함', '김이박최아샬');
    I.fillField('받는 분 주소', '서울시 조커구 아샬동');
    I.fillField('받는 분께 보내는 메세지', '압도적 감사');

    I.click('[type=submit]');

    I.see('내가 주문한 내역입니다');
    I.see('To. 김이박최아샬');
    I.see(`내 잔액: ${numberFormat(amount - price)}원`);
  },
);

Scenario('사용자가 받는 분 성함을 한글 이외의 문자를 입력했을 경우', ({ I }) => {
  I.fillField('받는 분 성함', 'Ashal');
  I.fillField('받는 분 주소', '서울시 조커구 아샬동');
  I.fillField('받는 분께 보내는 메세지', '압도적 감사');

  I.click('[type=submit]');

  I.see('이름을 다시 확인해주세요');
  I.see(`내 잔액: ${numberFormat(amount)}원`);
});

Scenario('사용자가 받는 분 성함을 한글 3자 이내로 입력했을 경우', ({ I }) => {
  I.fillField('받는 분 성함', '아샬');
  I.fillField('받는 분 주소', '서울시 조커구 아샬동');
  I.fillField('받는 분께 보내는 메세지', '압도적 감사');

  I.click('[type=submit]');

  I.see('이름을 다시 확인해주세요');
  I.see(`내 잔액: ${numberFormat(amount)}원`);
});

Scenario('사용자가 받는 분 성함을 한글 7자 이상 입력했을 경우', ({ I }) => {
  I.fillField('받는 분 성함', '이거슨마치라잌아샬');

  I.dontSee('아샬');
});

Scenario('사용자가 받는 분 성함을 입력하지 않았을 경우', ({ I }) => {
  I.fillField('받는 분 성함', '');
  I.fillField('받는 분 주소', '서울시 조커구 아샬동');
  I.fillField('받는 분께 보내는 메세지', '압도적 감사');

  I.click('[type=submit]');

  I.see('성함을 입력해주세요');
  I.see(`내 잔액: ${numberFormat(amount)}원`);
});

Scenario('사용자가 받는 분 주소를 입력하지 않았을 경우', ({ I }) => {
  I.fillField('받는 분 성함', '김이박최아샬');
  I.fillField('받는 분 주소', '');
  I.fillField('받는 분께 보내는 메세지', '압도적 감사');

  I.click('[type=submit]');

  I.see('주소를 입력해주세요');
  I.see(`내 잔액: ${numberFormat(amount)}원`);
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
