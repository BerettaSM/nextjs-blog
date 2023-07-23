import Image from 'next/image';
import classes from './Hero.module.css';

export default function Hero() {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image
                    src="/images/site/lisa.jpg"
                    alt="An image showing Lisa"
                    width={300}
                    height={300}
                />
            </div>
            <h1>Hi, I'm Lisa</h1>
            <p>
                I blog about web development - especially frontend frameworks
                like Angular or React.
            </p>
        </section>
    );
}
