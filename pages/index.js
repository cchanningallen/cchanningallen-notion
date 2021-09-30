import Layout from '../components/layout';
import PageTitle from '../components/page-title';
import PageSubtitle from '../components/page-subtitle';
import notion from '../lib/notion';

export default function HomePage({ title, subtitle }) {
    return (
        <Layout pageTitle="Home">
            <PageTitle>{title}</PageTitle>
            <PageSubtitle className="mt-3">{subtitle}</PageSubtitle>
        </Layout>
    );
}

export const getStaticProps = async () => {
    const pageContent = await notion.pageContent('home');

    return {
        props: {
            title: pageContent.plainTextForID('home.title'),
            subtitle: pageContent.plainTextForID('home.subtitle'),
        },
    };
};
