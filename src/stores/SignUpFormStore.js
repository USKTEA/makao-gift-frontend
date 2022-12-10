import { apiService } from '../services/ApiService';
import Store from './Store';

export default class SignUpFormStore extends Store {
  constructor() {
    super();

    this.fields = {
      name: '',
      memberName: '',
      password: '',
      confirmPassword: '',
    };

    this.errors = {
      name: '',
      memberName: '',
      password: '',
      confirmPassword: '',
    };

    this.errorMessages = {
      name: { empty: '이름을 입력해주세요', invalid: '이름을 다시 확인해주세요' },
      memberName: {
        empty: '아이디를 입력해주세요',
        invalid: '아이디를 다시 확인해주세요',
        inUse: '해당 아이디는 사용할 수 없습니다',
      },
      password: {
        empty: '비밀번호를 입력해주세요',
        invalid: '비밀번호를 다시 확인해주세요',
      },
      confirmPassword: {
        empty: '비밀번호를 입력해주세요',
        invalid: '비밀번호가 일치하지 않습니다',
      },
    };

    this.patterns = {
      name: /^[ㄱ-ㅎㅏ-ㅣ가-힣]{3,7}$/g,
      memberName: /^[a-z|0-9]{4,16}$/,
      password: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}/,
    };
  }

  async changeField(field) {
    const key = Object.keys(field)[0];

    this.fields = { ...this.fields, ...field };

    await this.validate(key);

    this.publish();
  }

  async validate(field) {
    if (!this.fields[field]) {
      this.errors[field] = this.errorMessages[field].empty;

      return;
    }

    if (field === 'confirmPassword') {
      if (this.fields.password !== this.fields[field]) {
        this.errors[field] = this.errorMessages[field].invalid;

        return;
      }

      this.errors[field] = '';
      return;
    }

    const pattern = this.patterns[field];

    if (!pattern.test(this.fields[field])) {
      this.errors[field] = this.errorMessages[field].invalid;

      return;
    }

    if (field === 'memberName') {
      const { count } = await apiService.countMember(this.fields[field]);

      if (count) {
        this.errors[field] = this.errorMessages[field].inUse;

        return;
      }
    }

    this.errors[field] = '';
  }

  hasError() {
    const errors = Object.values(this.errors).join('');

    if (errors.length) {
      return true;
    }

    return false;
  }

  clear() {
    this.fields = {};
    this.errors = {};
  }
}

export const signUpFormStore = new SignUpFormStore();
