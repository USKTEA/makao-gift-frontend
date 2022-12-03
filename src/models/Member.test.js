import Member from './Member';

const context = describe;

describe('Member', () => {
  context('When member have enough amount', () => {
    it('can afford order', () => {
      const member = new Member({ name: '김아샬', amount: 50_000 });

      expect(member.canAfford({ cost: 10_000 })).toBeTruthy();
    });
  });

  context('When member dont have enough amount', () => {
    it('can not afford order', () => {
      const member = new Member({ name: '김아샬', amount: 50_000 });

      expect(member.canAfford({ cost: member.amount + 10_000 })).toBeFalsy();
    });
  });
});
