import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Form, Input, Button, message } from "antd";
import { addProduct } from "../../../store/slices/productsSlice";
import { AppDispatch } from "../../../store";
import { Product } from "../../../types/products";

import "./style.scss";

const NewProduct = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const handleSaveProduct = (values: any) => {
        const newProduct: Product = {
            id: Math.floor(Math.random() * 1000),
            title: values.title,
            description: values.description,
            price: values.price,
            image: values.image,
            isFavorite: false,
        };

        dispatch(addProduct(newProduct));
        message.success('Товар добавлен успешно!');
        form.resetFields();
        navigate('/products');
    };

    return (
        <div className="new-product">
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSaveProduct}
                initialValues={{ id: 0, title: '', description: '', price: '', image: '' }}
                className="new-product__form"
            >
                <h1 className="new-product__form__title">Новый товар</h1>
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
                <div className="new-product__form__additional-fields">
                    <Form.Item
                        name="price"
                        label="Стоимость"
                        rules={[{ required: true, message: 'Стоимость товара' }]}
                        className="new-product__form__additional-fields__field"
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="image"
                        label="Изображение товара (URL)"
                        rules={[{ required: true, message: 'Добавьте ссылку на изображение товара' }]}
                        className="new-product__form__additional-fields__field"
                    > 
                        <Input type="url" />
                    </Form.Item>
                </div>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Добавить товар
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default NewProduct;