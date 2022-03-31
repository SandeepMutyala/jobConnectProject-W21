const User = require("../models/user");

const jwt = require("jsonwebtoken");
exports.registerUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(422).json({
      success: false,
      message: `User with this email ${email} already exist`,
    });
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  sendToken(user, 200, res);
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // Checks if email and password is entered by user
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter email & password",
    });
  }

  // Finding user in database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  // Checks if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return res.status(401).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  sendToken(user, 200, res);
};

exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(
      res.status(401).json({
        success: false,
        message: "Login first to access this resource.",
      })
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  next();
};

exports.getUserProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
};

exports.logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
};

const sendToken = (user, statusCode, res) => {
  // Create Jwt token
  const token = user.getJwtToken();

  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};
