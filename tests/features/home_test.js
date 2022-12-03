Feature('홈페이지');

Scenario('사용자가 페이지에 접속했을 경우', ({ I }) => {
  I.amOnPage('/');

  I.see('회원가입');
  I.see('로그인');
});

Scenario('사용자가 로그인했을 경우', ({ I }) => {
  I.setUpUser();
  I.login('ashal1234');

  I.see('내 잔액:');
  I.see('로그아웃');
});

Scenario('사용자가 로그아웃했을 경우', ({ I }) => {
  I.setUpUser();

  I.login('ashal1234');

  I.see('내 잔액:');
  I.see('로그아웃');

  I.click('로그아웃');

  I.see('회원가입');
  I.see('로그인');
});
