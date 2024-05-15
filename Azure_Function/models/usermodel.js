module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      userName: String,
      accountNumber: Number,
      emailAddress: String,
      identityNumber: Number
    },
    {
      timestamps: true
    }
  );

  schema.method("toJSON", function() {
    const { __v, _id, createdAt, updatedAt, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("user", schema);
}