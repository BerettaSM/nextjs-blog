import Image from 'next/image';

import classes from './PostHeader.module.css';

export default function PostHeader({ title, image }) {
    return (
        <header className={classes.header}>
            <h1>{title}</h1>
            <Image src={image} alt={title} height={150} width={200} />
        </header>
    );
}
