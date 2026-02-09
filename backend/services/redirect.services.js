const Url = require('../model/url.model');
const { redisClient } = require('../config/redis');

const CACHE_TTL = 60 * 60 * 24; // 24 hours

const redirectService = async (shortCode) => {
  const cacheKey = `url:${shortCode}`;

  const cachedUrl = await redisClient.get(cacheKey);
  if (cachedUrl) return cachedUrl;

  const urlDoc = await Url.findOne({ shortCode }).lean();
  if (!urlDoc) return null;

  await redisClient.set(cacheKey, urlDoc.longUrl, {
    EX: CACHE_TTL
  });

  return urlDoc.longUrl;
};

module.exports = redirectService;
