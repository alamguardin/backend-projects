import './style.css';

async function getData() {
	const url = 'http://localhost:3000';
	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error(response.status);

		const result = await response.json();
		console.log(result);
	} catch (error) {
		console.log(error.message);
	}
}

getData();
