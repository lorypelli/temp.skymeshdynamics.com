import { Hono } from 'hono';
import { FC } from 'hono/jsx';
import { email } from 'zod';

const TEMP_EMAIL = 'temp.skymeshdynamics.com';

const App: FC<{ path: string }> = (props) => (
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <title>{TEMP_EMAIL}</title>
        </head>
        <body
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                margin: 0,
            }}
        >
            <form
                method="post"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: 0,
                    padding: '.30rem',
                    rowGap: '.30rem',
                }}
            >
                <input
                    name="path"
                    autocomplete="off"
                    style={{
                        outline: 'none',
                        padding: '.5rem',
                    }}
                />
                <button
                    type="submit"
                    style={{
                        cursor: 'pointer',
                        outline: 'none',
                        padding: '.5rem',
                    }}
                >
                    Check
                </button>
            </form>
            <iframe
                src={`https://emailfake.com/${TEMP_EMAIL}/${props.path}`}
                style={{
                    border: 0,
                    flex: 1,
                }}
            ></iframe>
        </body>
    </html>
);

const app = new Hono();

app.all('/', async (ctx) => {
    if (
        !ctx.req.url.includes('127.0.0.1:8787') &&
        ctx.req.header('sec-fetch-dest') != 'iframe'
    ) {
        return ctx.redirect(`https://${TEMP_EMAIL}/`);
    }
    const { path } = await ctx.req.parseBody();
    if (path && !email().safeParse(`${path}@${TEMP_EMAIL}`).success) {
        return ctx.redirect('/');
    }
    return ctx.render(<App path={path?.toString() || ''} />);
});

app.all('*', (ctx) => ctx.redirect('/'));

export default app;
