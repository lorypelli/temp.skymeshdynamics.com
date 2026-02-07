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
                    justifyContent: 'center',
                    margin: 0,
                    padding: '.30rem',
                    rowGap: '.30rem',
                }}
            >
                <input
                    name="path"
                    style={{
                        outline: 'none',
                        padding: '.5rem',
                    }}
                />
                <button
                    type="submit"
                    style={{
                        outline: 'none',
                        padding: '.5rem',
                    }}
                >
                    Check
                </button>
            </form>
            <iframe
                src={`https://emailfake.com/temp.skymeshdynamics.com/${props.path}`}
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
        return ctx.redirect('https://temp.skymeshdynamics.com/');
    }
    const body = await ctx.req.parseBody();
    return ctx.render(<App path={body.path?.toString() || ''} />);
});

app.all('*', (ctx) => ctx.redirect('/'));

export default app;
