export default class Member {
  constructor({ memberName, name, amount }) {
    this.memberName = memberName;
    this.name = name;
    this.amount = amount;
  }

  canAfford({ cost }) {
    return this.amount >= cost;
  }

  pay({ cost }) {
    this.amount -= cost;
  }
}
