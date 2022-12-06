Feature('주문 조회하기');

Scenario('사용자가 로그인 하지 않은 채 주문조회를 누른 경우', ({ I }) => {
  I.amOnPage('/');

  I.click('주문조회');

  I.see('USER LOGIN');
});

Scenario('사용자가 주문한 내역이 있는 경우', ({ I }) => {
  I.setUpUser();

  I.login('ashal1234');

  I.sendGiftTo({ recipient: '김이박최아샬' });

  I.see('내가 주문한 내역입니다');
  I.see('To. 김이박최아샬');
});

Scenario('사용자가 주문한 내역이 없는 경우', ({ I }) => {
  I.clearDatabase();

  I.setUpUser();

  I.login('ashal1234');

  I.click('주문조회');

  I.see('내가 주문한 내역이 없습니다');
});

Scenario(
  '사용자가 로그인 하지 않은 채 주문조회를 눌러 로그인 페이지로 이동했으나 로그인에 성공한 경우',
  ({ I }) => {
    I.clearDatabase();
    I.setUpProduct(
      {
        id: 1,
        name: '초콜릿',
        price: 10000,
        description: 'yammy chocolate',
        manufacturer: 'Jocker',
        imageUrl: 1,
      },
    );
    I.setUpUser();

    I.login('ashal1234');

    I.sendGiftTo({ recipient: '김이박최아샬' });

    I.logout();

    I.click('주문조회');

    I.see('USER LOGIN');

    I.login('ashal1234');

    I.click('주문조회');

    I.see('내가 주문한 내역입니다');
    I.see('To. 김이박최아샬');
  },
);
