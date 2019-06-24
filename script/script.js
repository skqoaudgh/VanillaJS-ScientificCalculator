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
const reverseKey = document.getElementById('rev');
const factorialKey = document.getElementById('fac');
const combKey = document.getElementById('comb');
const permKey = document.getElementById('perm');
const powKey = document.getElementById('pow');
const squareKey = document.getElementById('square');
const radicKey = document.getElementById('radic');
const logKey = document.getElementById('log');
const lnKey = document.getElementById('ln');
const tenPowKey = document.getElementById('ten-power');
const leftBraceKey = document.getElementById('leftbrace');
const rightBraceKey = document.getElementById('rightbrace');
const sinKey = document.getElementById('sin');
const sinRevKey = document.getElementById('sin^-1');
const cosKey = document.getElementById('cos');
const cosRevKey = document.getElementById('cos^-1');
const tanKey = document.getElementById('tan');
const tanRevKey = document.getElementById('tan^-1');

// variables
let lastAnswer = '';
let inputContainerText = '';
let noNumber = false;
let tempNum;
let tempNumLength;
let operator = '';

// util function
function isNumber(value) {
    return value != '' && !Number.isNaN(Number(value));
}

function factorial(n) {
    let ans = 1;
    for(let i=1; i<=n; i++) {
        ans *= i;
    }
    return ans;
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

// event handler
function addKeyToInputContainer(keyText) {
    inputContainerText += keyText;
    expression.value = inputContainerText;
    noNumber = false;
}

function calculateExpression(exp) {
    let oper = '';
    let l='', r='';
    for(let i=0; i<exp.length; i++) {
        if((exp[i] < '0' || exp[i] > '9') && exp[i] != '+' && exp[i] != '-' && exp[i] != '/' && exp[i] != '*') { // 연산자 나옴
            if(oper == '') {
                oper += exp[i];
            }
            else {
                if(oper == 'E') {
                    let left = parseInt(l), right = parseInt(r);
                    let ans = left*Math.pow(10, right);
    
                    exp = exp.replace(l+'E'+r,ans);
                    l = '';
                    r = '';
                }
            }
        }
        else { // 숫자, 사칙연산
            if(exp[i] >= '0' && exp[i] <= '9') {
                if(oper == '') {
                    l += exp[i];
                }
                else {
                    r += exp[i];
                }
            }
            else {
                l = '';
                r = '';
            }

            if(oper == 'E') {
                let left = parseInt(l), right = parseInt(r);
                let ans = left*Math.pow(10, right);

                exp = exp.replace(l+'E'+r,ans);
                l = '';
                r = '';
            }
        }
    }
    try {
        console.log('exp:', exp);
        answer.value = eval(exp);
        expression.value = answer.value;
        inputContainerText = answer.value;
        lastAnswer = answer.value;
        noNumber = true;
    }
    catch(err) {
        resetAllCalculation();
        answer.value = 'Syntax ERROR';
    }
    answer.focus();
}


/*
    try {
        if(operator == '') {
            answer.value = eval(expression);
        }
        else if(operator == 'E') {
            const value = expression.slice(tempNumLength+1,expression.length);
            answer.value = tempNum*Math.pow(10, value);
        }
        else if(operator == '-1') {
            if(!isNumber(tempNum)) {
                throw 'Error'
            }
            answer.value = 1/tempNum;
        }
        else if(operator == '!') {
            if(!isNumber(tempNum)) {
                throw 'Error'
            }
            answer.value = factorial(tempNum);
        }
        else if(operator == '^') {
            const value = expression.slice(tempNumLength+1,expression.length);
            if(!isNumber(tempNum) || !isNumber(value)) {
                throw 'Error'
            }
            answer.value = Math.pow(tempNum,value);
        }
        else if(operator == '^2') {
            if(!isNumber(tempNum)) {
                throw 'Error'
            }
            answer.value = Math.pow(tempNum,2);
        }     
        else if(operator == 'sqrt') {
            let value = expression.slice(tempNumLength+1,expression.length);
            if(!isNumber(value)) {
                throw 'Error'
            }
            answer.value = Math.sqrt(value);
        }
        else if(operator == 'perm') {
            let value = expression.slice(tempNumLength+1,expression.length);
            if(!isNumber(tempNum) || !isNumber(value)) {
                throw 'Error'
            }
            if(tempNum > value) {
                if(value > tempNum - value) {
                    value = tempNum - value;
                }
                answer.value = factorial(tempNum)/factorial(value);
            }
            else if(tempNum == value) {
                answer.value = 1;
            }
            else {
                resetAllCalculation();
                answer.value = 'Syntax ERROR';               
            }
        }
        else if(operator == 'comb') {
            let value = expression.slice(tempNumLength+1,expression.length);
            if(!isNumber(tempNum) || !isNumber(value)) {
                throw 'Error'
            }
            let value2 = value;
            if(tempNum > value2) {
                if(value2 > tempNum - value) {
                    value2 = tempNum - value2;
                }
                answer.value = (factorial(tempNum)/factorial(value2))/factorial(value);
            }
            else if(tempNum == value) {
                answer.value = 1;
            }
            else {
                resetAllCalculation();
                answer.value = 'Syntax ERROR';               
            }
        }
        else if(operator == 'log') {
            const value = expression.slice(3,expression.length);
            if(!isNumber(value)) {
                throw 'Error'
            }
            answer.value = Math.log(value)/Math.log(10);
        }
        else if(operator == 'ln') {
            const value = expression.slice(2,expression.length);
            if(!isNumber(value)) {
                throw 'Error'
            }
            answer.value = Math.log(value);   
        }
        else if(operator == '10^') {
            const value = expression.slice(3,expression.length);
            if(!isNumber(value)) {
                throw 'Error'
            }
            answer.value = Math.pow(10, value);
        }
        else if(operator == 'sin') {
            const value = expression.slice(3,expression.length)*(Math.PI / 180);
            if(!isNumber(value)) {
                throw 'Error'
            }
            answer.value = Math.sin(value).toFixed(15);
        }
        else if(operator == 'sin^-1') {
            const value = expression.slice(6,expression.length)*(Math.PI / 180);
            if(!isNumber(value)) {
                throw 'Error'
            }
            answer.value = 1/Math.sin(value).toFixed(15);
        }
        else if(operator == 'cos') {
            const value = expression.slice(3,expression.length)*(Math.PI / 180);
            if(!isNumber(value)) {
                throw 'Error'
            }
            answer.value = Math.cos(value).toFixed(15);
        }
        else if(operator == 'cos^-1') {
            const value = expression.slice(6,expression.length)*(Math.PI / 180);
            if(!isNumber(value)) {
                throw 'Error'
            }
            answer.value = 1/Math.cos(value).toFixed(15);
        }
        else if(operator == 'tan') {
            const value = expression.slice(3,expression.length)*(Math.PI / 180);
            if(!isNumber(value)) {
                throw 'Error'
            }
            answer.value = Math.tan(value).toFixed(15);
        }
        else if(operator == 'tan^-1') {
            const value = expression.slice(6,expression.length)*(Math.PI / 180);
            if(!isNumber(value)) {
                throw 'Error'
            }
            answer.value = 1/Math.tan(value).toFixed(15);
        }

        if(answer.value && isNumber(answer.value)) {
            expression = answer.value;
            inputContainerText = answer.value;
            lastAnswer = answer.value;
            noNumber = true;
        }
        else {
            resetAllCalculation();
            answer.value = 'Syntax ERROR';
        }
        answer.focus();
    }
    catch(err) {
        resetAllCalculation();
        answer.value = 'Syntax ERROR';
    }
}
*/

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
        calculateExpression(expression.value);
    }
    else if(event.key == 'Escape') {// esc, ac
        acKey.className = 'active';
        resetAllCalculation();
    }
    else if(event.key =='Backspace') { // backspace, del
        delKey.className = 'active';
        deleteLastOne();
    }
    else if(event.key == '(') {
        leftBraceKey.className = 'active';
        addKeyToInputContainer('(');       
    }
    else if(event.key == ')') {
        rightBraceKey.className = 'active';
        addKeyToInputContainer(')');       
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
    else if(event.key =='(') {
        leftBraceKey.className = 'adt__button';
    }
    else if(event.key ==')') {
        rightBraceKey.className = 'adt__button';
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
expKey.addEventListener('click', (event) => {
    addKeyToInputContainer('E');
});
equalKey.addEventListener('click', (event) => {
    calculateExpression(expression.value);
});
acKey.addEventListener('click', resetAllCalculation);
delKey.addEventListener('click', deleteLastOne);

reverseKey.addEventListener('click', (event) => {
    operator = '-1';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('-1');
});

factorialKey.addEventListener('click', (event) => {
    operator = '!';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('!');
});

combKey.addEventListener('click', (event) => {
    operator = 'comb';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('C');
});

permKey.addEventListener('click', (event) => {
    operator = 'perm';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('P');
});

powKey.addEventListener('click', (event) => {
    operator = '^';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('^');
});

squareKey.addEventListener('click', (event) => {
    operator = '^2';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('^2');
});

radicKey.addEventListener('click', (event) => {
    operator = 'sqrt';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('√');
});

logKey.addEventListener('click', (event) => {
    operator = 'log';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('log');
});

lnKey.addEventListener('click', (event) => {
    operator = 'ln';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('ln');
});

tenPowKey.addEventListener('click', (event) => {
    operator = '10^';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('10^');
});

sinKey.addEventListener('click', (event) => {
    operator = 'sin';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('sin');
});

sinRevKey.addEventListener('click', (event) => {
    operator = 'sin^-1';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('sin^-1');
});

cosKey.addEventListener('click', (event) => {
    operator = 'cos';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('cos');
});

cosRevKey.addEventListener('click', (event) => {
    operator = 'cos^-1';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('cos^-1');
});

tanKey.addEventListener('click', (event) => {
    operator = 'tan';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('tan');
});

tanRevKey.addEventListener('click', (event) => {
    operator = 'tan^-1';
    tempNum = expression;
    tempNumLength = tempNum.length;
    addKeyToInputContainer('tan^-1');
});

leftBraceKey.addEventListener('click', (event) => {
    addKeyToInputContainer('(');
});

rightBraceKey.addEventListener('click', (event) => {
    addKeyToInputContainer(')');
});