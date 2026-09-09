const display = document.querySelector('.display');
const displayPrev = document.querySelector('.previosNumber');
const displayCurr = document.querySelector('.currentNumber');
const formattedNumbers = display.map(num => num.toLocaleString('en-US'));


class Calculator {
    constructor() {
        this.firstNumber = '';
        this.secondNumber = '';
        this.operator = '';
    }

    render() {
        if (this.operator && this.secondNumber !== '') {
            display.textContent = `${this.firstNumber}${this.operator}${this.secondNumber}`;
        } else if (this.operator && this.secondNumber === '') {
            display.textContent = `${this.firstNumber}${this.operator}`;
        } else {
            display.textContent = this.firstNumber || '';
        }
    }

    clear() {
        this.firstNumber = '';
        this.secondNumber = '';
        this.operator = '';
        display.textContent = '';
    }

    addDigit(value) {
        if (this.operator === '') {
            if (value === '.' && this.firstNumber.includes('.')) return;
            this.firstNumber += value;
        } else {
            if (value === '.' && this.secondNumber.includes('.')) return;
            this.secondNumber += value;
        }
        this.render();
    }

    chooseOperator(sign) {
        if (sign === '-' && this.firstNumber === '' && this.operator === '') {
            this.firstNumber = '-';
            this.render();
            return;
        }

        if (this.operator && this.secondNumber !== '') {
            this.calculate();
        }

        if (this.firstNumber === '') return;

        this.operator = sign;
        this.render();
    }

    calculate() {
        if (!this.firstNumber || !this.operator || !this.secondNumber) return;

        let result;
        const a = Number(this.firstNumber);
        const b = Number(this.secondNumber);

        switch (this.operator) {
            case '+':
                result = a + b;
                break;
            case '-':
                result = a - b;
                break;
            case '*':
                result = a * b;
                break;
            case '/':
                result = b === 0 ? 'error' : a / b;
                break;
            case 'nˣ':
                result = Math.pow(a, b);
                break;
            default:
                result = b;
        }

        if (result === 'error') {
            this.clear();
            display.textContent = 'error';
            return;
        }

        this.firstNumber = String(result);
        this.secondNumber = '';
        this.operator = '';
        this.render();
    }

    toggleSign() {
        const current = this.operator ? this.secondNumber : this.firstNumber;
        if (!current || current === '-') return;

        const value = current.startsWith('-') ? current.slice(1) : `-${current}`;

        if (this.operator) {
            this.secondNumber = value;
        } else {
            this.firstNumber = value;
        }

        this.render();
    }

    deleteLast() {
        const current = this.operator ? this.secondNumber : this.firstNumber;
        if (!current) return;
        
        const value = current.slice(0, -1);

        if (this.operator) {
            this.secondNumber = value;
        } else {
            this.firstNumber = value;
        }

        this.render();
    }

    sqrtCurrent() {
        const current = this.operator ? this.secondNumber : this.firstNumber;
        if (!current || current === '-') return;
         
        const root = Math.sqrt(Number(current));
        const value = Number.isInteger(root) ? root : Number(root.toFixed(4));

        if (this.operator) {
            this.secondNumber = String(value);
        } else {
            this.firstNumber = String(value);
        }

        this.render();
    }
}

const calc = new Calculator();

const buttons = document.querySelectorAll('.number');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const id = button.id;

        switch (id) {
            case 'AC':
                calc.clear();
                break;
            case '+/-':
                calc.toggleSign();
                break;
            case 'DEL':
                calc.deleteLast();
                break;
            case '²√':
                calc.sqrtCurrent();
                break;
            case 'nˣ':
                calc.chooseOperator('nˣ');
                break;
            case '=':
                calc.calculate();
                break;
            case '+':
            case '-':
            case '*':
            case '/':
                calc.chooseOperator(id);
                break;
            default:
                if (/\d|\./.test(id)) {
                    calc.addDigit(id);
                }
        }
    });
});

calc.clear();