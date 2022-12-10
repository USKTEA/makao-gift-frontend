import Member from './Member';

const context = describe;

describe('Member', () => {
  let member = null;

  context('when member have enough amount', () => {
    it('can afford order', () => {
      member = new Member({ name: '김아샬', amount: 50_000 });
      expect(member.canAfford({ cost: 10_000 })).toBeTruthy();
    });
  });

  context('when member don\'t have enough amount', () => {
    it('cannot afford order', () => {
      member = new Member({ name: '김아샬', amount: 0 });
      expect(member.canAfford({ cost: 10_000 })).toBeFalsy();
    });
  });
});
