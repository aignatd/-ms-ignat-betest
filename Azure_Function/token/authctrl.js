const jwt = require('jsonwebtoken');
const values = require("../config/jwtcon");

let checktoken = async (dataToken, context) => {
	try {
		let response;

		if (dataToken.authorization) {
			const header = dataToken.authorization || '';
			const token = header.split(/\s+/).pop();
			console.log('Token data ->', token);

			const decoded = await jwt.verify(token, values.jwtkey);
			console.log("Result ->", decoded);
			return await { code: 0, response: null };
		}
		else {
			context.log("Failed -> Missing token data");

			response = {
				code: 2004,
				msg: "Token not found"
			};

			return await { code: 403, response };
		}
	} catch (err) {
		context.log('Error ->', err.toString());

		if (err?.name === "TokenExpiredError") {
			response = {
				code: 2001,
				msg: "Token has expired"
			};

			return await { code: 401, response };
		}
		else
		if (err?.name === "JsonWebTokenError") {
			response = {
				code: 2002,
				msg: "The token is not valid"
			};

			return await { code: 403, response };
		}
		else {
			response = {
				code: 2003,
				msg: "Check existing token"
			};

			return await { code: 400, response };
		}
	}
};

module.exports = {
	checktoken
}
