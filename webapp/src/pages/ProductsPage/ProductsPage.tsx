import React, { useState, useEffect } from "react";

import { getProductsData } from '../ApiHelper';
import { Product } from '../../components/interfaces';
import PageWrapper from '../PageWrapper';
import Spinner from "../../components/Spinner/Spinner";
import ProductItem from "../../components/ProductItem/ProductItem";

const DATA_STATES = {
    waiting: 'WAITING',
    loaded: 'LOADED',
    error: 'ERROR'
};

const ProductsPage = () => {
  /*
    TODO:
      When the drag ends we want to keep the status persistent across logins.
      Instead of modifying the data locally we want to do it serverside via a post
      request
  */
    const [loadingState, setLoadingState] = useState(DATA_STATES.waiting);
    const [products, setProducts] = useState([] as Product[]);

    const getProducts = async () => {
        setLoadingState(DATA_STATES.waiting);

        const { productsData, errorOccurred } = await getProductsData();

        setProducts(productsData);
        setLoadingState(errorOccurred ? DATA_STATES.error : DATA_STATES.loaded);
    };

    useEffect(() => {
        getProducts();
    }, []);

    let content;

    if (loadingState === DATA_STATES.waiting) {
        content = (
            <div
                className="flex flex-row justify-center w-full pt-4"
                data-testid="loading-spinner-container"
            >
                <Spinner />
            </div>
        );
    } else if (loadingState === DATA_STATES.loaded) {
        content = (
            <div
                className="flex flex-row flex-wrap justify-start w-full pt-16"
                data-testid="products-container"
            >
                {products.map((product: Product) => (
                    <ProductItem key={product.ProductID} {...product} />
                ))}
            </div>
        );
    } else {
        content = (
            <div
                className="flex flex-row justify-center w-full pt-4 text-3xl font-bold text-white"
                data-testid="error-container"
            >
                An error occurred fetching the data!
            </div>
        );
    }


    return (
        <PageWrapper>
            { content }
        </PageWrapper>
    );
};

export default ProductsPage;
