const display = document.querySelector('.display');
const numbers = Array.from(document.querySelectorAll('.number'));

numbers.map((number) => {
    number.addEventListener("click", (event) => {
        switch (event.target.innerText) {
            // юзнул штуку которую подсмотрел в гугле для case "nˣ"
            case "+":
            case "*":
            case "/":
                if (display.innerText === '' || /[+\-*/]$/.test(display.innerText)) {
                    break;
                }
                display.innerText += event.target.innerText;
                break;

            case "-":
                if (display.innerText === '') {
                    display.innerText += '-';
                    break;
                }

                if (/[0-9.]$/.test(display.innerText) || /[+\-*/(]$/.test(display.innerText)) {
                    display.innerText += '-';
                }
                break;
                //-------------------
            case "AС":
                display.innerText = "";
                break;

            case "=":
                try {
                    let result = eval(display.innerText);

                    if (typeof result === 'number' && !Number.isInteger(result)) {
                        display.innerText = parseFloat(result.toFixed(4));
                    } else {
                        display.innerText = result;
                    }
                } catch (event) {
                    display.innerText = "error";
                }
                break;

            case "nˣ":
                //честно скажу гугл подсказал как решить
                const expression = display.innerText;

                if (!expression) {
                    break;
                }

                let index = expression.length - 1;
                while (index >= 0 && /[\d.]/.test(expression[index])) {
                    index--;
                }

                const signChar = index >= 0 ? expression[index] : '';
                const beforeSign = index > 0 ? expression[index - 1] : '';

                if (signChar === '-' && (index === 0 || /[+\-*/(]/.test(beforeSign))) {
                    const negativeNumber = expression.slice(index);
                    display.innerText = `${expression.slice(0, index)}(${negativeNumber})**`;
                } else {
                    display.innerText += "**";
                }
                break;
                //--------------
            case "²√":
                let sqrtRes = Math.sqrt(Number(display.innerText));
                display.innerText = parseFloat(sqrtRes.toFixed(4));
                break;

            case "+/-":
                if (display.innerText.includes("-" || "+" || "/" || "*")) {
                    display.innerText = display.innerText;
                } else {
                    display.innerText = -display.innerText;
                }
                break;

            case "DEL":
                if (display.innerText.length <= 1 || display.innerText === "Error") {
                    display.innerText = "";
                } else {
                    display.innerText = display.innerText.slice(0, -1);
                }
                break;

            default:
                if (display.innerText === "0" && event.target.innerText !== '.' &&
                    event.target.innerText !== '+' &&
                    event.target.innerText !== '*' &&
                    event.target.innerText !== '/') {
                    display.innerText = event.target.innerText;
                } else {
                    display.innerText += event.target.innerText;
                }
        }
    })
});