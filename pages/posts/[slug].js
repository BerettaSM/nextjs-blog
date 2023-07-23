import Head from 'next/head';
import PostContent from '@/components/posts/post-detail/PostContent';

import { getPostsFiles, getPostData } from '../../lib/posts-util';

export default function PostDetailPage({ post }) {
    return (
        <>
            <Head>
                <title>{post.title}</title>
                <meta name="description" content={post.excerpt} />
            </Head>
            <PostContent post={post} />
        </>
    );
}

export function getStaticProps({ params }) {
    const { slug } = params;
    const post = getPostData(slug);
    return { props: { post }, revalidate: 600 };
}

export function getStaticPaths() {
    const postFilenames = getPostsFiles();
    const slugs = postFilenames.map((filename) =>
        filename.replace(/\.md$/, '')
    );

    return {
        paths: slugs.map((slug) => ({ params: { slug } })),
        fallback: false,
    };
}
