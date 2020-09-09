const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

module.exports = new WooCommerceRestApi({
    url: 'https://grafiskekurser.dk/',
    consumerKey: process.env.WOO_CONSUMER_KEY,
    consumerSecret: process.env.WOO_CONSUMER_SECRET,
    version: 'wc/v3'
})