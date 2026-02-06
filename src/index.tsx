import { Hono } from 'hono';

const App = (props: { path: string }) => (
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
            <iframe
                src={`https://emailfake.com/temp.skymeshdynamics.com/${props.path}`}
                style={{ width: '100%', height: '100%', border: 0 }}
            ></iframe>
        </body>
    </html>
);

const app = new Hono();

app.get('*', (ctx) => {
    if (ctx.req.header('sec-fetch-dest') != 'iframe') {
        return ctx.redirect('https://temp.skymeshdynamics.com/');
    }
    const url = new URL(ctx.req.url);
    const paths = url.pathname.split('/');
    const firstPath = paths[1];
    if (paths.length > 2) {
        return ctx.redirect(`/${firstPath}`);
    }
    return ctx.render(<App path={firstPath} />);
});

export default app;
