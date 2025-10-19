import { Hono } from 'hono';
import { cors } from 'hono/cors';
import usersRoute from './routes/usersRoute';

const app = new Hono();

app.use('*', cors());

app.get('/', (c) => {
	return c.json({
		message: 'Hi, this is my first API using hono.',
	});
});

app.route('/users', usersRoute);

export default app;
