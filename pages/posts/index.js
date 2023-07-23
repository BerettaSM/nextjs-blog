import Head from 'next/head';
import AllPosts from '../../components/posts/AllPosts';

import { getAllPosts } from '../../lib/posts-util';

export default function AllPostsPage({ allPosts }) {
    return (
        <>
            <Head>
                <title>All Posts</title>
                <meta
                    name="description"
                    content="A list of all programming-related tutorials and posts!"
                />
            </Head>
            <AllPosts posts={allPosts} />
        </>
    );
}

export function getStaticProps() {
    const allPosts = getAllPosts();
    return { props: { allPosts }, revalidate: 10 };
}