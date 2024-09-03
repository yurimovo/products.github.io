import React from "react";
import { useNavigate } from "react-router";

import ProductsLogo from "../../media/images/products.png";

import "./style.scss";

const Main = () => {
    const navigate = useNavigate();
    return (
        <div className="main-page">
            <img src={ProductsLogo} alt="Продукты" onClick={() => navigate('/products')} />
        </div>
    );
};  

export default Main;