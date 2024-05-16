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

  context.log('---------- New User ----------');
  context.log('Body ->', req.body);

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

  try {
    const result = await user.create(req.body);
    context.log("Result ->", result);

    if (result)
      await context.res.status(200).json(
        {
          code: 0,
          msg: "User data saved"
        });
    else
      await context.res.status(500).json(
        {
          code: 1001,
          msg: "User data not saved",
          data: result
        });
  }
  catch (err) {
    console.log(err.toString());

    if (err?.errorResponse && err.errorResponse?.code == 11000) {
      console.log("Error ->", err.errorResponse);

      const rsp = err.errorResponse.errmsg.split(":");

      await context.res.status(400).json({
        code: 3001,
        msg: rsp[2]
      });
    }
    else
      await context.res.status(500).json({
        code: 3000,
        msg: err.toString()
      });
  }
}