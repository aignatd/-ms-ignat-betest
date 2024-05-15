const userclass = require('../classes/userclass');

let getuserctrl = async (req, res, next) => {
	try {
		console.log("---------- Get User ----------");

		const result = await new userclass(req).getuser(req.params);
		console.log("Result ->", result);

		if (result.length >= 1) {
			req.result = result;
			next();
		}
		else
			res.status(500).json(
				{
					code: 1000,
					msg: "User data not found",
					data: result
				});
	} catch (err) {
		console.log(err.toString());
		res.status(500).json({
			code: 3000,
			msg: err
		});
	}
};

let postuserctrl = async (req, res) => {
	try {
		console.log("---------- New User ----------");

		const result = await new userclass(req).newuser();

		console.log("Result ->", result);

		if (result)
			res.status(200).json(
				{
					code: 0,
					msg : "User data saved"
				});
		else
			res.status(400).json(
				{
					code: 1001,
					msg: "User data not saved",
					data : result
				});
	} catch (err) {
		console.log(err.toString());

		if (err?.errorResponse && err.errorResponse?.code == 11000) {
			console.log("Error ->", err.errorResponse);

			const rsp = err.errorResponse.errmsg.split(":");

			res.status(400).json({
				code: 3001,
				msg: rsp[2]
			});
		}
		else
			res.status(500).json({
				code: 3000,
				msg: err.stack
		});
	}
};

let patchuserctrl = async (req, res, next) => {
	try {
		console.log("---------- Update User ----------");

		const result = await new userclass(req).updateuser(req.params);
		console.log("Result ->", result);

		if (result == null) {
			req.result = {
				code: 0,
				msg: "User data updated"
			};

			next();
		}
		else
			res.status(500).json(
				{
					code: 1002,
					msg: "User data not updated",
					data: result.message
				});
	} catch (err) {
		console.log(err.toString());
		res.status(500).json({
			code: 3000,
			msg: err
		});
	}
};

let deleteuserctrl = async (req, res, next) => {
	try {
		console.log("---------- Delete User ----------");
		console.log("Parameter ->", req.params);

		const result = await new userclass(req).deleteuser(req.params);

		console.log("Result ->", result);

		if (result == null)
			res.status(500).json(
				{
					code: 1003,
					msg: "User data not found",
					data: result
				});
		else {
			req.result = {
				code: 0,
				msg: "User data deleted"
			};

			next();
		}
	} catch (err) {
		console.log(err.toString());
		res.status(500).json({
			code: 3000,
			msg: err
		});
	}
};

module.exports = {
	getuserctrl, postuserctrl, patchuserctrl, deleteuserctrl
}
