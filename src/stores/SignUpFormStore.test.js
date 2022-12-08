import SignUpFormStore from './SignUpFormStore';

const context = describe;
describe('SignUpFormStore', () => {
  let signUpFormStore = '';

  beforeEach(() => {
    signUpFormStore = new SignUpFormStore();
  });

  describe('check error', () => {
    it('check if has error', () => {
      signUpFormStore.changeName('xx');
      signUpFormStore.changeMemberName('xxx');
      signUpFormStore.changePassword('xx');
      signUpFormStore.changeConfirmPassword('xx');

      expect(signUpFormStore.hasError()).toBeTruthy();
    });
  });

  describe('changeName', () => {
    it('change name', () => {
      expect(signUpFormStore.name).toBe('');

      signUpFormStore.changeName('김뚜루');

      expect(signUpFormStore.name).toBe('김뚜루');
    });
  });

  describe('changeMemberName', () => {
    it('change member name', () => {
      expect(signUpFormStore.memberName).toBe('');

      signUpFormStore.changeMemberName('ashal1234');

      expect(signUpFormStore.memberName).toBe('ashal1234');
    });
  });

  describe('changePassword', () => {
    it('change password', () => {
      expect(signUpFormStore.password).toBe('');

      signUpFormStore.changePassword('Password1234!');

      expect(signUpFormStore.password).toBe('Password1234!');
    });
  });

  describe('changeConfirmPassword', () => {
    it('change confirmPassword', () => {
      expect(signUpFormStore.confirmPassword).toBe('');

      signUpFormStore.changeConfirmPassword('Password1234!');

      expect(signUpFormStore.confirmPassword).toBe('Password1234!');
    });
  });

  describe('clear', () => {
    it('clear its fields', () => {
      signUpFormStore.changeName('김뚜루');
      signUpFormStore.changeMemberName('ashal1234');
      signUpFormStore.changePassword('Password1234!');
      signUpFormStore.changeConfirmPassword('Password1234!');

      signUpFormStore.clear();

      expect(signUpFormStore.name).toBeFalsy();
      expect(signUpFormStore.memberName).toBeFalsy();
      expect(signUpFormStore.password).toBeFalsy();
      expect(signUpFormStore.confirmPassword).toBeFalsy();
    });
  });

  describe('nameField', () => {
    context('when name is empty', () => {
      it('set nameField error', () => {
        expect(signUpFormStore.nameFieldError).toBeFalsy();

        signUpFormStore.changeName('');

        expect(signUpFormStore.nameFieldError).toBeTruthy();
      });
    });

    context('when name is too short', () => {
      it('set nameField error', () => {
        expect(signUpFormStore.nameFieldError).toBeFalsy();

        signUpFormStore.changeName('김뚜');

        expect(signUpFormStore.nameFieldError).toBeTruthy();
      });
    });

    context('when name is too long', () => {
      it('set nameField error', () => {
        expect(signUpFormStore.nameFieldError).toBeFalsy();

        signUpFormStore.changeName('김뚜루빠라빠입니다');

        expect(signUpFormStore.nameFieldError).toBeTruthy();
      });
    });

    context('when name include none korean', () => {
      it('set nameField error', () => {
        expect(signUpFormStore.nameFieldError).toBeFalsy();

        signUpFormStore.changeName('ahasal111');

        expect(signUpFormStore.nameFieldError).toBeTruthy();
      });
    });
  });

  describe('memberName field', () => {
    context('when memberName is empty', () => {
      it('set memberNameField error', () => {
        expect(signUpFormStore.memberNameFieldError).toBeFalsy();

        signUpFormStore.changeMemberName('');

        expect(signUpFormStore.memberNameFieldError).toBeTruthy();
      });
    });

    context('when memberName input incorrect', () => {
      it('set memberNameField error', () => {
        expect(signUpFormStore.memberNameFieldError).toBeFalsy();

        signUpFormStore.changeMemberName('영문과소뭇자가아닌다른것');

        expect(signUpFormStore.memberNameFieldError).toBeTruthy();
      });
    });

    context('when memberName is too short', () => {
      it('set memberNameField error', () => {
        expect(signUpFormStore.memberNameFieldError).toBeFalsy();

        signUpFormStore.changeMemberName('as1');

        expect(signUpFormStore.memberNameFieldError).toBeTruthy();
      });
    });

    context('when memberName is too long', () => {
      it('set memberNameField error', () => {
        expect(signUpFormStore.memberNameFieldError).toBeFalsy();

        signUpFormStore.changeMemberName('ahsalakajoker1234');

        expect(signUpFormStore.memberNameFieldError).toBeTruthy();
      });
    });

    context('when memberName is already in use', () => {
      it('set memberNameField error', async () => {
        expect(signUpFormStore.memberNameFieldError).toBeFalsy();

        await signUpFormStore.changeMemberName('inUse');

        expect(signUpFormStore.memberNameFieldError).toBeTruthy();
      });
    });
  });

  describe('password field', () => {
    context('when password is too short', () => {
      it('set passwordField error', () => {
        expect(signUpFormStore.passwordFieldError).toBeFalsy();

        signUpFormStore.changePassword('Pass12!');

        expect(signUpFormStore.passwordFieldError).toBeTruthy();
      });
    });

    context('when password not contain lower character', () => {
      it('set passwordField error', () => {
        expect(signUpFormStore.passwordFieldError).toBeFalsy();

        signUpFormStore.changePassword('PASSWORD1234!');

        expect(signUpFormStore.passwordFieldError).toBeTruthy();
      });
    });

    context('when password not contain upper character', () => {
      it('set passwordField error', () => {
        expect(signUpFormStore.passwordFieldError).toBeFalsy();

        signUpFormStore.changePassword('password1234!');

        expect(signUpFormStore.passwordFieldError).toBeTruthy();
      });
    });

    context('when password not contain number', () => {
      it('set passwordField error', () => {
        expect(signUpFormStore.passwordFieldError).toBeFalsy();

        signUpFormStore.changePassword('password!!!!!');

        expect(signUpFormStore.passwordFieldError).toBeTruthy();
      });
    });

    context('when password not contain special symbol', () => {
      it('set passwordField error', () => {
        expect(signUpFormStore.passwordFieldError).toBeFalsy();

        signUpFormStore.changePassword('password1234');

        expect(signUpFormStore.passwordFieldError).toBeTruthy();
      });
    });

    context('when did not input password', () => {
      it('set passwordField error', () => {
        expect(signUpFormStore.passwordFieldError).toBeFalsy();

        signUpFormStore.changePassword('');

        expect(signUpFormStore.passwordFieldError).toBeTruthy();
      });
    });
  });

  describe('confirm password', () => {
    context('when password and confirmPassword are not equal', () => {
      it('set confirmPasswordField error', () => {
        expect(signUpFormStore.confirmPasswordFieldError).toBeFalsy();

        signUpFormStore.changePassword('Password1234!');
        signUpFormStore.changeConfirmPassword('notPassword1234!');

        expect(signUpFormStore.confirmPasswordFieldError).toBeTruthy();
      });
    });

    context('when did not input confirmPassword', () => {
      it('set confirmPasswordField error', () => {
        expect(signUpFormStore.confirmPasswordFieldError).toBeFalsy();

        signUpFormStore.changePassword('Password1234!');
        signUpFormStore.changeConfirmPassword('notPassword1234!');

        expect(signUpFormStore.confirmPasswordFieldError).toBeTruthy();
      });
    });
  });
});
