import classes from './PostsGrid.module.css';

import PostItem from './PostItem';

export default function PostsGrid({ posts }) {
    return <ul className={classes.grid}>
        {posts.map(post => (
            <PostItem key={post.slug} post={post} />
        ))}
    </ul>
}