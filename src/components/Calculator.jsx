import { useState } from 'react';
import Buttons from './Buttons';
import Screen from './Screen';

const Calculator = () => {
	const [prevNum, setPrev] = useState('');
	const [curNum, setCurr] = useState('0');
	const [operator, setOperator] = useState('');
	const [waitingForNewNumber, setWaitingForNewNumber] = useState(false);

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
