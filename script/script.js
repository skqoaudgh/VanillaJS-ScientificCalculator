//output
const expression = document.getElementById('expression');
const answer = document.getElementById('answer');

// primary
const numKey = [];
for(let i=0; i<10; i++) {
    numKey[i] = document.getElementById(i);
}
const multKey = document.getElementById('*');
const divideKey = document.getElementById('/');
const AddKey = document.getElementById('+');
const SubtractKey = document.getElementById('-');
const equalKey = document.getElementById('Equal');
const dotKey = document.getElementById('Dot');
const expKey = document.getElementById('Exp');
const ansKey = document.getElementById('Ans');
const delKey = document.getElementById('Del');
const acKey = document.getElementById('AC');

//additional

// variables
let lastAnswer = '';
let inputContainerText = '';
let noNumber = false;
let tempNum;
let tempNumLength;
let operator = '';

// event handler
function addKeyToInputContainer(keyText) {
    inputContainerText += keyText;
    expression.value = inputContainerText;
    noNumber = false;
}

function calculateExpression() {
    if(operator == '') {
        answer.value = eval(expression.value);
    }
    else if(operator == 'E') {
        const value = expression.value.slice(tempNumLength+1,expression.value.length);
        answer.value = tempNum*Math.pow(10, value);
    }

    expression.value = answer.value;
    inputContainerText = answer.value;
    lastAnswer = answer.value;
    noNumber = true;
    answer.focus();
}

function keydownHandler(event) {
    const inputKey = parseInt(event.key);
    if(inputKey >= 0 && inputKey <= 9) { // 0~9
        numKey[inputKey].className = 'active';
        if(noNumber) {
            inputContainerText = '';
            operator = '';
        }
        addKeyToInputContainer(event.key);
    }
    else if(event.key == '*' || event.key == 'x' || event.key == 'X') { // multi
        multKey.className = 'active';
        addKeyToInputContainer('*');
    }
    else if(event.key == '/') { // divide
        divideKey.className = 'active';
        addKeyToInputContainer('/');
    }
    else if(event.key == '+') { // add
        AddKey.className = 'active';
        addKeyToInputContainer('+');
    }
    else if(event.key == '-') { // subtract
        SubtractKey.className = 'active';
        addKeyToInputContainer('-');
    }
    else if(event.key == '.') {// dot
        dotKey.className = 'active';
        addKeyToInputContainer('.');
    }   
    else if(event.key == 'Enter') {// enter
        equalKey.className = 'active';
        calculateExpression();
    }
    else if(event.key == 'Escape') {// esc, ac
        acKey.className = 'active';
        resetAllCalculation();
    }
    else if(event.key =='Backspace') { // backspace, del
        delKey.className = 'active';
        deleteLastOne();
    }
}

function keyupHandler(event) {
    const inputKey = parseInt(event.key);
    if(inputKey >= 0 && inputKey <= 9) { // 0~9
        numKey[inputKey].className = 'pri__button';
    }
    else if(event.key == '*' || event.key == 'x' || event.key == 'X') { // multi
        multKey.className = 'pri__button'
    }
    else if(event.key == '/') { // divide
        divideKey.className = 'pri__button'
    }
    else if(event.key == '+') { // add
        AddKey.className = 'pri__button'
    }
    else if(event.key == '-') { // subtract
        SubtractKey.className = 'pri__button'
    }
    else if(event.key == '.') {// dot
        dotKey.className = 'pri__button'
    }  
    else if(event.key == 'Enter') {// enter
        equalKey.className = 'pri__button'
    }
    else if(event.key == 'Escape') {// esc, ac
        acKey.className = 'pri__button';
    }
    else if(event.key =='Backspace') { // backspace, del
        delKey.className = 'pri__button';
    }
}

function ansKeyHandler(event) {
    if(lastAnswer != '') {
        if(isNumber(inputContainerText[inputContainerText.length-1])) {
            inputContainerText = '';
            operator = '';
        }
        addKeyToInputContainer(lastAnswer);
        noNumber = true;
    }
}

function expKeyHandler(event) {
    tempNum = expression.value;
    tempNumLength = tempNum.length;
    if(isNumber(tempNum)) {
        if(operator == '') {
            operator = 'E';
            addKeyToInputContainer('E');
        }
    }
}

function resetAllCalculation() {
    expression.value = '';
    answer.value = '';
    inputContainerText = '';
    noNumber = false;
    tempNum = '';
    tempNumLength = 0;
    operator = '';
}

function deleteLastOne() {
    inputContainerText = inputContainerText.slice(0,-1);
    expression.value = inputContainerText;
}

function numKeyHandler(event) {
    if(noNumber) {
        inputContainerText = '';
        operator = '';
    }
    addKeyToInputContainer(event.target.id);
}

function isNumber(value) {
    return Number.isInteger(Number(value));
}

window.addEventListener('keydown', keydownHandler);
window.addEventListener('keyup', keyupHandler);

for(let i=0; i<10; i++) {
    numKey[i].addEventListener('click', numKeyHandler);
}
multKey.addEventListener('click', (event) => {
    addKeyToInputContainer('*');
});
divideKey.addEventListener('click', (event) => {
    addKeyToInputContainer('/');
});
AddKey.addEventListener('click', (event) => {
    addKeyToInputContainer('+');
});
SubtractKey.addEventListener('click', (event) => {
    addKeyToInputContainer('-');
});
dotKey.addEventListener('click', (event) => {
    addKeyToInputContainer('.');
});

ansKey.addEventListener('click', ansKeyHandler);
expKey.addEventListener('click', expKeyHandler);
equalKey.addEventListener('click', calculateExpression);
acKey.addEventListener('click', resetAllCalculation);
delKey.addEventListener('click', deleteLastOne);