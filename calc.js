    const display = document.getElementById('display');
        let currentInput = '0';
        let operator = null;
        let firstOperand = null;
        let waitingForSecondOperand = false;

        function updateDisplay() {
            display.value = currentInput;
        }

        function clearDisplay() {
            currentInput = '0';
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
            updateDisplay();
        }

        function appendNumber(number) {
            if (waitingForSecondOperand) {
                currentInput = number;
                waitingForSecondOperand = false;
            } else {
                if (currentInput === '0' && number !== '.') {
                    currentInput = number;
                } else if (number === '.' && currentInput.includes('.')) {
                    return;
                } else {
                    currentInput += number;
                }
            }
            updateDisplay();
        }

        function appendOperator(nextOperator) {
            const inputValue = parseFloat(currentInput);

            if (operator && waitingForSecondOperand) {
                operator = nextOperator;
                return;
            }

            if (firstOperand === null) {
                firstOperand = inputValue;
            } else if (operator) {
                const result = performCalculation[operator](firstOperand, inputValue);
                currentInput = String(result);
                firstOperand = result;
            }

            waitingForSecondOperand = true;
            operator = nextOperator;
            updateDisplay();
        }

        const performCalculation = {
            '/': (firstOperand, secondOperand) => {
                if (secondOperand === 0) {
                    return 'Error'; 
                }
                return firstOperand / secondOperand;
            },
            '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
            '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
            '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
            '=': (firstOperand, secondOperand) => secondOperand 
        };

        function calculateResult() {
            if (operator === null || waitingForSecondOperand) {
                return;
            }

            const secondOperand = parseFloat(currentInput);
            let result;

            if (operator === '/') {
                if (secondOperand === 0) {
                    result = 'Error';
                } else {
                    result = firstOperand / secondOperand;
                }
            } else {
                result = performCalculation[operator](firstOperand, secondOperand);
            }

            currentInput = String(result);
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
            updateDisplay();
        }
        window.onload = updateDisplay;
