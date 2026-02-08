import { Hono } from 'hono';
import { FC } from 'hono/jsx';
import { email } from 'zod';

const TEMP_EMAIL = 'temp.skymeshdynamics.com';

const MAX_LENGTH = 230;

const withPrefix = (user: string | undefined) => {
    if (user && user.length <= MAX_LENGTH) {
        return `${user}@${TEMP_EMAIL}`;
    } else {
        return TEMP_EMAIL;
    }
};

const App: FC<{ u: string | undefined }> = ({ u }) => (
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <title>{withPrefix(u)}</title>
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
                method="get"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: 0,
                    padding: '.30rem',
                    rowGap: '.30rem',
                }}
            >
                <input
                    name="u"
                    autocomplete="off"
                    maxlength={MAX_LENGTH}
                    value={u}
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
                src={`https://emailfake.com/${withPrefix(u)}`}
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
    const user = ctx.req.query('u');
    if (user && !email().safeParse(withPrefix(user)).success) {
        return ctx.redirect('/');
    }
    return ctx.render(<App u={user} />);
});

app.all('*', (ctx) => ctx.redirect('/'));

export default app;
