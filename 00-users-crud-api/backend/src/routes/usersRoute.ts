import { Hono } from 'hono';

const usersFile = Bun.file(`${import.meta.dir}/../data.json`);
const data = JSON.parse(await usersFile.text());

const usersRoute = new Hono();

usersRoute.get('/', (c) => {
	return c.json(data);
});

export default usersRoute;
