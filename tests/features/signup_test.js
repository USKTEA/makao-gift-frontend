Feature('회원가입');

Scenario('사용자가 회원가입 버튼을 눌렀을 경우', ({ I }) => {
  I.amOnPage('/');

  I.click('회원가입');

  I.see('이름:');
  I.see('아이디:');
  I.see('비밀번호:');
  I.see('비밀번호 확인:');
});

Scenario('사용자가 정상적으로 회원가입이 되었을 경우', ({ I }) => {
  I.amOnPage('/');

  I.click('회원가입');

  I.fillField('이름:', '김뚜루');
  I.fillField('아이디:', 'ashal1234');
  I.fillField('비밀번호:', 'Password123!');
  I.fillField('비밀번호 확인:', 'Password123!');

  I.click('[type=submit]');

  I.see('회원가입 완료');
  I.see('로그인하기');
});

Scenario('사용자가 3자 미만의 한글을 이름란에 입력했을 경우', ({ I }) => {
  I.amOnPage('/');

  I.click('회원가입');

  I.fillField('이름:', '김뚜');
  I.fillField('아이디:', 'ashal1234');
  I.fillField('비밀번호:', 'Password123!');
  I.fillField('비밀번호 확인:', 'Password123!');

  I.click('[type=submit]');

  I.see('이름을 다시 확인해주세요');
});

Scenario('사용자가 8자 이상의 한글을 이름란에 입력했을 경우', ({ I }) => {
  I.amOnPage('/');

  I.click('회원가입');

  I.fillField('이름:', '김뚜루뚜빠라빠입니다');
  I.fillField('아이디:', 'ashal1234');
  I.fillField('비밀번호:', 'Password123!');
  I.fillField('비밀번호 확인:', 'Password123!');

  I.click('[type=submit]');

  I.see('이름을 다시 확인해주세요');
});

Scenario('사용자가 한글 이외의 문자를 이름란에 입력했을 경우', ({ I }) => {
  I.amOnPage('/');

  I.click('회원가입');

  I.fillField('이름:', 'notKorean');
  I.fillField('아이디:', 'ashal1234');
  I.fillField('비밀번호:', 'Password123!');
  I.fillField('비밀번호 확인:', 'Password123!');

  I.click('[type=submit]');

  I.see('이름을 다시 확인해주세요');
});

Scenario('사용자가 이름란에 이름을 입력하지 않았을 경우', ({ I }) => {
  I.amOnPage('/');

  I.click('회원가입');

  I.fillField('이름:', '');
  I.fillField('아이디:', 'ashal1234');
  I.fillField('비밀번호:', 'Password123!');
  I.fillField('비밀번호 확인:', 'Password123!');

  I.click('[type=submit]');

  I.see('이름을 입력해주세요');
});

Scenario('사용자가 한글을 아이디란에 입력했을 경우', ({ I }) => {
  I.amOnPage('/');

  I.click('회원가입');

  I.fillField('이름:', '김뚜루');
  I.fillField('아이디:', '오로지영문소문자와숫자만');
  I.fillField('비밀번호:', 'Password123!');
  I.fillField('비밀번호 확인:', 'Password123!');

  I.click('[type=submit]');

  I.see('아이디를 다시 확인해주세요');
});

Scenario('사용자가 영문대문자를 아이디란에 입력했을 경우', ({ I }) => {
  I.amOnPage('/');

  I.click('회원가입');

  I.fillField('이름:', '김뚜루');
  I.fillField('아이디:', 'Ashal1234');
  I.fillField('비밀번호:', 'Password123!');
  I.fillField('비밀번호 확인:', 'Password123!');

  I.click('[type=submit]');

  I.see('아이디를 다시 확인해주세요');
});

Scenario('사용자가 4자 미만의 아이디를 아이디란에 입력했을 경우', ({ I }) => {
  I.amOnPage('/');

  I.click('회원가입');

  I.fillField('이름:', '김뚜루');
  I.fillField('아이디:', 'as1');
  I.fillField('비밀번호:', 'Password123!');
  I.fillField('비밀번호 확인:', 'Password123!');

  I.click('[type=submit]');

  I.see('아이디를 다시 확인해주세요');
});

Scenario('사용자가 16자 이상의 아이디를 아이디란에 입력했을 경우', ({ I }) => {
  I.amOnPage('/');

  I.click('회원가입');

  I.fillField('이름:', '김뚜루');
  I.fillField('아이디:', 'ahsalakajoker1234');
  I.fillField('비밀번호:', 'Password123!');
  I.fillField('비밀번호 확인:', 'Password123!');

  I.click('[type=submit]');

  I.see('아이디를 다시 확인해주세요');
});

Scenario('사용자가 아이디란에 아이디를 입력하지 않았을 경우', ({ I }) => {
  I.amOnPage('/');

  I.click('회원가입');

  I.fillField('이름:', '김뚜루');
  I.fillField('아이디:', '');
  I.fillField('비밀번호:', 'Password123!');
  I.fillField('비밀번호 확인:', 'Password123!');

  I.click('[type=submit]');

  I.see('아이디를 입력해주세요');
});

Scenario('사용자가 아이디란에 입력한 아이디가 중복되었을 경우', ({ I }) => {
  I.setUpdatabase();

  I.amOnPage('/');

  I.click('회원가입');

  I.fillField('이름:', '김뚜루');
  I.fillField('아이디:', 'ashal1234');
  I.fillField('비밀번호:', 'Password123!');
  I.fillField('비밀번호 확인:', 'Password123!');

  I.click('[type=submit]');

  I.see('해당 아이디는 사용할 수 없습니다');
});

Scenario('사용자가 8자 미만의 비밀번호를 비밀번호란에 입력했을 경우', ({ I }) => {
  I.setUpdatabase();

  I.amOnPage('/');

  I.click('회원가입');

  I.fillField('이름:', '김뚜루');
  I.fillField('아이디:', 'ashal1234');
  I.fillField('비밀번호:', 'Pass12!');
  I.fillField('비밀번호 확인:', 'Pass12!');

  I.click('[type=submit]');

  I.see('비밀번호를 다시 확인해주세요');
});

Scenario('사용자가 영문 소문자가 포함되지 않은 비밀번호를 비밀번호란에 입력했을 경우', ({ I }) => {
  I.setUpdatabase();

  I.amOnPage('/');

  I.click('회원가입');

  I.fillField('이름:', '김뚜루');
  I.fillField('아이디:', 'ashal1234');
  I.fillField('비밀번호:', 'PASSWORD1234!');
  I.fillField('비밀번호 확인:', 'PASSWORD1234!');

  I.click('[type=submit]');

  I.see('비밀번호를 다시 확인해주세요');
});

Scenario('사용자가 영문 대문자가 포함되지 않은 비밀번호를 비밀번호란에 입력했을 경우', ({ I }) => {
  I.setUpdatabase();

  I.amOnPage('/');

  I.click('회원가입');

  I.fillField('이름:', '김뚜루');
  I.fillField('아이디:', 'ashal1234');
  I.fillField('비밀번호:', 'password1234!');
  I.fillField('비밀번호 확인:', 'password1234!');

  I.click('[type=submit]');

  I.see('비밀번호를 다시 확인해주세요');
});

Scenario('사용자가 숫자가 포함되지 않은 비밀번호를 비밀번호란에 입력했을 경우', ({ I }) => {
  I.setUpdatabase();

  I.amOnPage('/');

  I.click('회원가입');

  I.fillField('이름:', '김뚜루');
  I.fillField('아이디:', 'ashal1234');
  I.fillField('비밀번호:', 'password!!!!!');
  I.fillField('비밀번호 확인:', 'password!!!!!');

  I.click('[type=submit]');

  I.see('비밀번호를 다시 확인해주세요');
});

Scenario('사용자가 특수문자가 포함되지 않은 비밀번호를 비밀번호란에 입력했을 경우', ({ I }) => {
  I.setUpdatabase();

  I.amOnPage('/');

  I.click('회원가입');

  I.fillField('이름:', '김뚜루');
  I.fillField('아이디:', 'ashal1234');
  I.fillField('비밀번호:', 'password12345');
  I.fillField('비밀번호 확인:', 'password12345');

  I.click('[type=submit]');

  I.see('비밀번호를 다시 확인해주세요');
});

Scenario('사용자가 비밀번호를 입력하지 않았을 경우', ({ I }) => {
  I.setUpdatabase();

  I.amOnPage('/');

  I.click('회원가입');

  I.fillField('이름:', '김뚜루');
  I.fillField('아이디:', 'ashal1234');
  I.fillField('비밀번호:', '');
  I.fillField('비밀번호 확인:', 'password12345');

  I.click('[type=submit]');

  I.see('비밀번호를 입력해주세요');
});

Scenario('사용자가 비밀번호와 동일하지 않은 비밀번호 확인을 입력했을 경우', ({ I }) => {
  I.setUpdatabase();

  I.amOnPage('/');

  I.click('회원가입');

  I.fillField('이름:', '김뚜루');
  I.fillField('아이디:', 'ashal1234');
  I.fillField('비밀번호:', 'password1234!');
  I.fillField('비밀번호 확인:', 'notPassword1234!');

  I.click('[type=submit]');

  I.see('비밀번호가 일치하지 않습니다');
});

Scenario('사용자가 비밀번호 확인을 입력하지 않았을 경우', ({ I }) => {
  I.setUpdatabase();

  I.amOnPage('/');

  I.click('회원가입');

  I.fillField('이름:', '김뚜루');
  I.fillField('아이디:', 'ashal1234');
  I.fillField('비밀번호:', 'password1234!');
  I.fillField('비밀번호 확인:', '');

  I.click('[type=submit]');

  I.see('비밀번호를 입력해주세요');
});
