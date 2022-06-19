const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

dotenv.config({ path: "./config.env" });
require("./db/conn");
const User = require("./model/userScheme");
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/appoint", async (req, res) => {
  const { name, email, phone, date } = req.body;

  if (!name || !email || !phone || !date) {
    return res.status(422).json({ error: "please fill the field" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already appointed" });
    }

    const user = new User({ name, email, phone, date });

    await user.save();
    res.status(201).json({ message: "user Appointed sucessfully" });
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`server is listening ON ${PORT}`);
});
