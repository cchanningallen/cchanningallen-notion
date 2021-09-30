import NextLink from 'next/link';
import Layout from '../components/layout';
import PageTitle from '../components/page-title';
import URLs from '../util/urls';
import notion from '../lib/notion';

export default function PostsPage({ posts }) {
    return (
        <Layout pageTitle="Posts">
            <PageTitle>Posts</PageTitle>
            <div className="text-left mt-8">
                {posts.map(({ id, title, slug }) => (
                    <p key={id}>
                        <NextLink href={`/posts/${slug}`}>
                            <a>{title}</a>
                        </NextLink>
                    </p>
                ))}
            </div>
        </Layout>
    );
}

export const getStaticProps = async () => {
    const data = await notion.client.blocks.children.list({
        block_id: process.env.NOTION_PAGE_ID,
    });

    const posts = [];

    data.results.forEach((result) => {
        if (result.type == 'child_page') {
            posts.push({
                id: result.id,
                title: result.child_page.title,
                slug: URLs.toSlug(result.child_page.title),
            });
        }
    });

    return {
        props: {
            posts,
        },
    };
};
