import { useState } from 'react';
import Buttons from './Buttons';
import Screen from './Screen';

const Calculator = () => {
	const [prevNum, setPrev] = useState('');
	const [curNum, setCurr] = useState('0');
	const [operator, setOperator] = useState('');
	const [waitingForNewNumber, setWaitingForNewNumber] = useState(false);

	const handleNumberClick = (number) => {
		if (waitingForNewNumber) {
			setCurr(number);
			setWaitingForNewNumber(false);
			return;
		}

		if (number === '⌫') {
			if (curNum.length === 1) {
				setCurr('0');
				return;
			}

			setCurr(curNum.slice(0, -1));
			return;
		}

		if (number === '.' && curNum.includes('.')) {
			return;
		}
		if (curNum === '0') {
			setCurr(number);
		} else {
			setCurr(curNum + number);
		}
	};

	const handleOperatorClick = (clickedOp) => {
		if (clickedOp === 'AC') {
			setPrev('');
			setCurr('0');
			setOperator('');
			return;
		}

		if (clickedOp === '=') {
			switch (operator) {
				case '+':
					setCurr((+prevNum + +curNum).toString());
					break;
				case '-':
					setCurr((+prevNum - +curNum).toString());
					break;
				case 'X':
					setCurr((+prevNum * +curNum).toString());
					break;
				case '/':
					setCurr((+prevNum / +curNum).toString());
					break;
				case '%':
					setCurr((+prevNum % +curNum).toString());
					break;
				case 'x^y':
					setCurr(Math.pow(+prevNum, +curNum).toString());
					break;
			}
			setWaitingForNewNumber(true);
			return;
		}

		setPrev(curNum);
		setOperator(clickedOp);
		setWaitingForNewNumber(true);
	};

	return (
		<div className="calculator-container">
			<Screen displayNumber={curNum} />
			<Buttons
				onNumberClick={handleNumberClick}
				onOperatorClick={handleOperatorClick}
			/>
		</div>
	);
};

export default Calculator;
