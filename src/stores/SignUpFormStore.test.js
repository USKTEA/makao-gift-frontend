import SignUpFormStore from './SignUpFormStore';

const context = describe;

describe('SignUpFormStore', () => {
  let signUpFormStore = '';

  beforeEach(() => {
    signUpFormStore = new SignUpFormStore();
  });

  describe('check error', () => {
    it('check if has error', () => {
      signUpFormStore.changeField({ name: 'xx' });
      signUpFormStore.changeField({ memberName: 'xxx' });
      signUpFormStore.changeField({ password: 'xxx' });
      signUpFormStore.changeField({ confirmPassword: 'xx' });

      expect(signUpFormStore.hasError()).toBeTruthy();
    });
  });

  describe('changeName', () => {
    it('change name', () => {
      expect(signUpFormStore.fields.name).toBe('');

      signUpFormStore.changeField({ name: '김뚜루' });

      expect(signUpFormStore.fields.name).toBe('김뚜루');
    });
  });

  describe('changeMemberName', () => {
    it('change member name', () => {
      expect(signUpFormStore.fields.memberName).toBe('');

      signUpFormStore.changeField({ memberName: 'ashal1234' });

      expect(signUpFormStore.fields.memberName).toBe('ashal1234');
    });
  });

  describe('changePassword', () => {
    it('change password', () => {
      expect(signUpFormStore.fields.password).toBe('');

      signUpFormStore.changeField({ password: 'Password1234!' });

      expect(signUpFormStore.fields.password).toBe('Password1234!');
    });
  });

  describe('changeConfirmPassword', () => {
    it('change confirmPassword', () => {
      expect(signUpFormStore.fields.confirmPassword).toBe('');

      signUpFormStore.changeField({ confirmPassword: 'Password1234!' });

      expect(signUpFormStore.fields.confirmPassword).toBe('Password1234!');
    });
  });

  describe('clear', () => {
    it('clear its fields', () => {
      signUpFormStore.changeField({ name: '김뚜루' });
      signUpFormStore.changeField({ memberName: 'ashal1234' });
      signUpFormStore.changeField({ password: 'invalid' });
      signUpFormStore.changeField({ confirmPassword: 'invalid' });

      signUpFormStore.clear();

      expect(signUpFormStore.fields).toEqual({});
      expect(signUpFormStore.errors).toEqual({});
    });
  });

  describe('nameField', () => {
    context('when name is empty', () => {
      it('set nameField error', () => {
        expect(signUpFormStore.errors.name).toBeFalsy();

        signUpFormStore.changeField({ name: '' });

        expect(signUpFormStore.errors.name).toBeTruthy();
      });
    });

    context('when name length is shorter than 3', () => {
      it('set nameField error', () => {
        expect(signUpFormStore.errors.name).toBeFalsy();

        signUpFormStore.changeField({ name: '김뚜' });

        expect(signUpFormStore.errors.name).toBeTruthy();
      });
    });

    context('when name length is longer than 8', () => {
      it('set nameField error', () => {
        expect(signUpFormStore.errors.name).toBeFalsy();

        signUpFormStore.changeField({ name: '김뚜루뚜빠라빠입니다' });

        expect(signUpFormStore.errors.name).toBeTruthy();
      });
    });

    context('when name include none korean', () => {
      it('set nameField error', () => {
        expect(signUpFormStore.errors.name).toBeFalsy();

        signUpFormStore.changeField({ name: 'ashal1111' });

        expect(signUpFormStore.errors.name).toBeTruthy();
      });
    });
  });

  describe('memberName field', () => {
    context('when memberName is empty', () => {
      it('set memberNameField error', async () => {
        expect(signUpFormStore.errors.memberName).toBeFalsy();

        await signUpFormStore.changeField({ memberName: '' });

        expect(signUpFormStore.errors.memberName).toBeTruthy();
      });
    });

    context('when memberName input incorrect', () => {
      it('set memberNameField error', async () => {
        expect(signUpFormStore.errors.memberName).toBeFalsy();

        await signUpFormStore.changeField({ memberName: '영문과소문자가아닌다른것' });

        expect(signUpFormStore.errors.memberName).toBeTruthy();
      });
    });

    context('when memberName length is shorter than 4', () => {
      it('set memberNameField error', async () => {
        expect(signUpFormStore.errors.memberName).toBeFalsy();

        await signUpFormStore.changeField({ memberName: 'as1' });

        expect(signUpFormStore.errors.memberName).toBeTruthy();
      });
    });

    context('when memberName length is longer than 16', () => {
      it('set memberNameField error', async () => {
        expect(signUpFormStore.errors.memberName).toBeFalsy();

        await signUpFormStore.changeField({ memberName: 'ashalakajocker1234' });

        expect(signUpFormStore.errors.memberName).toBeTruthy();
      });
    });

    context('when memberName is already in use', () => {
      it('set memberNameField error', async () => {
        expect(signUpFormStore.errors.memberName).toBeFalsy();

        await signUpFormStore.changeField({ memberName: 'alreadyinuse1' });

        expect(signUpFormStore.errors.memberName).toBeTruthy();
      });
    });
  });

  describe('password field', () => {
    context('when password length is shorter than 8', () => {
      it('set passwordField error', () => {
        expect(signUpFormStore.errors.password).toBeFalsy();

        signUpFormStore.changeField({ password: 'Pass12!' });

        expect(signUpFormStore.errors.password).toBeTruthy();
      });
    });

    context('when password not contain lower character', () => {
      it('set passwordField error', () => {
        expect(signUpFormStore.errors.password).toBeFalsy();

        signUpFormStore.changeField({ password: 'PASSWORD1234!' });

        expect(signUpFormStore.errors.password).toBeTruthy();
      });
    });

    context('when password not contain upper character', () => {
      it('set passwordField error', () => {
        expect(signUpFormStore.errors.password).toBeFalsy();

        signUpFormStore.changeField({ password: 'password1234!' });

        expect(signUpFormStore.errors.password).toBeTruthy();
      });
    });

    context('when password not contain number', () => {
      it('set passwordField error', () => {
        expect(signUpFormStore.errors.password).toBeFalsy();

        signUpFormStore.changeField({ password: 'password!!!!!' });

        expect(signUpFormStore.errors.password).toBeTruthy();
      });
    });

    context('when password not contain special symbol', () => {
      it('set passwordField error', () => {
        expect(signUpFormStore.errors.password).toBeFalsy();

        signUpFormStore.changeField({ password: 'password1234' });

        expect(signUpFormStore.errors.password).toBeTruthy();
      });
    });

    context('when did not input password', () => {
      it('set passwordField error', () => {
        expect(signUpFormStore.errors.password).toBeFalsy();

        signUpFormStore.changeField({ password: '' });

        expect(signUpFormStore.errors.password).toBeTruthy();
      });
    });
  });

  describe('confirm password', () => {
    context('when password and confirmPassword are not equal', () => {
      it('set confirmPasswordField error', () => {
        expect(signUpFormStore.errors.confirmPassword).toBeFalsy();

        signUpFormStore.changeField({ password: 'Password1234!' });
        signUpFormStore.changeField({ confirmPassword: 'notPassword1234!' });

        expect(signUpFormStore.errors.confirmPassword).toBeTruthy();
      });
    });

    context('when did not input confirmPassword', () => {
      it('set confirmPasswordField error', () => {
        expect(signUpFormStore.errors.confirmPassword).toBeFalsy();

        signUpFormStore.changeField({ password: 'Password1234!' });
        signUpFormStore.changeField({ confirmPassword: '' });

        expect(signUpFormStore.errors.confirmPassword).toBeTruthy();
      });
    });
  });
});
