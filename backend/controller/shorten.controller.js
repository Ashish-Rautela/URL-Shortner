const shortenService = require('../services/url.services');

const shortenController = async (req, res) => {
    try {
        const { url } = req.body;

        const id = await shortenService(url);
        res.status(200).json({
            shortUrl: `${process.env.BASE_URL}/url/${id}`
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }

};

module.exports = shortenController;
