Feature('상품 목록 확인');

Before(({ I }) => {
  I.clearDatabase();
});

Scenario('스토어에 상품이 없는 경우', ({ I }) => {
  I.amOnPage('/');

  I.click('스토어');

  I.see('상품이 존재하지 않습니다');
});

Scenario('스토어에 상품이 9개 미만 있는 경우', ({ I }) => {
  I.setUpProducts(1);

  I.amOnPage('/');

  I.click('스토어');

  I.dontSee('상품이 존재하지 않습니다');

  I.see('1', '.page-number');
});

Scenario('스토어에 상품이 9개 있는 경우', ({ I }) => {
  I.setUpProducts(9);

  I.amOnPage('/');

  I.click('스토어');

  I.dontSee('상품이 존재하지 않습니다');

  I.see('1', '.page-number');
  I.see('2', '.page-number');
});

Scenario('스토어에 상품이 19개 있는 경우', ({ I }) => {
  I.setUpProducts(19);

  I.amOnPage('/');

  I.click('스토어');

  I.dontSee('상품이 존재하지 않습니다');

  I.see('1', '.page-number');
  I.see('2', '.page-number');
  I.see('3', '.page-number');
});
