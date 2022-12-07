Feature('주문한 내역 보기');

Before(({ I }) => {
  I.clearDatabase();
  I.setUpUser();
  I.setUpProduct({
    id: 1,
    name: '초콜릿',
    price: '10000',
    description: 'yammy chocolate',
    manufacturer: 'Jocker',
    imageUrl: '1',
  });
});

Scenario('사용자가 주문 목록에서 주문을 클릭했을 경우', ({ I }) => {
  I.login('ashal1234');
  I.sendGiftTo({ recipient: '김이박최아샬' });
  I.see('내가 주문한 내역입니다');
  I.click('To. 김이박최아샬');
  I.see('김이박최아샬');
});
