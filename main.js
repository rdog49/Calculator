const display = document.querySelector('.display');
const displayPrev = document.querySelector('.previosNumber');
const displayCurr = document.querySelector('.currentNumber');


class Calculator {
    constructor() {
        this.firstNumber = '';
        this.secondNumber = '';
        this.operator = '';
    }

    formatNumber(value) {
        if (value === '' || value === null || value === undefined) return '';
        if (value === '-') return '-';
        const sign = value.startsWith('-') ? '-' : '';
        const abs = sign ? value.slice(1) : value;
        const parts = abs.split('.');
        const intPart = parts[0] || '0';
        const decPart = parts[1];
        const intNumber = intPart === '' ? 0 : Number(intPart);
        const intFormatted = Number.isNaN(intNumber) ? intPart : intNumber.toLocaleString('en-US');
        return decPart ? `${sign}${intFormatted}.${decPart}` : `${sign}${intFormatted}`;
    }

    render() {
        if (this.operator && this.secondNumber !== '') {
            displayPrev.textContent = `${this.formatNumber(this.firstNumber)} ${this.operator}`;
            displayCurr.textContent = this.formatNumber(this.secondNumber);
        } else if (this.operator && this.secondNumber === '') {
            displayPrev.textContent = `${this.formatNumber(this.firstNumber)} ${this.operator}`;
            displayCurr.textContent = '';
        } else {
            displayPrev.textContent = '';
            displayCurr.textContent = this.formatNumber(this.firstNumber) || '';
        }
    }

    clear() {
        this.firstNumber = '';
        this.secondNumber = '';
        this.operator = '';
        if (displayPrev) displayPrev.textContent = '';
        if (displayCurr) displayCurr.textContent = '';
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

         if (typeof result === 'number' && !Number.isNaN(result)) 
            result = parseFloat(result.toPrecision(12));


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