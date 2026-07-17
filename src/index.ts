import { faker } from '@faker-js/faker';
import { Hono } from 'hono';
import { jsxRenderer } from 'hono/jsx-renderer';
import { email } from 'zod';
import { App } from './App';

const app = new Hono();

const TEMP_EMAIL = 'temp.skymeshdynamics.com';

app.use('*', jsxRenderer());

app.all('*', (ctx) => {
    const url = new URL(ctx.req.url);
    const user = url.pathname.slice(1) || faker.internet.username();
    const e = `${user.toLowerCase()}@${TEMP_EMAIL}`;
    if (!email().safeParse(e).success) {
        return ctx.redirect('/');
    }
    return ctx.render(App({ e }));
});

export default app;
