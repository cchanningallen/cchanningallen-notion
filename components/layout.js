import Head from './head';

export default function Layout({ pageTitle, children, footer }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Head pageTitle={pageTitle} />
            <main className="flex flex-col items-center w-full flex-1 px-20 py-8 text-center">
                {children}
            </main>

            {footer && (
                <footer className="flex items-center justify-center w-full h-24 border-t">
                    {footer}
                </footer>
            )}
        </div>
    );
}
