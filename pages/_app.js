import Head from 'next/head';

import '../styles/globals.css';

import Layout from '../components/layout/Layout';

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}