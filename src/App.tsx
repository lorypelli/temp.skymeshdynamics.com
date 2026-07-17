import { css, Style } from 'hono/css';

const body = css`
    display: flex;
    flex-direction: column;
    height: 100vh;
    margin: 0;
`;

const iframe = css`
    border: 0;
    flex: 1;
`;

export const App = (props: { e: string }) => (
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <title>{props.e}</title>
            <Style />
        </head>
        <body class={body}>
            <iframe
                src={`https://tinyhost.shop/${props.e}`}
                class={iframe}
            ></iframe>
        </body>
    </html>
);
