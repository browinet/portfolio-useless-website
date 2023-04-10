import Die from "./dice.js";

//=============================Navigation Section=============================//

const diceIcon = document.getElementById("img1");
const numIcon = document.getElementById("img2");
const timerIcon = document.getElementById("img3");
const diceBox = document.getElementById("dice_container");
const numBox = document.getElementById("numbergen_container");
const timerBox = document.getElementById("timer_container");

const displayDice = function () {
  diceBox.style.display = "flex";
  numBox.style.display = "none";
  timerBox.style.display = "none";
};

const displayNum = function () {
  diceBox.style.display = "none";
  numBox.style.display = "flex";
  timerBox.style.display = "none";
};
const displayTimer = function () {
  diceBox.style.display = "none";
  numBox.style.display = "none";
  timerBox.style.display = "flex";
};

diceIcon.addEventListener("click", displayDice);
numIcon.addEventListener("click", displayNum);
timerIcon.addEventListener("click", displayTimer);

//=============================Dice Section=============================//
//Dice: Varible
const removeDiceButton = document.getElementById("removebutton");
const titleContent = document.getElementById("dice_title");
const addDiceButton = document.getElementById("addbutton");
const rollButton = document.getElementById("roll_button");
const diceArea = document.getElementById("dice_area");

//Dice: Array
const playMat = [];

//Dice Function: Changes Grammar for Amount of Dice in PlayMat Array
const dieGrammer = function () {
  if (playMat.length <= 9 && playMat.length >= 1) {
    return `0${playMat.length} dice`;
  } else if (playMat.length == 0) {
    return "no dice";
  } else {
    return `${playMat.length} dice`;
  }
};

//Dice Tittle
titleContent.innerText = `${dieGrammer()}`;

//Dice Function: Add Dice to Play Mat
const addDice = function () {
  const createDice = new Die();
  playMat.push(createDice);

  //addDice Function 1: Add divs to html each time a new dice is pushed in array
  const addDiceHTML = document.createElement("div");
  addDiceHTML.setAttribute("id", "dice");
  addDiceHTML.setAttribute("class", "ClassDice");
  diceArea.append(addDiceHTML);

  //addDice Function 2: Updates remove button each time
  if (playMat.length >= 1) {
    removeDiceButton.style.visibility = "visible";
    titleContent.innerText = `${dieGrammer()}`;
  } else {
    removeDiceButton.style.visibility = "hidden";
    titleContent.innerText = `${dieGrammer()}`;
  }
};

//Dice Function: Remove Dice to PlayMat
const removeDice = function () {
  diceArea.removeChild(diceArea.lastElementChild);
  playMat.pop();

  //removeDice: Updates remove button each time
  titleContent.innerText = `${dieGrammer()}`;
  if (playMat.length == 0) {
    removeDiceButton.style.visibility = "hidden";
  }
};

//Dice Function: Roll Dice in PlayMat
const rollAll = function () {
  for (let i = 0; playMat.length > i; i++) {
    playMat[i].roll();
    diceArea.childNodes[
      i
    ].innerHTML = `<div id="dice_div"> ${playMat[i].currentRoll}</div>`;
  }
};

//Dice Events: Button
addDiceButton.addEventListener("click", addDice);
removeDiceButton.addEventListener("click", removeDice);
rollButton.addEventListener("click", rollAll);

//=============================Number Section=============================//
//Number: Varible
const randomNumButton = document.getElementById("buttonGen");
const numResult = document.getElementById("num_result");

//Num Function: Grabs numbers and randomize only "natural" numbers
const numGenerator = function () {
  const num1 = document.getElementById("num1").value;
  const num2 = document.getElementById("num2").value;

  //numGenerator: Checking if numbers are true
  if (+num1 && +num2) {
    if (+num1 >= 0 && +num2 >= 0) {
      if (+num1 < +num2) {
        let number = Math.floor(Math.random() * (+num2 - +num1 + 1) + +num1);
        console.log(number);
        numResult.innerText = `Your number is ${number}`;
      } else if (+num1 === +num2) {
        console.log("Beep Boop! Choose different Numbers");
        numResult.innerText = "Beep Boop! Choose different Numbers";
      } else {
        let number = Math.floor(Math.random() * (+num1 - +num2 + 1) + +num2);
        console.log(number);
        numResult.innerText = `Your number is ${number}`;
      }
    } else {
      console.log("Please Dont use Negative Numbers");
      numResult.innerText =
        "This is a negative free place! Only use positive numbers";
    }
  } else {
    console.log("Stop!");
    numResult.innerText = "Stop!! Please use numbers!";
  }
};
//Num Events:
randomNumButton.addEventListener("click", numGenerator);

//=============================Timer Section=============================//
//Timer: Varible
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
restartButton.style.display = "none";

//Timer Function:
const countdowntimer = function () {
  //countdowntimer: Grabs values and turn into a whole number
  const inputHR = document.getElementById("time1").value;
  const inputMN = document.getElementById("time2").value;
  const inputSEC = document.getElementById("time3").value;
  const sec = 1;
  const min = sec * 60;
  const hr = min * 60;
  let timerAmount = inputHR * hr + inputMN * min + inputSEC * sec;

  //countdowntimer: timer wont work unless there is a number
  if (timerAmount >= 1) {
    //Timer will ONLY start if there is more than 1 second
    const countdown = function () {
      let updatehr = Math.floor(timerAmount / hr);
      if (updatehr <= 9 && updatehr >= 0) {
        updatehr = "0" + updatehr;
      }
      let updatemn = Math.floor(timerAmount / min) % 60;
      if (updatemn <= 9 && updatemn >= 0) {
        updatemn = "0" + updatemn;
      }
      let updatesec = Math.floor((timerAmount / sec) % 60);
      if (updatesec <= 9 && updatesec >= 0) {
        updatesec = "0" + updatesec;
      }
      //updates values inputs
      document.getElementById("time1").value = `${updatehr}`;
      document.getElementById("time2").value = `${updatemn}`;
      document.getElementById("time3").value = `${updatesec}`;
      startOn();
      if (timerAmount == 0) {
        clearInterval(starttimer);
        document.getElementById("time1").value = "";
        document.getElementById("time2").value = "";
        document.getElementById("time3").value = "";
        alert("Your timer is done!");
        startOff();
      }
      timerAmount--;
    };

    //set intervals
    const starttimer = setInterval(countdown, 1000);

    //reset timer
    const restartTimer = function () {
      clearInterval(starttimer);
      document.getElementById("time1").value = "";
      document.getElementById("time2").value = "";
      document.getElementById("time3").value = "";
      startOff();
    };

    restartButton.addEventListener("click", restartTimer);
  } else {
    console.log("boop");
  }
};

//toggle button: start/restart
const startOn = function () {
  document.getElementById("time1").readOnly = true;
  document.getElementById("time2").readOnly = true;
  document.getElementById("time3").readOnly = true;
  startButton.style.display = "none";
  restartButton.style.display = "inline-block";
};
const startOff = function () {
  document.getElementById("time1").readOnly = false;
  document.getElementById("time2").readOnly = false;
  document.getElementById("time3").readOnly = false;
  startButton.style.display = "inline-block";
  restartButton.style.display = "none";
};

//Timer Event:
startButton.addEventListener("click", countdowntimer);
