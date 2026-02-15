import { Hono } from 'hono';
import { html } from 'hono/html';
import { email } from 'zod';

const app = new Hono();

const App = (props: { t: string; u: string }) => html`
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <title>${props.u ? `${props.u} | ${props.t}` : props.t}</title>
        </head>
        <body
            style="display: flex; flex-direction: column; height: 100vh; margin: 0;"
        >
            <iframe
                src="https://emailfake.com/temp.skymeshdynamics.com/${props.u}"
                style="border: 0; flex: 1;"
            ></iframe>
        </body>
    </html>
`;

const TEMP_EMAIL = 'temp.skymeshdynamics.com';

app.all('*', (ctx) => {
    const url = new URL(ctx.req.url);
    const user = url.pathname.slice(1);
    if (user && !email().safeParse(`${user}@${TEMP_EMAIL}`).success) {
        return ctx.redirect('/');
    }
    return ctx.html(App({ t: TEMP_EMAIL, u: user }));
});

export default app;
