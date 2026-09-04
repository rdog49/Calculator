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
                    display.innerText = "Error"
                }
                break;
            case "x²":
                    display.innerText = Math.pow(display.innerText, 2);
                
                break;
            case "²√":
                    display.innerText = Math.sqrt(display.innerText);
                break;
            case "+/-":
                    display.innerText = -display.innerText;
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



