import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Button, Switch, Input, Select } from "antd";
import { useNavigate } from "react-router";

import ProductCard from "./product-card/ProductCard";
import { setProducts } from "../../store/slices/productsSlice";
import { setPageNumber } from "../../store/slices/sliderSlice";
import { setIsShowFavorites } from "../../store/slices/favoritesSlice";
import { Product } from "../../types/products";
import NoProductsImage from "../../media/images/no_products.png";

import "./style.scss";
import { AppDispatch, RootState } from "../../store";

const { Option } = Select;

const Products = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<'ascend' | 'descend'>('ascend');
    const [sortType, setSortType] = useState<'price' | 'alphabet'>('price');

    const products = useSelector((state: RootState) => state.productsList.productsList);
    const currentPage = useSelector((state: RootState) => state.slider.pageNumber);
    const isShowFavorites = useSelector((state: RootState) => state.favorites.isShowFavorites);
    const itemsPerPage = 3;

    useEffect(() => {
        if (products.length === 0) {
            const fetchData = async () => {
                try {
                    const response = await axios.get('https://fakestoreapi.com/products');
                    let data: Product[] = await response.data;

                    data = data.map(product => ({
                        ...product,
                        isFavorite: false
                    }));

                    dispatch(setProducts(data));
                } catch (error) {
                    console.error('Ошибка при загрузке данных:', error);
                }
            };

            fetchData();
        }
    }, [dispatch, products.length]);

    useEffect(() => {
        console.log('products', products);
    }, [products]);

    const filteredProducts = useMemo(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = products
            .filter(product => 
                (isShowFavorites ? product.isFavorite : true) &&
                product.title.toLowerCase().includes(lowercasedQuery)
            );

        return filtered.sort((a, b) => {
            if (sortType === 'price') {
                return sortOrder === 'ascend' ? a.price - b.price : b.price - a.price;
            } else {
                return sortOrder === 'ascend'
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title);
            }
        });
    }, [isShowFavorites, products, searchQuery, sortOrder, sortType]);

    const currentProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredProducts.slice(startIndex, endIndex);
    }, [currentPage, filteredProducts, itemsPerPage]);

    const handlePageChange = (page: number) => {
        dispatch(setPageNumber({ pageNumber: page }));
    };

    const handleToggleFavorites = () => {
        dispatch(setIsShowFavorites({ isShowFavorites: !isShowFavorites }));
        dispatch(setPageNumber({ pageNumber: 1 }));
    };

    const handleSortOrderChange = (value: 'ascend' | 'descend') => {
        setSortOrder(value);
    };

    const handleSortTypeChange = (value: 'price' | 'alphabet') => {
        setSortType(value);
    };

    return (
        <div className="products">
            <h1 className="products__title">Товары</h1>
            <div className="products__upper-actions">
                <div className="products__upper-actions__field">
                    <Button type="default" onClick={() => navigate('/create-product')}>Новый товар</Button>
                </div>
                <div className="products__upper-actions__field">
                    Показать избранное
                    <Switch 
                        checked={isShowFavorites}
                        onClick={handleToggleFavorites}
                        style={{ marginLeft: '10px' }}
                    />
                </div>
            </div>
            <div className="products__filters">
                <div className="products__filters__field">
                    <span>Сортировать по:</span>
                    <Select
                        value={sortType}
                        onChange={handleSortTypeChange}
                        style={{ width: '200px', marginLeft: '10px' }}
                    >
                        <Option value="price">Цене</Option>
                        <Option value="alphabet">Алфавиту</Option>
                    </Select>
                </div>
                <div className="products__filters__field">
                    <span>Порядок:</span>
                    <Select
                        value={sortOrder}
                        onChange={handleSortOrderChange}
                        style={{ width: '200px', marginLeft: '10px' }}
                    >
                        <Option value="ascend">По возрастанию</Option>
                        <Option value="descend">По убыванию</Option>
                    </Select>
                </div>
            </div>
            <div className="products__search">
                <Input
                    placeholder="Поиск товаров"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </div>
            {filteredProducts.length === 0 ? (
                <div className="products-list">
                    <img src={NoProductsImage} alt="Товары отсутствуют" />
                </div>
            ) : (
                <div className="products__list">
                    {currentProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
            <Pagination
                current={currentPage}
                total={filteredProducts.length}
                pageSize={itemsPerPage}
                onChange={handlePageChange}
                showSizeChanger={false}
                style={{ marginTop: '20px' }}
            />
        </div>
    );
};

export default Products;
