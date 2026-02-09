const idGenerator = require('./idGenerator.services');
const urlModel = require('../model/url.model');

const ShortenService = async (url) => {
    const existingUrl = await urlModel.findOne({ longUrl: url });
    if (existingUrl) return existingUrl.shortCode;

    const id = await idGenerator();   // no param

    await urlModel.create({
        longUrl: url,
        shortCode: id,
    });

    return id;
};

module.exports = ShortenService;
