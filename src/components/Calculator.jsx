import { useState, useEffect } from 'react';
import Buttons from './Buttons';
import Screen from './Screen';
import History from './History';

const Calculator = () => {
	const [prevNum, setPrev] = useState('');
	const [curNum, setCurr] = useState('0');
	const [operator, setOperator] = useState('');
	const [lastOperator, setLastOperator] = useState('');
	const [lastOperand, setLastOperand] = useState('');
	const [history, setHistory] = useState(() => {
		const saved = localStorage.getItem('calcHistory');
		return saved ? JSON.parse(saved) : [];
	});

	const [waitingForNewNumber, setWaitingForNewNumber] = useState(false);
	const [showHistory, setShowHistory] = useState(false); // NEW: toggle history

	const handleNumberClick = (number) => {
		if (curNum === 'Error') {
			// Start fresh on number press
			setCurr(number);
			setPrev('');
			setOperator('');
			setLastOperator('');
			setLastOperand('');
			setWaitingForNewNumber(false);
			return;
		}

		if (waitingForNewNumber) {
			setCurr(number);
			setWaitingForNewNumber(false);
			return;
		}

		if (number === '⌫') {
			setCurr(curNum.length === 1 ? '0' : curNum.slice(0, -1));
			return;
		}

		if (number === '.' && curNum.includes('.')) return;

		setCurr(curNum === '0' ? number : curNum + number);
	};

	const handleOperatorClick = (clickedOp) => {
		if (curNum === 'Error' && clickedOp !== 'AC') return;
		if (clickedOp === 'AC') {
			setPrev('');
			setCurr('0');
			setOperator('');
			setLastOperator('');
			setLastOperand('');
			setWaitingForNewNumber(false);
			setHistory([]); // This will also clear localStorage because of the useEffect
			return;
		}

		if (prevNum === '') {
			setPrev(curNum);
			if (clickedOp !== '=') setOperator(clickedOp);
			setWaitingForNewNumber(true);
			return;
		}

		let result = 0;

		if (!waitingForNewNumber && operator) {
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
					break;
			}
			if (isNaN(result)) result = 'Error';

			const equation = `${formatNumber(prevNum)} ${operator} ${formatNumber(
				curNum
			)} = ${formatNumber(result)}`;
			setPrev(result.toString());
			setCurr(result.toString());
			setHistory((prev) => [...prev, equation]);

			if (clickedOp === '=') {
				setLastOperator(operator);
				setLastOperand(curNum);
				setOperator('');
			} else setOperator(clickedOp);

			setWaitingForNewNumber(true);
			return;
		}

		if (clickedOp === '=' && lastOperator) {
			switch (lastOperator) {
				case '+':
					result = +prevNum + +lastOperand;
					break;
				case '-':
					result = +prevNum - +lastOperand;
					break;
				case 'X':
					result = +prevNum * +lastOperand;
					break;
				case '/':
					result = +lastOperand === 0 ? 'Error' : +prevNum / +lastOperand;
					break;
				case '%':
					result = +prevNum % +lastOperand;
					break;
				case 'x^y':
					result = Math.pow(+prevNum, +lastOperand);
					break;
			}
			if (isNaN(result)) result = 'Error';
			setPrev(result.toString());
			setCurr(result.toString());

			const equation = `${formatNumber(prevNum)} ${operator} ${formatNumber(
				curNum
			)} = ${formatNumber(result)}`;
			setHistory((prev) => [...prev, equation]);
			setWaitingForNewNumber(true);
			return;
		}

		if (clickedOp !== '=') setOperator(clickedOp);
		setWaitingForNewNumber(true);
	};

	const formatNumber = (num) => {
		if (num === 'Error') return num;
		let n = parseFloat(num);
		if (!Number.isFinite(n)) return 'Error';
		n = Math.round(n * 1e6) / 1e6;
		const [integer, decimal] = n.toString().split('.');
		const formattedInt = Number(integer).toLocaleString();
		const formatted = decimal ? `${formattedInt}.${decimal}` : formattedInt;
		return formatted.length > 12 ? formatted.slice(0, 12) + '…' : formatted;
	};

	// Save history to localStorage whenever it changes
	useEffect(() => {
		localStorage.setItem('calcHistory', JSON.stringify(history));
	}, [history]);

	useEffect(() => {
		const handleKeyPress = (event) => {
			const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0'];
			const operators = ['+', '-', 'X', '/', '%'];
			if (numbers.includes(event.key)) handleNumberClick(event.key);
			if (event.key === 'Backspace') handleNumberClick('⌫');
			if (event.key === 'Escape') handleOperatorClick('AC');
			if (operators.includes(event.key)) handleOperatorClick(event.key);
			if (event.key === 'Enter') handleOperatorClick('=');
			if (event.key === '*') handleOperatorClick('X');
		};

		window.addEventListener('keydown', handleKeyPress);
		return () => window.removeEventListener('keydown', handleKeyPress);
	}, [handleNumberClick, handleOperatorClick]);

	return (
		<div className="calculator-wrapper">
			<div className="calculator-container">
				<Screen displayNumber={formatNumber(curNum)} />
				<Buttons
					onNumberClick={handleNumberClick}
					onOperatorClick={handleOperatorClick}
				/>
				{/* Toggle History Button */}
				<button
					className="toggle-history-btn"
					onClick={() => setShowHistory((prev) => !prev)}
				>
					{showHistory ? '✖ Hide History' : '🕘 Show History'}
				</button>
			</div>
			<History history={history} show={showHistory} />
		</div>
	);
};

export default Calculator;
