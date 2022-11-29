Feature('상품 상세 확인');

Before(({ I }) => {
  I.setUpProduct(
    {
      id: 1,
      productName: '초콜릿',
      price: 10000,
      description: 'yammy chocolate',
      manufacturer: 'Jocker',
    },
  );
});

Scenario('사용자가 상품목록에서 상품을 클릭했을 경우', ({ I }) => {
  I.amOnPage('/products');

  I.click('초콜릿', '.products');

  I.see('초콜릿');
  I.see('yammy chocolate');
  I.see('구매수량');
  I.see('10,000원');
  I.see('선물하기');
});

Scenario('사용자가 로그인을 했고 잔액이 총 상품금액보다 클 때 선물하기를 누른 경우', ({ I }) => {
  I.setUpUser();
  I.login('ashal1234');
  I.changeAmount(50000);

  I.amOnPage('/products/1');

  I.see('초콜릿');
  I.see('yammy chocolate');
  I.see('구매수량');
  I.see('10,000원');

  I.click('선물하기');

  I.see('받는 분 성함');
  I.see('받는 분 주소');
});

Scenario('사용자가 로그인을 하지 않고 선물하기를 누른 경우', ({ I }) => {
  I.amOnPage('/products/1');

  I.see('초콜릿');
  I.see('yammy chocolate');
  I.see('구매수량');
  I.see('10,000원');

  I.click('선물하기');

  I.see('USER LOGIN');
});

Scenario(
  '사용자가 로그인을 하지 않고 선물하기를 눌러서 로그인 페이지로 되고 로그인을 진행했을 경우'
  , ({ I }) => {
    I.setUpUser();
    I.amOnPage('/products/1');

    I.see('초콜릿');

    I.click('선물하기');

    I.see('USER LOGIN');

    I.fillField('아이디', 'ashal1234');
    I.fillField('비밀번호', 'Password1234!');
    I.click('로그인하기');

    I.see('초콜릿');
    I.see('선물하기');
  },
);

Scenario('사용자가 로그인을 했고 잔액이 총 상품금액보다 작을 떄 선물하기를 누른 경우', ({ I }) => {
  I.setUpUser();
  I.login('ashal1234');
  I.changeAmount(500);

  I.amOnPage('/products/1');

  I.see('초콜릿');
  I.see('yammy chocolate');
  I.see('구매수량');
  I.see('10,000원');

  I.click('선물하기');

  I.see('❌잔액이 부족하여 선물하기가 불가합니다❌');
});

Scenario('사용자가 구매수량을 올릴 경우', ({ I }) => {
  I.amOnPage('/products/1');

  I.see('초콜릿');
  I.see('yammy chocolate');
  I.see('구매수량');
  I.see('1', '.amount');
  I.see('10,000원');

  I.click('+');

  I.see('2', '.amount');
  I.see('20,000원');
});

Scenario('사용자가 구매수량을 줄일 경우', ({ I }) => {
  I.amOnPage('/products/1');

  I.see('초콜릿');
  I.see('yammy chocolate');
  I.see('구매수량');
  I.see('1', '.amount');
  I.see('10,000원');

  I.click('+');
  I.click('+');

  I.see('3', '.amount');
  I.see('30,000원');

  I.click('-');

  I.see('2', '.amount');
  I.see('20,000원');

  I.click('-');

  I.see('1', '.amount');
  I.see('10,000원');

  I.click('-');

  I.see('1', '.amount');
  I.see('10,000원');
});
