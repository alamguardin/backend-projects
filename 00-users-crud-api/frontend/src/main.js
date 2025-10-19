import './style.css';

async function getUsersList() {
	const url = 'http://localhost:3000/users';
	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error(response.status);

		const result = await response.json();
		console.log(result);
	} catch (error) {
		console.log(error.message);
	}
}

getUsersList();
