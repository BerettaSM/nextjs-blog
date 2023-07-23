import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

const postsDirectory = path.resolve(process.cwd(), 'content', 'posts');

export function getPostData(postIdentifier) {
    const slug = postIdentifier.replace(/\.md$/, '');
    const filePath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(filePath)) return {};
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
    const { data, content } = matter(fileContent);
    return { ...data, slug, content };
}

export function getPostsFiles() {
    return fs.readdirSync(postsDirectory);
}

export function getAllPosts() {
    const postFiles = getPostsFiles();
    const allPosts = postFiles.map((postFile) => getPostData(postFile));
    allPosts.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    return allPosts;
}

export function getFeaturedPosts() {
    const allPosts = getAllPosts();
    return allPosts.filter((post) => post.isFeatured);
}
