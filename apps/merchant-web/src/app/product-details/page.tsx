"use client"
import RatingSelector from "@/components/RatingSelector";
import ChipSelector from "@/components/ChipSelector";
import QuantitySelector from "@/components/QuantitySelector";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import {useEffect, useState} from "react";
import ProductDetailsStyle from "@/styles/products/ProductDetails.module.css"

export default function ProductDetails() {
    const id = "";
    const [isFavorite, setIsFavorite] = useState(false);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetch()
    }, []);

    return (
        <div className={ProductDetailsStyle.productDetailsSection}>
            <section className={ProductDetailsStyle.imagesSection}>
                <div className={ProductDetailsStyle.secondaryImages}>
                    <img className={ProductDetailsStyle.secondaryImage}
                         src="https://th.bing.com/th/id/R.20d3e94846b0317ba981e9b4d3ecdabb?rik=wRXoSyZgG3cbIA&pid=ImgRaw&r=0"/>
                    <img className={ProductDetailsStyle.secondaryImage}
                         src="https://th.bing.com/th/id/R.20d3e94846b0317ba981e9b4d3ecdabb?rik=wRXoSyZgG3cbIA&pid=ImgRaw&r=0"/>
                    <img className={ProductDetailsStyle.secondaryImage}
                         src="https://th.bing.com/th/id/R.20d3e94846b0317ba981e9b4d3ecdabb?rik=wRXoSyZgG3cbIA&pid=ImgRaw&r=0"/>
                </div>
                <img className={ProductDetailsStyle.primaryImage} src="https://th.bing.com/th/id/R.20d3e94846b0317ba981e9b4d3ecdabb?rik=wRXoSyZgG3cbIA&pid=ImgRaw&r=0"/>
            </section>
            <section style={{
                paddingTop: "12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                gap: "16px",
                height: "inherit"
            }}>
                <h1 style={{color: "#000"}}>Product Name</h1>
                <RatingSelector rating={2.5}></RatingSelector>
                <label style={{
                    fontSize: "20px",
                    fontWeight: "600",
                }}>$ 160.00</label>
                <p>
                    This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.
                </p>
                <hr/>
                <h4>Select color</h4>
                <ChipSelector options={["Hola", "mundo"]}></ChipSelector>
                <hr/>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        alignContent: "center",
                        flexWrap: "wrap",
                }}>
                    <QuantitySelector></QuantitySelector>
                    <button
                        style={{
                            paddingTop: "14px",
                            paddingBottom: "14px",
                            width: "15vw",
                            minWidth: "144px",
                            borderRadius: "24px",
                            backgroundColor: "#7790ED",
                            color: "white",
                            fontSize: "16px"
                        }}
                    >Add to cart</button>
                    <div>
                        {isFavorite && <MdFavorite
                            color="#FF0000"
                            onClick={() => setIsFavorite(!isFavorite)}
                            size={32}
                        ></MdFavorite>}
                        {!isFavorite && <MdFavoriteBorder
                            color="#FF0000"
                            onClick={() => setIsFavorite(!isFavorite)}
                            size={32}
                        ></MdFavoriteBorder>}
                    </div>
                </div>
            </section>
        </div>
    )
}