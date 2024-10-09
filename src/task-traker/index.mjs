class TaskTraker {
	constructor() {
		this.tasks = [];
	}

	getTasks() {
		return this.tasks;
	}

	createID() {
		const currentList = this.tasks;
		let newID;

		if (currentList.length) {
			newID = currentList[currentList.length - 1].id + 1;
		} else {
			newID = 0;
		}

		return newID;
	}

	// CRUD Methods
	add(value) {
		const currentList = this.tasks;
		const newTask = {
			id: this.createID(),
			text: value,
			status: 'pending',
		};

		currentList.push(newTask);
		this.tasks = currentList;
	}

	list() {
		for (const task of this.tasks) {
			console.log(task);
		}
	}

	update(id, value) {
		const currentList = this.tasks;
		const idTask = currentList.findIndex((task) => task.id === id);

		currentList[idTask].text = value;

		this.tasks = currentList;
	}

	delete(id) {
		const newList = this.tasks.filter((task) => task.id !== id);
		this.tasks = newList;
	}
}

export { TaskTraker };