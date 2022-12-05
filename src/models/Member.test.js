import Member from './Member';

const context = describe;

describe('Member', () => {
  let member = '';
  beforeEach(() => {
    member = new Member({ name: '김아샬', amount: 50_000 });
  });

  context('when member have enough amount', () => {
    it('can afford order', () => {
      expect(member.canAfford({ cost: 10_000 })).toBeTruthy();
    });
  });

  context('when member dont have enough amount', () => {
    it('can not afford order', () => {
      expect(member.canAfford({ cost: member.amount + 10_000 })).toBeFalsy();
    });
  });
});
