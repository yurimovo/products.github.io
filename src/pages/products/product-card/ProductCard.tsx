import React from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { Product } from "../../../types/products";
import { ReactComponent as FavoriteIcon } from "../../../media/icons/star.svg";
import DeleteIcon from "../../../media/icons/trash.svg";
import EditIcon from "../../../media/icons/edit.svg";
import { setProductId } from "../../../store/slices/oneProductSlice";
import { toggleFavorite, removeProduct } from "../../../store/slices/productsSlice";

import "./style.scss";

interface ProductCardProps {
    product: Product;
};

const ProductRow: React.FC<ProductCardProps> = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddToFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(toggleFavorite({ id: product.id }));
    };

    const handleDeleteProduct = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(removeProduct({ id: product.id }));
        console.log('deleted');
    };

    const handleSelectProduct = () => {
        dispatch(setProductId({ productId: product.id }));
        navigate(`/products/${product.id}`);
    };

    const handleEditProduct = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(setProductId({ productId: product.id }));
        navigate(`/products/${product.id}/edit`);
    };

    return (
        <div className="product-card" onClick={handleSelectProduct}>
            <div className="product-card__actions">
                <div 
                    className="product-card__actions__favorite" 
                    data-tooltip="Добавить в избранное"
                    onClick={handleAddToFavorite}
                >
                    <FavoriteIcon
                        style={{ fill: product.isFavorite ? 'gold' : '#dce3e8' }}
                        width={30}
                        height={30}
                    />
                </div>
                <div style={{ width: '70%' }}></div>
                <div 
                    className="product-card__actions__edit"
                    data-tooltip="Редактировать товар"
                    onClick={handleEditProduct}
                >
                    <img src={EditIcon} alt="Редактировать" />
                </div>
                <div 
                    className="product-card__actions__delete"
                    data-tooltip="Удалить товар"
                    onClick={handleDeleteProduct}
                >
                    <img src={DeleteIcon} alt="Удалить" />
                </div>
            </div>
            <div className="product-card__image">
                <img src={product.image} alt={product.title} />
            </div>
            <div className="product-card__info">
                <div className="product-card__info__title">{product.title}</div>
                <div className="product-card__info__description">{product.description}</div>
                <div className="product-card__info__price">{product.price}</div>
            </div>
        </div>
    )
};

export default ProductRow;