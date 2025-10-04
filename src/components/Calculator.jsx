import { useState } from 'react';

const Calculator = () => {
	const [prevNum, setPrev] = useState('');
	const [curNum, setCurr] = useState('0');
	const [operator, setOperator] = useState('');
	const [waitingForNewNumber, setWaitingForNewNumber] = useState(false);

	return <></>;
};

export default Calculator;
