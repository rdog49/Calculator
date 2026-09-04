let display = document.querySelector('.display');
let numbers = Array.from(document.querySelectorAll('.number'));
let backSpace = document.querySelector('.number-bs');

numbers.map((number) => {
    number.addEventListener("click", (event) => {
        switch (event.target.innerText) {

            case "AС":
                display.innerText = "0";
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

            case "^":
                display.innerText += "**";
                break;

            case "²√":
                let sqrtRes = Math.sqrt(Number(display.innerText));
                display.innerText = parseFloat(sqrtRes.toFixed(4));
                break;

            case "+/-":
                display.innerText = -display.innerText;
                break;

            case "DEL":
                if (display.innerText.length <= 1 || display.innerText === "Error") {
                    display.innerText = "0";
                } else {
                    display.innerText = display.innerText.slice(0, -1);
                }
                break;
                
            default:
                if (display.innerText === "0" && event.target.innerText !== '.'
                    && event.target.innerText !== '+'
                    && event.target.innerText !== '*'
                    && event.target.innerText !== '/') {
                    display.innerText = event.target.innerText;
                }
                else {
                    display.innerText += event.target.innerText;
                }
        }
    })
});



