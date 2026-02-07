import { Hono } from 'hono';
import { FC } from 'hono/jsx';

const App: FC<{ path: string }> = (props: { path: string }) => (
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <title>temp.skymeshdynamics.com</title>
        </head>
        <body style={{ margin: 0 }}>
            <form
                method="post"
                style={{
                    position: 'absolute',
                    display: 'flex',
                    columnGap: '.30rem',
                    margin: '.30rem',
                }}
            >
                <input
                    name="path"
                    autofocus
                    style={{ padding: '.5rem', outline: 'none' }}
                />
                <button
                    type="submit"
                    style={{ padding: '.5rem', outline: 'none' }}
                >
                    Check
                </button>
            </form>
            <iframe
                src={`https://emailfake.com/temp.skymeshdynamics.com/${props.path}`}
                style={{ width: '100%', height: '100%', border: 0 }}
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
        return ctx.redirect('https://temp.skymeshdynamics.com/');
    }
    const body = await ctx.req.parseBody();
    return ctx.render(<App path={body.path?.toString() || ''} />);
});

app.all('*', (ctx) => ctx.redirect('/'));

export default app;
