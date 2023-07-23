import { Head, Main, Html, NextScript } from 'next/document';

export default function MyDocument() {
    return (
        <Html lang="en">
            <Head />
            <body>
                <div id='notifications'></div>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
