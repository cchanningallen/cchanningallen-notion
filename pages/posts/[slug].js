import Layout from '../../components/layout';
import PageTitle from '../../components/page-title';
import PageSubtitle from '../../components/page-subtitle';
import URLs from '../../util/urls';
import notion from '../../lib/notion';

export default function PostPage({ post }) {
    return (
        <Layout pageTitle={post.title}>
            <PageTitle>{post.title}</PageTitle>
            <PageSubtitle></PageSubtitle>
            <div className="text-left max-w-3xl">
                <pre>{JSON.stringify(post, false, 2)}</pre>
            </div>
        </Layout>
    );
}

export const getStaticPaths = async () => {
    const data = await notion.client.blocks.children.list({
        block_id: process.env.NOTION_PAGE_ID,
    });

    const paths = [];

    data.results.forEach((result) => {
        if (result.type == 'child_page') {
            paths.push({
                params: {
                    slug: URLs.toSlug(result.child_page.title),
                },
            });
        }
    });

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async ({ params: { slug } }) => {
    const data = await notion.client.blocks.children.list({
        block_id: process.env.NOTION_PAGE_ID,
    });

    const page = data.results.find((result) => {
        if (result.type == 'child_page') {
            const { title } = result.child_page;
            const resultSlug = URLs.toSlug(title);
            return resultSlug == slug;
        }
        return false;
    });

    const blocks = await notion.client.blocks.children.list({
        block_id: page.id,
    });

    const title = page.child_page.title;

    return {
        props: {
            post: {
                slug,
                title,
                page,
                blocks,
            },
        },
    };
};
