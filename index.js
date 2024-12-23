// Display
const display = document.querySelector("#display");
const p = document.querySelector("#display p");
p.style.cssText = "color: #FFFFFF; font-size: 32px; margin: auto 10px 10px;"

// Digits
const digits = document.querySelectorAll(".digit");

function insertDecimal(char) {
    if(!p.textContent.includes(char)) {
        p.textContent += char;
    }
}

digits.forEach((digit) => {
    digit.addEventListener("click", () => {
        if(display.clientWidth - p.clientWidth > 40) {
            if(digit.textContent == '.') {
                insertDecimal(digit.textContent);
            }
            else {
                p.textContent += digit.textContent;
            }
        }
    });
});


// Misc
const miscellaneous = document.querySelectorAll(".misc");

function modulo() {
    if(p.textContent.replace('.', '') != '') {

    }
}

miscellaneous.forEach((misc) => {
    misc.addEventListener("click", () => {
        if(misc.textContent == "AC") {
            p.textContent = "";
        }
        else if(misc.textContent == "C") {
            p.textContent = p.textContent.slice(0,-1);
        }
        else {
            checkOperators(misc.textContent);
        }
    });
})


// Operators
const operators = document.querySelectorAll(".operator");

function checkOperators(operator) {
    if(operator != '=') {
        const operators = ['÷', '×', '-', '+', '%'];

        if((p.textContent.replace('.', '') != "") && (!operators.some(op => p.textContent.includes(op)))) {
            p.textContent += operator;
        }
    }
    // if clicked '='
    else {

    }
}

operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        checkOperators(operator.textContent);
    });
});