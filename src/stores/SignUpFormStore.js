import { apiService } from '../services/ApiService';
import Store from './Store';

export default class SignUpFormStore extends Store {
  constructor() {
    super();

    this.name = '';
    this.memberName = '';
    this.password = '';
    this.confirmPassword = '';

    this.nameFieldError = '';
    this.memberNameFieldError = '';
    this.passwordFieldError = '';
    this.confirmPasswordFieldError = '';
  }

  changeName(name) {
    this.name = name;

    this.validateName();

    this.publish();
  }

  async changeMemberName(memberName) {
    this.memberName = memberName;

    await this.validateMemberName();

    this.publish();
  }

  changePassword(password) {
    this.password = password;

    this.validatePassword();

    this.publish();
  }

  changeConfirmPassword(confirmPassword) {
    this.confirmPassword = confirmPassword;

    this.validateConfirmPassword();

    this.publish();
  }

  validateName() {
    const pattern = /^[ㄱ-ㅎㅏ-ㅣ가-힣]{3,7}$/g;

    if (!this.name) {
      this.nameFieldError = '이름을 입력해주세요';

      return;
    }

    if (!pattern.test(this.name)) {
      this.nameFieldError = '이름을 다시 확인해주세요';

      return;
    }

    this.nameFieldError = '';
  }

  async validateMemberName() {
    const pattern = /^[a-z|0-9]{4,16}$/;

    if (!this.memberName) {
      this.memberNameFieldError = '아이디를 입력해주세요';

      return;
    }

    if (!pattern.test(this.memberName)) {
      this.memberNameFieldError = '아이디를 다시 확인해주세요';

      return;
    }

    const { count } = await apiService.countMember(this.memberName);

    if (count) {
      this.memberNameFieldError = '해당 아이디는 사용할 수 없습니다';

      return;
    }

    this.memberNameFieldError = '';
  }

  validatePassword() {
    const pattern = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}/;

    if (!this.password) {
      this.passwordFieldError = '비밀번호를 입력해주세요';

      return;
    }

    if (!pattern.test(this.password)) {
      this.passwordFieldError = '비밀번호를 다시 확인해주세요';

      return;
    }

    this.passwordFieldError = '';
  }

  validateConfirmPassword() {
    if (!this.changeConfirmPassword) {
      this.confirmPasswordFieldError = '비멀번호를 입력해주세요';

      return;
    }

    if (this.confirmPassword !== this.password) {
      this.confirmPasswordFieldError = '비밀번호가 일치하지 않습니다';

      return;
    }

    this.confirmPasswordFieldError = '';
  }

  hasError() {
    this.validateName();
    this.validateMemberName();
    this.validatePassword();
    this.validateConfirmPassword();

    if (this.nameFieldError || this.memberNameFieldError
      || this.passwordFieldError || this.confirmPasswordFieldError) {
      this.publish();

      return true;
    }

    return false;
  }

  clear() {
    this.name = '';
    this.memberName = '';
    this.password = '';
    this.confirmPassword = '';

    this.nameFieldError = '';
    this.memberNameFieldError = '';
    this.passwordFieldError = '';
    this.confirmPasswordFieldError = '';
  }
}

export const signUpFormStore = new SignUpFormStore();
