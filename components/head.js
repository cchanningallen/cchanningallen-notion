import NextHead from 'next/head';

export default function Head({ pageTitle }) {
    return (
        <NextHead>
            <title>{pageTitle} | Channing Allen</title>
            <link rel="icon" href="/favicon.ico" />
        </NextHead>
    );
}
