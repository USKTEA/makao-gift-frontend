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

        expect(memberStore.name).toBe('김이박최아샬');
        expect(memberStore.amount).toBe(50_000);
      });
    });

    context('with incorrect memberName', () => {
      it('does not load member information', async () => {
        await memberStore.login(
          { memberName: 'xxx', password: 'Password1234!' },
        );

        expect(memberStore.name).toBeFalsy();
        expect(memberStore.amount).toBe(0);
      });
    });

    context('with incorrect password', () => {
      it('does not load member information', async () => {
        await memberStore.login(
          { memberName: 'ashal1234', password: 'xxx' },
        );

        expect(memberStore.name).toBeFalsy();
        expect(memberStore.amount).toBe(0);
      });
    });
  });
});

// 예외처리 필요함
