import React from "react";
import styles from "@/styles/Footer.module.css"
import Link from "next/link";
import Image from "next/image";
import footerImage from "@/assets/images/footer-image.png"
import Logo from "@/assets/logo/imagotipo/merchant-m.png"

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.textLogo}>
                <p>Enjoy your product,</p>
                <p>Enjoy...</p>
                <div className={styles.textLogoImage}>
                    <Image className={styles.image} src={Logo} alt={'Merchant logo'}/>
                </div>
            </div>
            <div className={styles.linksContainer}>
                <Link href="/">Home</Link>
                <Link href="/products">Products</Link>
                <Link href="/store">Store</Link>
                <Link href="/contact-us">Contact Us</Link>
            </div>
            <div className={styles.imageContainer}>
                <Image className={styles.image} src={footerImage} alt={'Footer image'}/>
            </div>
        </div>
    );
};

export default Footer;
