const calculator = {
	displayNumber: "0",
	operator: null,
	firstNumber: null,
	waitingSechondNumber: false,
};

const updateDisplay = () => {
	document.querySelector("#displayResults").innerText =
		calculator.displayNumber;
};

const clearCalculator = () => {
	(calculator.displayNumber = "0"),
		(calculator.operator = null),
		(calculator.firstNumber = null),
		calculator,
		(waitingSechondNumber = false);
};

const inputDigit = digit => {
	if (calculator.displayNumber === "0") {
		calculator.displayNumber = digit;
	} else {
		calculator.displayNumber += digit;
	}
};

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
	button.addEventListener("click", event => {
		// mendapatkan objek elemen yang diklik
		const target = event.target;
		if (target.classList.contains("clear")) {
			clearCalculator();
			updateDisplay();
			return;
		}

		inputDigit(target.innerText);
		updateDisplay();
	});
}
