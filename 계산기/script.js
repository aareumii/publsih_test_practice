const calculatorScreen = document.querySelector('.calculator-screen');
const keys = document.querySelector('.calculator-keys');

let currentInput = '0';
let firstOperand = null;
// firstOperand 변수는 첫 번째 피연산자를 저장합니다. 초기값은 null입니다.
//이유: 계산기의 첫 번째 피연산자를 저장하여 연산을 수행할 때 사용됩니다.

let operator = null;
//operator 변수는 현재 선택된 연산자를 저장합니다. 초기값은 null입니다.
//이유: 계산기의 현재 연산자를 저장하여 올바른 연산을 수행하기 위해 사용됩니다.

keys.addEventListener('click', (event) => {
	const { target } = event;
	const { value } = target;
	//keys 요소에 클릭 이벤트 리스너를 추가합니다. 이벤트가 발생하면 콜백 함수가 실행됩니다.
	//이벤트 객체에서 target (클릭된 요소)과 value (버튼의 값)을 구조 분해 할당합니다.
	if (!target.matches('button')) return;
	//클릭된 요소가 버튼이 아니면 함수를 종료합니다.
	if (value === 'C') {
		resetCalculator();
	} else if (value === '=') {
		calculate();
	} else if (['+', '-', '*', '/'].includes(value)) {
		//Array.prototype.includes()
		//용도: 배열이 특정 요소를 포함하고 있는지 확인하여 true 또는 false를 반환합니다.
		//이 코드는 배열에 value가 포함되어 있는지 확인합니다.
		handleOperator(value);
	} else {
		inputDigit(value);
	}
	updateDisplay();
});
//value가 'C'인 경우 resetCalculator 함수를 호출하여 계산기를 초기화합니다.
//value가 '='인 경우 calculate 함수를 호출하여 계산을 수행합니다.
//value가 연산자('+', '-', '*', '/') 중 하나인 경우 handleOperator 함수를 호출하여 연산자를 처리합니다.
//그 외의 경우 (숫자 또는 소수점), inputDigit 함수를 호출하여 숫자를 입력합니다.
//마지막으로 updateDisplay 함수를 호출하여 화면을 업데이트합니다.
//이유: 버튼 클릭 이벤트를 처리하여 계산기의 기능을 구현하기 위해 사용됩니다.

function inputDigit(digit) {
	if (currentInput === '0') {
		currentInput = digit;
	} else {
		currentInput += digit;
	}
}
//inputDigit 함수는 숫자 버튼이 눌렸을 때 호출됩니다.
//현재 currentInput이 '0'이면 새로운 숫자로 대체하고, 그렇지 않으면 현재 입력값에 숫자를 추가합니다.
//이유: 사용자가 숫자를 입력할 때 이를 처리하여 화면에 표시하기 위해 사용됩니다.

function handleOperator(nextOperator) {
	if (firstOperand === null) {
		firstOperand = parseFloat(currentInput);
		//parseFloat()
		//용도: 문자열 인자를 부동 소수점 숫자로 변환합니다.
	} else if (operator) {
		firstOperand = performCalculation(
			firstOperand,
			parseFloat(currentInput),
			operator
		);
	}
	operator = nextOperator;
	currentInput = '0';
}
//handleOperator 함수는 연산자 버튼이 눌렸을 때 호출됩니다.
//firstOperand가 null이면 현재 입력값을 첫 번째 피연산자로 설정합니다.
//그렇지 않고 이미 연산자가 설정되어 있으면, performCalculation 함수를 호출하여 현재 연산을 수행하고 결과를 firstOperand에 저장합니다.
//새로운 연산자를 설정하고 currentInput을 '0'으로 리셋합니다.
//이유: 사용자가 연산자를 입력할 때 이를 처리하여 올바른 연산을 준비하기 위해 사용됩니다.

function calculate() {
	if (firstOperand !== null && operator !== null) {
		currentInput = performCalculation(
			firstOperand,
			parseFloat(currentInput),
			operator
		).toString();
		//String.prototype.toString()
		//용도: 숫자를 문자열로 변환합니다.
		firstOperand = null;
		operator = null;
	}
}
//calculate 함수는 = 버튼이 눌렸을 때 호출됩니다.
//firstOperand와 operator가 설정되어 있으면, performCalculation 함수를 호출하여 현재 연산을 수행하고 결과를 currentInput에 문자열 형태로 저장합니다.
//firstOperand와 operator를 null로 리셋합니다.
//이유: 계산을 수행하고 결과를 화면에 표시하기 위해 사용됩니다.

function performCalculation(firstOperand, secondOperand, operator) {
	switch (operator) {
		case '+':
			return firstOperand + secondOperand;
		case '-':
			return firstOperand - secondOperand;
		case '*':
			return firstOperand * secondOperand;
		case '/':
			return firstOperand / secondOperand;
		default:
			return secondOperand;
	}
}
//performCalculation 함수는 연산을 수행합니다.
//첫 번째 피연산자, 두 번째 피연산자, 연산자를 받아서 해당 연산을 수행한 결과를 반환합니다.
//switch 문을 사용하여 연산자에 따라 적절한 연산을 수행합니다.
//이유: 실제 연산을 수행하고 결과를 반환하기 위해 사용됩니다.

function resetCalculator() {
	currentInput = '0';
	firstOperand = null;
	operator = null;
}

//resetCalculator 함수는 계산기를 초기 상태로 리셋합니다.
//currentInput을 '0'으로 설정하고, firstOperand와 operator를 null로 설정합니다.
//이유: 계산기를 초기화하여 새 계산을 시작할 수 있도록 하기 위해 사용됩니다.

function updateDisplay() {
	calculatorScreen.value = currentInput;
}
//updateDisplay 함수는 계산기의 화면을 업데이트합니다.
//calculatorScreen 요소의 값을 currentInput으로 설정합니다.
//이유: 계산기의 화면에 현재 입력값을 표시하기 위해 사용됩니다.

resetCalculator();
updateDisplay();
