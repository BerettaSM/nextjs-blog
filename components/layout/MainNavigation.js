import Link from 'next/link';

import Logo from './Logo';

import classes from './MainNavigation.module.css'

export default function MainNavigation() {
    const links = [
        { name: 'Posts', href: '/posts' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header className={classes.header}>
            <Link href='/'>
                <Logo />
            </Link>
            <nav>
                <ul>
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link href={link.href}>{link.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
