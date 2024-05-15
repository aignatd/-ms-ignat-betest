const redisclass = require('../classes/redisclass');
const redisconfig = require('../config/rediscon');

let checkcachectrl = async (req, res, next) => {
	try {
		console.log("---------- Check Cache ----------");
		const result = await new redisclass(`${redisconfig.key}-${req.params.field}-${req.params.id}`).get();
		console.log("Load cache ->", result);

		if (result)
			res.status(200).json(JSON.parse(result));
		else
			next();

	} catch (err) {
		console.log(err.toString());
		res.status(500).json({
			code: 3000,
			msg: err
		});
	}
};

let savecachectrl = async (req, res) => {
	try {
		console.log("---------- Save Cache ----------");
		const resp = {
			code: 0,
			msg: "User data found",
			data: req.result
		};

		const result = await new redisclass(`${redisconfig.key}-${req.params.field}-${req.params.id}`).set(JSON.stringify(resp));
		console.log("Save cache ->", result);

		res.status(200).json(resp);

	} catch (err) {
		console.log(err.toString());
		res.status(500).json({
			code: 3000,
			msg: err
		});
	}
};

let deletecachectrl = async (req, res) => {
	try {
		console.log("---------- Delete Cache ----------");
		const result = await new redisclass(`${redisconfig.key}-${req.params.field}-${req.params.id}`).delete();
		console.log("Delete cache ->", result);

		res.status(200).json(req.result);
	} catch (err) {
		console.log(err.toString());
		res.status(500).json({
			code: 3000,
			msg: err
		});
	}
};

module.exports = {
	checkcachectrl, savecachectrl, deletecachectrl
}
