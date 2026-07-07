const db = require("../config/db");

const getAllValues = async (req, res) => {
  const values = await db.query("SELECT * FROM numbers");
  res.send(values);
};

const addValue = async (req, res) => {
  const { value } = req.body;

  if (!value) {
    return res.send({ working: false });
  }

  await db.query("INSERT INTO numbers(number) VALUES($1)", [value]);
  res.send({ working: true });
};

module.exports = {
  getAllValues,
  addValue,
};
