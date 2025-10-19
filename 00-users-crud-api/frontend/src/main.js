import './style.css';

async function getUsersList() {
	const url = 'http://localhost:3000/users';
	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error(response.status);

		const result = await response.json();
		return result;
	} catch (error) {
		console.log(error.message);
	}
}

const usersList = await getUsersList();
const usersListElement = document.getElementById('usersList');
const userCardTemplate = document.getElementById('userTemplateCard');
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
