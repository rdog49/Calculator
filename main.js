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
                    display.innerText = eval(display.innerText);
                } catch (event) {
                    display.innerText = "something wrong"
                }
                break;
            case "^":
                    display.innerText += "**";
                break;
            case "²√":
                    display.innerText = Math.sqrt(display.innerText);
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



