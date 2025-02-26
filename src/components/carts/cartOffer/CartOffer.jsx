import React, {useContext, useState} from 'react';
import cl from "./CartOffer.module.scss";
import img from "../../../assets/img/Products/Rectangle 491-2.png";
import LoveSVG from "../../SVG/LoveSVG";
import {Context} from "../../../index";
import LoveFillSVG from "../../SVG/LoveFillSVG";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";

const CartOffer = ({product, ...props}) => {

    const {Favorites} = useContext(Context)
    const {Auth} = useContext(Context)

    const initValue = Boolean(Favorites.products.find((item) => item.id === product.id))

    const [isFavorite, setFavorite] = useState(initValue)

    const navigate = useNavigate()

    const [images, setImages] = useState(product.product_colors)
    const [currentImage, setCurrentImage] = useState(0)

    return (
        <div
            className={cl.cart}
            onClick={() => navigate(`/products/${product.id}`)}
            onMouseOut={() => setCurrentImage(0)}
        >
            <div className={cl.imagesWrap}>
                <div className={cl.images} style={{gridTemplateColumns: `repeat(${product.product_colors.length}, 1fr)`}}>
                    {product.product_colors.map((color, index) =>
                        <div onMouseOver={() => setCurrentImage(index)} key={color.id} className={cl.imageWrap}>
                            <div className={cl.indicator}></div>
                        </div>
                    )}
                </div>
                <img src={images[currentImage].image} className={cl.image}/>
            </div>

            {product.discount ?
                <>
                    <div className={cl.triangle}></div>
                    <span className={cl.sale}>{product.discount}%</span>
                </>
                :
                null
            }

            {Auth.isAuth ?
                isFavorite ?
                <div
                    onClick={(e) => {
                        e.stopPropagation()
                        Favorites.delete(Auth.db, product)
                        setFavorite(false)
                    }}
                    className={cl.icon}
                >
                        <LoveFillSVG/>
                    </div>
                    :
                    <div
                        onClick={(e) => {
                            e.stopPropagation()
                            Favorites.add(Auth.db, product, Auth.user.uid)
                            setFavorite(true)
                        }}
                        className={cl.icon}
                    >
                        <LoveSVG
                            className={cl.love}
                        />
                </div>
                :
                null
            }

            <div className={cl.info}>
                <div className={cl.sum}>
                    <span className={cl.old}>{product.price}</span>
                    <span className={cl.new}>{product.price - (product.price * (product.discount / 100))}</span>
                </div>
                <h4 className={cl.title}>{product.name}</h4>
                <div className={cl.sizes}>
                    <span className={cl.size}>Размер:</span>
                    <span className={cl.sizeNumber}>{product.size}</span>
                </div>
                <div className={cl.colors}>
                    {product.product_colors.map((color) =>
                        <div className={cl.color} key={color.id} style={{backgroundColor: color.rgb}}></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default observer(CartOffer);