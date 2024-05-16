const db = require("../models/conmodel");
const user = db.user;

let client = null;
module.exports = async function (context, req) {
  context.log('---------- Delete User ----------');
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

  const result = await user.findOneAndDelete({ [req.params.field]: req.params.id }, { upsert: false, useFindAndModify: false });
  context.log("Result ->", result);

  if (result == null)
    await context.res.status(404).json({
      code: 1003,
      msg: "User data not found"
    });
  else
    await context.res.status(200).json(
      {
        code: 0,
        msg: "User data deleted"
      });
}