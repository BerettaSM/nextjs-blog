import Image from 'next/image';

import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import dracula from 'react-syntax-highlighter/dist/cjs/styles/prism/dracula';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';

import PostHeader from './PostHeader';
import classes from './PostContent.module.css';

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);

export default function PostContent({ post }) {
    if (!post) {
        return <p>Loading post.</p>;
    }

    const imagePath = `/images/posts/${post.slug}/${post.image}`;

    const customComponents = {
        img(image) {
            return (
                <Image
                    src={`/images/posts/${post.slug}/${image.src}`}
                    alt={image.alt}
                    width={600}
                    height={300}
                />
            );
        },
        p(paragraph) {
            const { node } = paragraph;
            const [firstElement] = node.children;

            if (firstElement.tagName === 'img') {
                return (
                    <div className={classes.image}>
                        <Image
                            src={`/images/posts/${post.slug}/${firstElement.properties.src}`}
                            alt={firstElement.properties.alt}
                            width={600}
                            height={300}
                        />
                    </div>
                );
            }

            return <p>{paragraph.children}</p>;
        },
        code(code) {
            const { className, children } = code;
            const language = className.split('-')[1];
            return (
                <SyntaxHighlighter
                    language={language}
                    children={children}
                    style={dracula}
                />
            );
        },
    };

    return (
        <>
            {'content' in post ? (
                <article className={classes.content}>
                    <PostHeader title={post.title} image={imagePath} />
                    <ReactMarkdown components={customComponents}>
                        {post.content}
                    </ReactMarkdown>
                </article>
            ) : (
                <p>404 - Post not found.</p>
            )}
        </>
    );
}
