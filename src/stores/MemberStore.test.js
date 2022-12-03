import MemberStore from './MemberStore';

const context = describe;

describe('MemberStore', () => {
  let memberStore;

  beforeEach(() => {
    memberStore = new MemberStore();
  });

  describe('login', () => {
    context('with correct member name and password', () => {
      it('loads member information', async () => {
        await memberStore.login(
          { memberName: 'ashal1234', password: 'Password1234!' },
        );

        expect(memberStore.memberName()).toBe('ashal1234');
        expect(memberStore.name()).toBe('김이박최아샬');
        expect(memberStore.amount()).toBe(50_000);
      });
    });

    context('with incorrect memberName', () => {
      it('does not load member information', async () => {
        await memberStore.login(
          { memberName: 'xxx', password: 'Password1234!' },
        );

        const { member } = memberStore;

        expect(member).toBeFalsy();
      });
    });

    context('with incorrect password', () => {
      it('does not load member information', async () => {
        await memberStore.login(
          { memberName: 'ashal1234', password: 'xxx' },
        );

        const { member } = memberStore;

        expect(member).toBeFalsy();
      });
    });
  });

  describe('logout', () => {
    context('when logout', () => {
      it('clear member information', async () => {
        await memberStore.login(
          { memberName: 'ashal1234', password: 'Password1234!' },
        );

        expect(memberStore.member).toBeTruthy();

        memberStore.clear();

        expect(memberStore.member).toBeFalsy();
      });
    });
  });

  describe('fetchMember', () => {
    it('load member information', async () => {
      await memberStore.fetchMember();

      const { member } = memberStore;

      expect(member).toBeTruthy();
    });
  });

  describe('check is logged in', () => {
    context('when member logged in', () => {
      it('return true', async () => {
        await memberStore.fetchMember();

        expect(memberStore.isLoggedIn()).toBeTruthy();
      });
    });

    context('when member do not logged in', () => {
      it('return false', async () => {
        expect(memberStore.isLoggedIn()).toBeFalsy();
      });
    });
  });
});

// 예외처리 필요함
