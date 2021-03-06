const express = require('express');
const router = express.Router();
const UrlVerifier = require('../util/UrlVerifier');
const ParsingUtil = require('../util/ParsingUtil');

router.get('/productLinks', (req, res) => {
    const url = decodeURIComponent(req.query.url);

    console.log('scraping url: ' + url);

    if (!UrlVerifier.isSearchResultPageUrl(url)) {
        res.status(400).end();
        return;
    }

    ParsingUtil.extractProductDetailPageUrls(url)
        .then((productDetailPageUrls) => {
            res.send(productDetailPageUrls);
        })
        .catch((error) => {
            console.error('error during product detail page url scraping: ' + error);
            res.status(500).end();
        });
});

router.get('/productData', (req, res) => {
    const url = decodeURIComponent(req.query.url);

    console.log('scraping url: ' + url);

    if (!UrlVerifier.isProductDetailPageUrl(url)) {
        res.status(400).end();
        return;
    }

    ParsingUtil.extractProductData(url)
        .then((productData) => {
            res.send(productData);
        })
        .catch((error) => {
            console.error('error during product data scraping: ' + error);
            res.status(500).end();
        });
});

module.exports = router;
