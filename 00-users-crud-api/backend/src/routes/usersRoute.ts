import { Hono } from 'hono';

const usersFile = Bun.file(`${import.meta.dir}/../data.json`);
const data = JSON.parse(await usersFile.text());

const usersRoute = new Hono();

usersRoute.get('/', (c) => {
	if (data.length < 1) c.text('Not Users Available', 200);

	return c.json(data);
});

usersRoute.post('/', async (c) => {
	const body = await c.req.json();
	const newID = data[data.length - 1].id + 1;
	const newUser = {
		id: newID,
		...body,
		create_at: new Date().toISOString(),
	};
	data.push(newUser);
	await Bun.write(usersFile, JSON.stringify(data));
	return c.json(newUser, 201);
});

usersRoute.put('/:id', async (c) => {
	const idUser = Number(c.req.param('id'));
	const indexUser = data.findIndex((user) => user.id === idUser);
	if (indexUser === -1) c.text('User Not Found', 404);

	const body = await c.req.json();
	data[indexUser] = {
		id: idUser,
		...body,
		create_at: new Date().toISOString(),
	};
	await Bun.write(usersFile, JSON.stringify(data));
	return c.json(data[indexUser]);
});

usersRoute.delete('/:id', async (c) => {
	const idUser = Number(c.req.param('id'));
	const indexUser = data.findIndex((user) => user.id === idUser);
	if (indexUser === -1) return c.text('User not found', 404);

	data.splice(indexUser, 1);
	await Bun.write(usersFile, JSON.stringify(data));
	return c.text('Deleted', 200);
});

export default usersRoute;
