import axios from "axios";
import { Order, OrderData, Product } from "../components/interfaces";

const INPIPELINE_URL = '/api/orders/inpipeline';

const getInPipelineData = async () => {
    const orderData: OrderData = {
      Queued: [],
      InProgress: [],
      QA: [],
    };
    let errorOccurred = false;
    try {
      const response = await axios.get(INPIPELINE_URL);
      if (response?.status === 200) {
        const { data } = response.data;
        data.forEach((order: Order) => {
          orderData[order.OrderStatus as keyof OrderData].push(order);
        });
      } else {
        const { message } = response.data;
        throw message;
      }
    } catch(err) {
      console.error(err);
      errorOccurred = true;
    }
    return { orderData, errorOccurred };
};

const UPDATE_STATUS_URL = '/api/orders/update_status';

const updateOrderStatus = async (order: Order, newOrderStatus: string) => {
    const updatedOrder = { ...order, OrderStatus: newOrderStatus };
    let orderStatusUpdated = false;
    try {
        const response = await axios.post(UPDATE_STATUS_URL, updatedOrder);
        if (response?.status === 200) orderStatusUpdated = true;
        else {
            const { message } = response.data;
            throw message;
        }
    } catch(err) {
        console.error(err);
    }
    return orderStatusUpdated;
};

const PRODUCTS_URL = '/api/products/';

const getProductsData = async () => {
    let errorOccurred = false;
    const productsData: Product[] = [];

    try {
        const response = await axios.get(PRODUCTS_URL);

        if (response?.status === 200) {
            const { data } = response.data;
            data.forEach((product: Product) => {
                productsData.push(product);
            });
        } else {
            const { message } = response.data;
            throw message;
        }
    } catch(err) {
        console.error(err);
        errorOccurred = true;
    }

    return { productsData, errorOccurred };
};

export {
    getInPipelineData,
    INPIPELINE_URL,
    updateOrderStatus,
    UPDATE_STATUS_URL,
    getProductsData,
    PRODUCTS_URL,
};