import Button from './Button';

const Buttons = ({ onNumberClick, onOperatorClick }) => {
	const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0', '⌫'];
	const operators = ['+', '-', 'X', '/', '%', 'x^y', '=', 'AC'];

	return (
		<div className="buttons-grid">
			<div className="numbers-grid">
				{numbers.map((number) => (
					<Button
						onClick={() => onNumberClick(number)}
						key={number}
						className="number-btn"
					>
						{number}
					</Button>
				))}
			</div>
			<div className="operators-grid">
				{operators.map((operator) => (
					<Button
						onClick={() => onOperatorClick(operator)}
						key={operator}
						className="operator-btn"
					>
						{operator}
					</Button>
				))}
			</div>
		</div>
	);
};

export default Buttons;
