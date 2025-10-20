import './style.css';

const operationsRecord = [];

async function getUsersList() {
	const url = 'http://localhost:3000/users';
	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error(response.status);

		const result = await response.json();
		operationsRecord.push({
			method: 'GET',
			message: 'Data received successfully',
		});
		return result;
	} catch (error) {
		console.log(error.message);
		operationsRecord.push({
			method: 'ERROR',
			message: 'Oh no!, the data could not be obtained',
		});
	}
}

async function setNewUser(name, email) {
	const url = 'http://localhost:3000/users';
	try {
		if (!name || !email) throw new Error('Not data');

		const response = fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, email }),
		});

		operationsRecord.push({
			method: 'POST',
			message: 'Created user successfully',
		});

		return await response.body;
	} catch (error) {
		console.log(error.message);
		operationsRecord.push({
			method: 'ERROR',
			message: 'Something went wrong, the user was not created',
		});
	}
}

async function updateUser(id, name, email) {
	const url = `http://localhost:3000/users/${id}`;
	try {
		if (!name || !email) throw new Error('Not data');

		const response = fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, email }),
		});

		operationsRecord.push({
			method: 'PUT',
			message: 'Updated user successfully',
		});

		return await response.body;
	} catch (error) {
		console.log(error.message);
		operationsRecord.push({
			method: 'ERROR',
			message: 'Oops! Something went wrong while updating the user',
		});
	}
}

const usersListElement = document.getElementById('usersList');
const userCardTemplate = document.getElementById('userTemplateCard');

async function renderUserList() {
	const usersList = await getUsersList();
	const usersListFragment = new DocumentFragment();

	for (const user of usersList) {
		const clone = userCardTemplate.content.cloneNode(true);
		const span = clone.querySelectorAll('span');
		span[0].textContent = user.id;
		span[1].textContent = user.name;
		span[2].textContent = user.email;

		usersListFragment.appendChild(clone);
	}

	usersListElement.appendChild(usersListFragment);
	updateRecordList();
}

renderUserList();

const recordsListElement = document.getElementById('recordList');
const recordCardTemplate = document.getElementById('recordTemplateCard');

function updateRecordList() {
	const recordsListFragment = new DocumentFragment();

	for (const record of operationsRecord) {
		const clone = recordCardTemplate.content.cloneNode(true);

		const div = clone.querySelector('div');

		switch (record.method) {
			case 'GET':
				div.classList.add('green');
				break;
			case 'POST':
				div.classList.add('blue');
				break;
			case 'PUT':
				div.classList.add('yellow');
				break;
			case 'DELETE':
				div.classList.add('purple');
				break;
			case 'ERROR':
				div.classList.add('red');
		}

		const span = clone.querySelectorAll('span');
		span[0].textContent = record.method;
		span[1].textContent = record.message;

		recordsListFragment.appendChild(clone);
	}

	recordsListElement.appendChild(recordsListFragment);
	console.log(operationsRecord);
}

const createUserForm = document.getElementById('createUserForm');

createUserForm.addEventListener('submit', async (e) => {
	e.preventDefault();

	const inputName = e.target[0].value.replace(' ', '');
	const inputEmail = e.target[1].value.replace(' ', '');

	await setNewUser(inputName, inputEmail);
	updateRecordList();

	e.target[0].value = '';
	e.target[1].value = '';
});

const updateUserForm = document.getElementById('updateUserForm');

updateUserForm.addEventListener('submit', async (e) => {
	e.preventDefault();

	const inputId = e.target[0].value.replace(' ', '');
	const inputName = e.target[1].value.replace(' ', '');
	const inputEmail = e.target[2].value.replace(' ', '');

	await updateUser(inputId, inputName, inputEmail);
	updateRecordList();

	e.target[0].value = '';
	e.target[1].value = '';
	e.target[2].value = '';
});
