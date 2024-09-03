import React from "react";
import { Form, Input, Button, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { selectItemById, updateProduct } from "../../../store/slices/productsSlice";
import { AppDispatch, RootState } from "../../../store"; // Типизация RootState
import { Product } from "../../../types/products";
import { useNavigate } from "react-router";

import "./style.scss";

const ProductEdit = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const productId = useSelector((state: RootState) => state.product.productId); // использование типизированного RootState
    const product = useSelector((state: RootState) => selectItemById(state, productId));
    const [form] = Form.useForm();

    const handleUpdateProduct = (values: Product) => {
        const updatedProduct = { ...values, id: product?.id }; // Добавляем id
        dispatch(updateProduct(updatedProduct));
        message.success('Товар обновлен успешно!');
        navigate('/products');
    };

    return (
        <div className="product-edit">
            <Form
                form={form}
                layout="vertical"
                onFinish={handleUpdateProduct}
                initialValues={{ 
                    title: product?.title, 
                    description: product?.description, 
                    price: product?.price, 
                    image: product?.image 
                }}
                className="product-edit__form"
            >
                <h1 className="product-edit__form__title">Редактирование товара</h1>
                <Form.Item
                    name="title"
                    label="Заголовок товара"
                    rules={[{ required: true, message: 'Введите заголовок товара' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Описание товара"
                    rules={[{ required: true, message: 'Добавьте описание товара' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <div className="product-edit__form__additional-fields">
                    <Form.Item
                        name="price"
                        label="Стоимость"
                        rules={[{ required: true, message: 'Стоимость товара' }]}
                        className="product-edit__form__additional-fields__field"
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="image"
                        label="Изображение товара (URL)"
                        rules={[{ required: true, message: 'Добавьте ссылку на изображение товара' }]}
                        className="product-edit__form__additional-fields__field"
                    > 
                        <Input type="url" />
                    </Form.Item>
                </div>
                <Form.Item className="product-edit__form__actions">
                    <Button type="primary" onClick={() => window.history.back()}>{`<<`} Назад</Button>
                    <Button type="primary" htmlType="submit" style={{ marginLeft: '30px' }}>
                        Обновить товар
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ProductEdit;
