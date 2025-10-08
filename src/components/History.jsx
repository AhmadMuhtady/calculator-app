const History = ({ history, show }) => {
	if (!show) return null;
	return (
		<div className={`history-panel ${show ? 'show' : 'hidden'}`}>
			<h3>History</h3>
			<ul>
				{history.length === 0 ? (
					<li>No history yet</li>
				) : (
					history.map((entry, index) => <li key={index}>{entry}</li>)
				)}
			</ul>
		</div>
	);
};

export default History;
