import styles from "../../styles/About.module.css";

import Image from "next/image";

import mason from "../../public/mason.png";
import devin from "../../public/devin.jpg";

import Layout from "../../components/layout/Layout"


function About() {
    return (
        <Layout>
            <div className={styles.container}>
                <h1 id={styles.h1}>About Nightcapp</h1>
                <section id={styles.about}>
                    <div className={styles.imageContainer}>
                        <div className={styles.masonContainer}>
                            <Image
                                src={mason}
                                alt="cocktail image"
                                width={175}
                                height={175}
                            />
                            <span id={styles.mason}>Mason</span>
                        </div>
                        <div id={styles.and}>&</div>
                        <div className={styles.devinContainer}>
                            <Image
                                src={devin}
                                alt="cocktail image"
                                width={175}
                                height={175}
                            />
                            <span id={styles.devin}>Devin</span>
                        </div>
                    </div>
                    <p id={styles.p}>
                        Welcome to Nightcapp, our cocktail database. Our passion for
                        mixology inspired us to build this website and share our love of
                        cocktails with others. Our web app offers a wide range of drink
                        recipes, from classic cocktails to creative new concoctions. Whether
                        you're a seasoned bartender or just starting to explore the world of
                        mixology, we hope Nightcapp will become your go-to source for
                        cocktail inspiration. Cheers!
                    </p>
                </section>
            </div>
        </Layout>
    );
};

export default About;