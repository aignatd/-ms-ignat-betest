/*
 Navicat Premium Data Transfer

 Source Server         : Jenius
 Source Server Type    : MongoDB
 Source Server Version : 70009
 Source Host           : localhost:27017
 Source Schema         : db_ignat_betest

 Target Server Type    : MongoDB
 Target Server Version : 70009
 File Encoding         : 65001

 Date: 15/05/2024 21:44:15
*/


// ----------------------------
// Collection structure for users
// ----------------------------
db.getCollection("users").drop();
db.createCollection("users");
db.getCollection("users").createIndex({
    accountNumber: NumberInt("1")
}, {
    name: "accountNumber",
    unique: true
});
db.getCollection("users").createIndex({
    identityNumber: NumberInt("1")
}, {
    name: "identityNumber",
    unique: true
});

// ----------------------------
// Documents of users
// ----------------------------
db.getCollection("users").insert([ {
    _id: ObjectId("66437b04bc9f20bae3351bb7"),
    userName: "aignatd1",
    accountNumber: NumberInt("12345"),
    emailAddress: "ignat@hotmail.com",
    identityNumber: NumberInt("56789"),
    createdAt: ISODate("2024-05-14T14:53:56Z"),
    updatedAt: ISODate("2024-05-14T14:53:56Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("66440a49e5c20f496cc9a054"),
    userName: "aignatd2",
    accountNumber: NumberInt("123456"),
    emailAddress: "ignat@hotmail.com",
    identityNumber: NumberInt("567890"),
    createdAt: ISODate("2024-05-15T01:05:13Z"),
    updatedAt: ISODate("2024-05-15T01:05:13Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("6644137b6da13d5b80158389"),
    userName: "aignatd",
    accountNumber: NumberInt("123499"),
    emailAddress: "ignat@hotmail.com",
    identityNumber: NumberInt("567899"),
    createdAt: ISODate("2024-05-15T01:44:27Z"),
    updatedAt: ISODate("2024-05-15T01:44:27Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("6644c368e3ed8b772b74cf35"),
    userName: "aignatd3",
    accountNumber: NumberInt("1234"),
    emailAddress: "ignat@hotmail.com",
    identityNumber: NumberInt("5678"),
    createdAt: ISODate("2024-05-15T14:15:04Z"),
    updatedAt: ISODate("2024-05-15T14:15:04Z"),
    __v: NumberInt("0")
} ]);
