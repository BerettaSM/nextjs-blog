import Head from 'next/head';

import Hero from '@/components/home-page/Hero';
import FeaturedPosts from '@/components/home-page/FeaturedPosts';

import { getFeaturedPosts } from '../lib/posts-util';

export default function HomePage({ featuredPosts }) {
    return (
        <>
            <Head>
                <title>Lisa's Blog</title>
                <meta
                    name="description"
                    content="I post about programming and web development."
                />
            </Head>
            <Hero />
            <FeaturedPosts posts={featuredPosts} />
        </>
    );
}

export function getStaticProps() {
    const featuredPosts = getFeaturedPosts();
    return { props: { featuredPosts }, revalidate: 10 };
}
