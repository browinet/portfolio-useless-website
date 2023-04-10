class Die {
  constructor() {
    this.sideAmount = [1, 2, 3, 4, 5, 6];
    this.currentRoll = [];
  }
  //   This function will randomize sideAmount Arrays and Update Current Array
  roll() {
    let randomNum = Math.floor(Math.random() * this.sideAmount.length);
    const dieNewValue = this.sideAmount[randomNum];
    if (this.currentRoll.length == 1) {
      this.currentRoll.shift(1);
      this.currentRoll.push(dieNewValue);
    } else {
      this.currentRoll.push(dieNewValue);
    }
    return dieNewValue;
  }
  showCurrentRoll() {
    console.log(
      "Your",
      this.sideAmount.length,
      "sided die is currently",
      +this.currentRoll
    );
  }
  addSide() {
    let addNum = this.sideAmount.push(this.sideAmount.length + 1);
    console.log("Your new sides are", addNum);
  }
  removeSide() {
    if (this.sideAmount.length <= 2) {
      console.log("Opps you dont have enough sides");
    } else {
      let removeNum = this.sideAmount.pop(this.sideAmount.length - 1);
      console.log("Your new sides are", this.sideAmount.length);
      return removeNum;
    }
  }
}

export default Die;
