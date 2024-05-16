const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');

const db = require("../models/conmodel");
const user = db.user;

const values = require("../config/jwtcon");

let client = null;
module.exports = async function (context, req) {
  context.log('---------- Get Token ----------');
  context.log('Header ->', req?.headers?.authorization);
  context.log('Body ->', req?.body);

  let username = "";
  let password = "";

  if (req.headers.authorization && req.headers.authorization.indexOf('Basic ') >= 0 && req.body === 'grant_type=client_credentials') {
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    [username, password] = credentials.split(':');
  }

  if (username && password) {
    const currdatetime = moment.utc().format("YYYY-MM-DDTHH:mm:ss");
    const lastdatetime = moment.utc().add(values.expTime, values.expUnit).format("YYYY-MM-DDTHH:mm:ss") + 'Z';

    let dataJWT =
    {
      "clientID": username ? username : '',
      "clientSecret": password ? password : '',
      "created": currdatetime ? currdatetime : '',
      "expired": lastdatetime ? lastdatetime : '',
      "scope": values.scope,
      "tokenRSN": uuidv4() ? uuidv4() : ''
    };

    console.log('Data to process ->', dataJWT);

    let Options =
    {
      "algorithm": values.algorithm,
      "jwtid": values.jwtid,
      "noTimestamp": false,
      "expiresIn": `${values.expTime}${values.expUnit}`
    };

    console.log('Data option ->', Options);

    console.log('---------- Create Token Result ----------');

    const token = await jwt.sign(dataJWT, values.jwtkey, Options);
    console.log("Token ->", token);

    await context.res.status(200).json(
      {
        code: 0,
        msg: "Token generated successfully",
        data: {
          "tokenExpiry": lastdatetime,
          "tokenData": token,
          "tokenType": "bearer"
        }
      });
  }
  else
    await context.res.status(401).json(
      {
        code: 2000,
        msg: "You are not authorized"
      });
}