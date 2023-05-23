import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "inputs empty!",
    });
  }
  let userData = await userService.handleUserLogin(email, password);
  console.log(userData);

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    // userData,
    user: userData.user ? userData.user : {},
  });
};

let handleGetAllUsers = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      user: [],
    });
  }
  let users = await userService.getAllUsers(id);
  console.log(users);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users,
  });
};

let handleCreateNewAccount = async (req, res) => {
  // let name = req.body.name;
  // let phonenumber = req.body.phonenumber;
  // let email = req.body.email;
  // let password = req.body.password;
  // if (!email || !password || !name || !phonenumber) {
  //   return res.status(500).json({
  //     errCode: 1,
  //     message: "inputs empty!",
  //   });
  // }
  let userData = await userService.createNewAccount(req.body);
  // console.log(message);
  return res.status(200).json({
    message: userData.errMessage,
  });
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewAccount: handleCreateNewAccount,
};
