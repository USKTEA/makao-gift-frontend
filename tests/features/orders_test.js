Feature('주문 조회하기');

Scenario('사용자가 로그인 하지 않은 채 주문조회를 누른 경우', ({ I }) => {
  I.amOnPage('/');

  I.click('주문조회');

  I.see('USER LOGIN');
});

Scenario(
  '사용자가 로그인 하지 않은 채 주문조회를 눌러 로그인 페이지로 이동했으나 로그인에 성공한 경우',
  ({ I }) => {
    I.login('ahsal1234');
    I.setUpAccount();
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

    I.see('USER LOGIN');

    I.fillField('아이디', 'ashal1234');
    I.fillField('비밀번호', 'Password1234!');
    I.click('로그인하기');

    I.see('내가 주문한 내역입니다');
    I.see('Jocker');
    I.see('To. 김이박최야살');
  },
);

Scenario('사용자가 주문한 내역이 없는 경우', ({ I }) => {
  I.setUpAccount();

  I.amOnPage('/');

  I.click('주문조회');

  I.see('내가 주문한 내역이 없습니다');
});

Scenario('사용자가 주문한 내역이 1개 있는 경우', ({ I }) => {
  I.login('ahsal1234');
  I.setUpAccount();
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

  I.see('내가 주문한 내역입니다');
  I.see('Jocker');
  I.see('To. 김이박최야살');

  I.see(locate('a').withAttr({ href: '/products?page=1' }));
});

Scenario('사용자가 주문한 내역이 9개 있는 경우', ({ I }) => {
  I.login('ahsal1234');
  I.setUpAccount();
  I.setUpOrders(9);

  I.amOnPage('/');

  I.click('주문조회');
  I.see('내가 주문한 내역입니다');

  I.see(locate('a').withAttr({ href: '/products?page=1' }));
  I.see(locate('a').withAttr({ href: '/products?page=2' }));
});
