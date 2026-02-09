const { redisClient } = require('../config/redis');

const BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function encodeBase62(num) {
  let result = "";
  while (num > 0) {
    result = BASE62[num % 62] + result;
    num = Math.floor(num / 62);
  }
  return result;
}

const generateShortCode = async () => {
  const id = await redisClient.incr('global:url:id'); // atomic 
  return encodeBase62(id);
};

module.exports = generateShortCode;
