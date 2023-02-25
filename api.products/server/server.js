import express from 'express';

import connection from './db/connection.js';

const app = express();
const PORT = 5002;

app.get('/api/products', (req, res) => {
    connection.query(
        'SELECT ProductID, ProductName, ProductPhotoURL ' +
        'FROM Product ' +
        'WHERE ProductStatus <> "InActive" ' +
        'ORDER BY ProductID ASC;',
        (error, data) => {
            if (error) {
                console.error(error);
                res.sendStatus(500);
            } else {
                res.status(200).json({ data });
            }
        },
    );
})

app.listen(PORT, () => {
    console.log(`api.orders is listening on port ${PORT}`);
})