import React from 'react';
import {Product} from "../interfaces";

export default function ProductItem (product: Product) {
    return (
        <div
            className="flex flex-col w-80 justify-center bg-white p-2 m-4 hover:scale-105 transition-transform"
        >
            <img
                src={product.ProductPhotoURL}
                alt={product.ProductName}
                className="w-full object-cover h-80"
            />
            <h2
                className="text-black text-2xl font-bold text-center pt-4 pb-4"
            >
                {product.ProductName} - {product.ProductID}
            </h2>
        </div>
    );
}