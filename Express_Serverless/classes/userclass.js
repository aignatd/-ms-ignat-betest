const db = require("../models/conmodel");
const user = db.user;
module.exports = class userdata {
	constructor(req) {
		this.body = req.body;
	}

	async getuser(query) {
		console.log('Param 1 ->', query.field)
		console.log('Param 2 ->', query.id)

		if (query.field.toLowerCase() == "all")
			return await user.find();
		else
			return await user.find({ [query.field]: query.id });
	}

	async newuser() {
		console.log('Body ->', this.body)
		return await user.create(this.body);
	}

	async updateuser(query) {
		console.log('Body ->', this.body)
		console.log('Param 1 ->', query.field)
		console.log('Param 2 ->', query.id)

		await user.findOneAndUpdate({ [query.field]: query.id }, this.body, { upsert: false, useFindAndModify: false })
			.then(() => { return null })
			.catch(err => { return err });
	}

	async deleteuser(query) {
		console.log('Param 1 ->', query.field)
		console.log('Param 2 ->', query.id)

		return await user.findOneAndDelete({ [query.field]: query.id }, { upsert: false, useFindAndModify: false });
	}
}
