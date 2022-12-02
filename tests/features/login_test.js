Feature('로그인');

Scenario('사용자가 로그인 버튼을 눌렀을 경우', ({ I }) => {
  I.amOnPage('/');

  I.click('로그인');

  I.see('로그인하기');
});

Scenario('사용자가 로그인 페이지에서 회원가입 버튼을 눌렀을 경우', ({ I }) => {
  I.amOnPage('/');

  I.click('로그인');

  I.see('로그인하기');
  I.click('회원가입');

  I.see('SIGN UP');
});

Scenario('사용자가 정상적으로 로그인했을 경우', ({ I }) => {
  I.setUpUser();

  I.amOnPage('/');

  I.click('로그인');

  I.fillField('아이디', 'ashal1234');
  I.fillField('비밀번호', 'Password1234!');
  I.click('로그인하기');

  I.see('내 잔액:');
  I.see('로그아웃');
});

// Scenario('사용자가 잘못된 아이디를 입력했을 경우', ({ I }) => {
//   I.setUpUser();

//   I.amOnPage('/');

//   I.click('로그인');

//   I.see('로그인하기');

//   I.fillField('아이디', 'xxx');
//   I.fillField('비밀번호', 'Password1234!');
//   I.click('[type=submit]');

//   I.see('아이디 혹은 비밀번호가 맞지 않습니다');
// });

// Scenario('사용자가 잘못된 비밀번호를 입력했을 경우', ({ I }) => {
//   I.setUpUser();

//   I.amOnPage('/');

//   I.click('로그인');

//   I.see('로그인하기');

//   I.fillField('아이디', 'ashal1234');
//   I.fillField('비밀번호', 'xxx');
//   I.click('[type=submit]');

//   I.see('아이디 혹은 비밀번호가 맞지 않습니다');
// });

// Scenario('사용자가 아이디를 입력하지 않았을 경우', ({ I }) => {
//   I.setUpUser();

//   I.amOnPage('/');

//   I.click('로그인');

//   I.see('로그인하기');

//   I.fillField('아이디', '');
//   I.fillField('비밀번호', 'Password1234!');
//   I.click('[type=submit]');

//   I.see('아이디를 입력해주세요');
// });

// Scenario('비밀번호를 입력하지 않았을 경우', ({ I }) => {
//   I.setUpUser();

//   I.amOnPage('/');

//   I.click('로그인');

//   I.see('로그인하기');

//   I.fillField('아이디', 'ashal1234');
//   I.fillField('비밀번호', '');
//   I.click('[type=submit]');

//   I.see('비밀번호를 입력해주세요');
// });
