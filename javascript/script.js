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
	calculator.displayNumber = "0";
	calculator.operator = null;
	calculator.firstNumber = null;
	calculator.waitingSechondNumber = false;
};

const inputDigit = digit => {
	if (calculator.displayNumber === "0") {
		calculator.displayNumber = digit;
	} else {
		calculator.displayNumber += digit;
	}
};

const inverseNumber = () => {
	if (calculator.displayNumber === "0") {
		return;
	}
	calculator.displayNumber = calculator.displayNumber * -1;
};

const handleOperator = operator => {
	if (!calculator.waitingSechondNumber) {
		calculator.operator = operator;
		calculator.waitingSechondNumber = true;
		calculator.firstNumber = calculator.displayNumber;
		calculator.displayNumber = "0";
	} else {
		alert("Operator sudah ditetapkan");
	}
};

const performCalculation = () => {
	if (calculator.firstNumber == null || calculator.operator == null) {
		alert("Anda belum menetapkan operator");
		return;
	}

	let result = 0;

	if (calculator.operator === "+") {
		result =
			parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
	}
	if (calculator.operator === "-") {
		result =
			parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
	}
	if (calculator.operator === "x") {
		result =
			parseInt(calculator.firstNumber) * parseInt(calculator.displayNumber);
	}

	const history = {
		firstNumber: calculator.firstNumber,
		secondNumber: calculator.displayNumber,
		operator: calculator.operator,
		result: result,
	};
	putHistory(history);
	calculator.displayNumber = result;
	renderHistory();
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

		if (target.classList.contains("negative")) {
			inverseNumber();
			updateDisplay();
			return;
		}

		if (target.classList.contains("equals")) {
			performCalculation();
			updateDisplay();
			return;
		}

		if (target.classList.contains("operator")) {
			handleOperator(target.innerText);
			return;
		}

		inputDigit(target.innerText);
		updateDisplay();
	});
}
// local storage
const CACHE_KEY = "calculation_history";

const checkForStorage = () => {
	if (typeof Storage !== "undefined") {
	}
};

const putHistory = data => {
	if (checkForStorage()) {
		let historyData = null;
		if (localStorage.getItem(CACHE_KEY) === null) {
			historyData = [];
		} else {
			historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
		}

		historyData.unshift(data);

		if (historyData.length > 5) {
			historyData.pop();
		}
	}
};

const showHistory = () => {
	if (checkForStorage()) {
		return JSON.parse(localStorage.getItem(CACHE_KEY) || []);
	} else {
		return [];
	}
};

const renderHistory = () => {
	const historyData = showHistory();
	let historyList = document.querySelector("#historyList");

	// selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
	historyList.innerHTML = "";

	for (let history of historyData) {
		let row = document.createElement("tr");
		row.innerHTML = "<td>" + history.firstNumber + "</td>";
		row.innerHTML += "<td>" + history.operator + "</td>";
		row.innerHTML += "<td>" + history.secondNumber + "</td>";
		row.innerHTML += "<td>" + history.result + "</td>";

		historyList.appendChild(row);
	}
};
