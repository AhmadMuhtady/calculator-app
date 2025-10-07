import { useState, useEffect } from 'react';
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

		if (prevNum === '') {
			setPrev(curNum);
			setOperator(clickedOp);
			setWaitingForNewNumber(true);
			return; // stop here so it doesn’t calculate yet
		}

		if (!waitingForNewNumber && operator) {
			let result = 0;

			switch (operator) {
				case '+':
					result = +prevNum + +curNum;
					break;
				case '-':
					result = +prevNum - +curNum;
					break;
				case 'X':
					result = +prevNum * +curNum;
					break;
				case '/':
					result = +curNum === 0 ? 'Error' : +prevNum / +curNum;
					break;
				case '%':
					result = +prevNum % +curNum;
					break;
				case 'x^y':
					result = Math.pow(+prevNum, +curNum);
					if (isNaN(result)) result = 'Error';
					break;
			}

			setPrev(result.toString());
			setCurr(result.toString());
		}

		// Handle "=" separately
		if (clickedOp === '=') {
			setOperator('');
		} else {
			setOperator(clickedOp);
		}

		setWaitingForNewNumber(true);
	};

	useEffect(() => {
		// Add the listener when component mounts
		const handleKeyPress = (event) => {
			const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0'];
			const operators = ['+', '-', 'X', '/', '%'];
			console.log(event.key);
			if (numbers.includes(event.key)) {
				handleNumberClick(event.key);
			}
			if (event.key === 'Backspace') {
				handleNumberClick('⌫');
			}
			if (event.key === 'Escape') {
				handleOperatorClick('AC');
			}

			if (operators.includes(event.key)) {
				handleOperatorClick(event.key);
			}
			if (event.key === 'Enter') {
				handleOperatorClick('=');
			}
			if (event.key === '*') {
				handleOperatorClick('X');
			}
		};

		window.addEventListener('keydown', handleKeyPress);

		// Cleanup: Remove listener when component unmounts
		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, [handleNumberClick, handleOperatorClick]); // Empty array = only run once

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

// need to add continue calculation + the error statement
