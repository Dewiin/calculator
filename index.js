// Display
const display = document.querySelector("#display");
const p = document.querySelector("#display .main");
p.style.cssText = "color: #FFFFFF; font-size: 32px; margin: 0px 10px 10px; height: 40px;";



// Functions
const addToDisplay = (newContent) => {
    if(display.clientWidth - p.clientWidth > 40) {
        p.textContent += newContent;
    }
}

const getFormat = () => {
    const operators = ["÷", "×", "-", "+", "%"];
    const symbol = operators.filter(op => p.textContent.includes(op));
    const index = p.textContent.indexOf(symbol);

    if(index == 0) {
        return [];
    }

    const left = p.textContent.slice(0,index);
    const right = p.textContent.slice(index + 1);

    return [left, symbol, right];
}

const insertDecimal = () => {
    const format = getFormat();

    if((!format[2].includes(".")) && 
    (/\d/.test(p.textContent.slice(-1)))) {
        addToDisplay(".");
    }
}

const calculate = (num1, num2, operator) => {
    let result;
    switch(operator[0]) {
        case "%":
            result = num1%num2;
            return Math.round(result*1000)/1000;
        case "÷":
            result = num1/num2;
            return Math.round(result*1000)/1000;
        case "-":
            result = num1-num2;
            return Math.round(result*1000)/1000;
        case "+":
            result = num1+num2;
            return Math.round(result*1000)/1000;
        case "×":
            result = num1*num2;
            return Math.round(result*1000)/1000;
    }
}

const checkOperators = (operator) => {
    const operators = ["÷", "×", "-", "+", "%"];
    
    if(operator != "=") {
        if((p.textContent.replace(".", "") != "") && 
        (!operators.some(op => p.textContent.includes(op)))) {
            addToDisplay(operator);
        }
    }
    else {
        if((p.textContent.replace(".", "") != "") && 
        (operators.some(op => p.textContent.includes(op))) && 
        (operators.every(op => p.textContent.slice(-1) != op))) {
            history.textContent = p.textContent;
            
            const format = getFormat();
            
            const num1 = Number(format[0]);
            const num2 = Number(format[2]);
            
            p.textContent = "";
            addToDisplay(calculate(num1, num2, format[1]));
        }
    }
}



// Digits
const digits = document.querySelectorAll(".digit");

digits.forEach((digit) => {
    digit.addEventListener("click", () => {
        if(digit.textContent == ".") {
            insertDecimal();
        }
        else if(digit.textContent == "0") {
            const format = getFormat();
            
            if((format.length == 0 && p.textContent != "0") || 
            (format.length > 0 && format[2] != "0")) {
                addToDisplay(digit.textContent);
            }
        }
        else {
            const format = getFormat();
            console.log(format);

            if((format.length == 0 && p.textContent == "0") || 
            (format.length > 0 && format[2] == "0")) {
                p.textContent= p.textContent.slice(0,-1) + digit.textContent;
            }
            else {
                addToDisplay(digit.textContent);
            }
        }
    });
});



// Misc
const miscellaneous = document.querySelectorAll(".misc");

miscellaneous.forEach((misc) => {
    misc.addEventListener("click", () => {
        if(misc.textContent == "AC") {
            history.textContent = "";
            p.textContent = "0";
        }
        else if(misc.textContent == "C") {
            p.textContent = p.textContent.slice(0,-1);
            if(p.textContent == "") {
                p.textContent = "0"
            }
        }
        else {
            checkOperators(misc.textContent);
        }
    });
})



// Operators
const operators = document.querySelectorAll(".operator");
const history = document.querySelector("#display .history");
history.style.cssText = "color: lightgray; font-size: 16px; margin: auto 10px 5px;";

operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        checkOperators(operator.textContent);
    });
});