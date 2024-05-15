const db = require("../models/conmodel");
const user = db.user;

let client = null;
module.exports = async function (context, req) {
  context.log('---------- Get User ----------');
  context.log('Parameter ->', req.params);

  await client != null;

  if (client == null) {
    const conn = await db.mongoose.connect(db.url);

    if (conn == null) {
      console.log("Can't connect to database");

      await context.res.status(500).json({
        code: 3000,
        msg: "Can't connect to database"
      });

      return await context.done();
    }

    client = conn;
    context.log('Database connected');
  }

  let result;

  if (req.params.field.toLowerCase() == "all")
    result = await user.find();
  else
    result = await user.find({ [req.params.field]: req.params.id });

  context.log("Result ->", result);

  if (result.length >= 1)
    await context.res.status(200).json({
      code: 0,
      msg: "User data found",
      data: result
    });
  else
    await context.res.status(404).json(
      {
        code: 1000,
        msg: "User data not found",
        data: result
      });

  return await context.done();
}