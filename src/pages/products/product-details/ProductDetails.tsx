import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectItemById } from "../../../store/slices/productsSlice";
import { Button } from "antd";
import DeleteIcon from "../../../media/icons/trash.svg";
import FavoriteIcon from "../../../media/icons/star.svg";

import "./style.scss";

const ProductDetails = () => {
    const productId = useSelector((state: any) => state.product.productId);
    const product = useSelector((state: any) => selectItemById(state, productId));

    useEffect(() => {
        console.log('product', product);
    }, [product]);

    const handleAddToFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        console.log('added to favorite');
    };

    const handleDeleteProduct = (e: React.MouseEvent) => {
        e.stopPropagation();
        console.log('deleted');
    };

    if (!product) {
        return (
            <div className="container">
                <div className="container__details">
                    Продукт не найден
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="container__title">
                Подробная информация о товаре
            </div>
            <div className="container__details">
                <div className="container__details__actions">
                    <div 
                        className="container__details__actions__favorite" 
                        data-tooltip="Добавить в избранное"
                        onClick={handleAddToFavorite}
                    >
                        <img src={FavoriteIcon} alt="В избранное" />
                    </div>
                    <div 
                        className="container__details__actions__delete"
                        data-tooltip="Удалить товар"
                        onClick={handleDeleteProduct}
                    >
                        <img src={DeleteIcon} alt="Удалить" />
                    </div>
                </div>
                <div className="container__details__image">
                    <img src={product.image} alt={product.title} />
                </div>
                <div className="container__details__title">{product.title}</div>
                <div className="container__details__description">{product.description}</div>
                <div className="container__details__price">{product.price}</div>
            </div>
            <div className="container__back">
                <Button type="primary" onClick={() => window.history.back()}>{`<<`} Назад</Button>
            </div>
        </div>
    );
};

export default ProductDetails;