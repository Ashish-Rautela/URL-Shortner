const redirectService = require('../services/redirect.services');

const redirectController = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const longUrl = await redirectService(shortCode);

    if (!longUrl) {
      return res.status(404).json({ message: 'URL not found' });
    }

    return res.redirect(301, longUrl);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = redirectController;
