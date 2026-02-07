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
    if (ctx.req.header('sec-fetch-dest') != 'iframe') {
        return ctx.redirect('https://temp.skymeshdynamics.com/');
    }
    const body = await ctx.req.parseBody();
    const paths = (body.path || '').toString().split('/');
    const firstPath = paths[0];
    if (paths.length > 1) {
        return ctx.redirect(`/?path=${firstPath}`);
    }
    return ctx.render(<App path={firstPath || ''} />);
});

export default app;
