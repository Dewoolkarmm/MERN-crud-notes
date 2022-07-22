const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//All controllers
const RegisterUser = async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  try {
    if (!email || !password || !firstname || !lastname) {
      return res.status(422).json({ message: "Field are Empty" });
    }
    const olduser = await userModel.findOne({ email: email });
    if (olduser) {
      res
        .status(422)
        .json({ message: "User Already Exist... try with new email." });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      email: email,
      password: hashpassword,
      firstname: firstname,
      lastname: lastname,
    });

    await user.save();

    //generate the token
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.SECRET_KEY
    );
    res
      .status(201)
      .json({ user: user, token: token, message: "User Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(422).json({ message: "Error Occured.." });
  }
};

//login Route
const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ massege: "Fill required data ..." });
    }
    const userExist = await userModel.findOne({ email: email });
    if (!userExist) {
      res.status(422).json({ message: "User not present for this email ..." });
    }
    //password matching

    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      return res.status(422).json({ message: "Invalid Credentials.." });
    }
    //

    const token = jwt.sign(
      { email: userExist.email, id: userExist._id },
      process.env.SECRET_KEY
    );
    res
      .status(201)
      .json({ user: userExist, token: token, message: "Login Successful..." });
  } catch (error) {
    console.log(error);
    res.status(201).json({ message: "Error Occured..." });
  }
};
const ShowAllUser = async (req, res) => {
  try {
    const data = await userModel.find();
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

const SingleUser = async (req, res) => {
  try {
    const data = await userModel.findOne({ _id: req.params.id });
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

const UpadateUser = async (req, res) => {
  try {
    const data = await userModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

const DeleteUser = async (req, res) => {
  try {
    await userModel.deleteOne({ _id: req.params.id });
    res.status(201).json({ message: "User deleted with success" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  RegisterUser,
  LoginUser,
  ShowAllUser,
  SingleUser,
  UpadateUser,
  DeleteUser,
};
