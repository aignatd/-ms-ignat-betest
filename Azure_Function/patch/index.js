const db = require("../models/conmodel");
const user = db.user;

const auth = require("../token/authctrl");

let client = null;
module.exports = async function (context, req) {
  context.log('---------- Check Token ----------');
  const { code, response } = await auth.checktoken(req.headers, context);

  context.log('Result ->', response);

  if (code != 0) {
    await context.res.status(code).json(response);
    return context.close();
  };

  context.log('---------- Update User ----------');
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

  const result = await user.findOneAndUpdate({ [req.params.field]: req.params.id }, req.body, { upsert: false, useFindAndModify: false });
  context.log("Result ->", result);

  if (result == null)
    await context.res.status(500).json(
      {
        code: 1002,
        msg: "User data not updated"
      });
  else
    await context.res.status(200).json(
      {
        code: 0,
        msg: "User data updated"
      });
}