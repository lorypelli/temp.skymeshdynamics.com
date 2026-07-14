import { faker } from '@faker-js/faker';
import { Hono } from 'hono';
import { html } from 'hono/html';
import { minify } from 'html-minifier-terser';
import { email } from 'zod';

const app = new Hono();

const App = (props: { e: string }) => html`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <title>${props.e}</title>
        </head>
        <body
            style="display: flex; flex-direction: column; height: 100vh; margin: 0;"
        >
            <iframe
                src="https://tinyhost.shop/${props.e}"
                style="border: 0; flex: 1;"
            ></iframe>
        </body>
    </html>
`;

const TEMP_EMAIL = 'temp.skymeshdynamics.com';

app.all('*', (ctx) => {
    const url = new URL(ctx.req.url);
    const user = url.pathname.slice(1) || faker.internet.username();
    const e = `${user.toLowerCase()}@${TEMP_EMAIL}`;
    if (!email().safeParse(e).success) {
        return ctx.redirect('/');
    }
    return ctx.html(
        minify(App({ e }).toString(), {
            collapseWhitespace: true,
            minifyCSS: true,
        }),
    );
});

export default app;
