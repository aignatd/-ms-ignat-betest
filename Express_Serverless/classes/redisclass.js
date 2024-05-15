const redisConfig = require("../config/rediscon");
const redisClient = require('ioredis').createClient({
		host: redisConfig.host,
		port: redisConfig.port,
		username: '',
		password: ''
	});

module.exports = class redis {
	constructor(redisKey) {
		this.redisKey = redisKey;
	}

	async get() {
		return await redisClient.get(this.redisKey);
	}

	async set(value) {
		return await redisClient.set(this.redisKey, value);
	}

	async delete() {
		return await redisClient.del(this.redisKey);
	}
}