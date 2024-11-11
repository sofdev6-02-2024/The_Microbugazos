import React from 'react';
import styles from '@/styles/Footer.module.css'
import Link from "next/link";
import Image from "next/image";
import footerImage from '@/app/assets/Images/footer-image.png'
import Logo from '@/app/assets/logo/M.png'

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.textLogo}>
                <p>Enjoy your product,</p>
                <p>Enjoy...</p>
                <div className={styles.textLogoImage}>
                    <Image className={styles.image} src={Logo} alt={'image'}/>
                </div>
            </div>
            <div className={styles.linksContainer}>
                <Link href="/">Home</Link>
                <Link href="/products">Products</Link>
                <Link href="/store">Store</Link>
                <Link href="/contact-us">Contact Us</Link>
            </div>
            <div className={styles.imageContainer}>
                <Image className={styles.image} src={footerImage} alt={'image'}/>
            </div>
        </div>
    );
};

export default Footer;