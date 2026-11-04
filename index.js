require('dotenv').config();
const express = require('express')
const app = express()                       
const port = process.env.PORT || 3000;
const addRoutes = require('./route');

app.use(express.json());                    

addRoutes(app);

app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();   // hadd válaszoljon rá az Express magától
    }
    res.status(404).json({
        error: 'Not found',
        method: req.method,
        path: req.originalUrl
    });
});

app.listen(port, function () { 
    console.log(`Server running on http://localhost:${port}`);
});