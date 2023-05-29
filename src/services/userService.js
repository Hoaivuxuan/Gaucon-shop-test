import db from "../models/index";
import bcrypt, { compare } from "bcryptjs";
//
const salt = bcrypt.genSaltSync(10);
//
let hashUserPassword = async (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        // user exist
        // compare password
        let user = await db.User.findOne({
          attributes: [
            "id",
            "email",
            "roleId",
            "address",
            "password",
            "name",
            "phonenumber",
          ],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          // let check = true;
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "Login succeed!";
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "The password you enter is incorrect.";
          }
          // resolve(user.password)
        } else {
          userData.errCode = 2;
          userData.errMessage = `User's not found!`;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `The email address you entered is incorrect.`;
      }

      resolve(userData); // resolve ~ return
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });

      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewAccount = (data) => {
  // return new Promise(async (resolve, reject) => {
  //   try {
  //     let userData = {};
  //     let check = await checkUserEmail(data.email);
  //     if (check === true) {
  //       // resolve({
  //       //   errCode: 1,
  //       //   userData.errMessage =  "Email đã tồn tại!",
  //       // });
  //       userData.errMessage = "Email đã tồn tại!";
  //     } else {
  //       let hashPasswordFromBcrypt = await hashUserPassword(data.password);
  //       await db.User.create({
  //         email: data.email,
  //         password: hashPasswordFromBcrypt,
  //         name: data.name,
  //         phonenumber: data.phonenumber,
  //         address: data.address,
  //         roleId: data.roleId === "1" ? true : false,
  //       });

  //       resolve(userData);
  //     }
  //   } catch (e) {
  //     reject(e);
  //   }
  // });
  //
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        return resolve({
          errCode: 1,
          errMessage: "Missing input value!",
        });
      }
      if (!data.name || !data.email || !data.password) {
        return resolve({
          errCode: 1,
          errMessage: "Missing input value!",
        });
      }
      let check = await checkUserEmail(data.email);
      if (check) {
        return resolve({
          errCode: 2,
          errMessage: "Your email is already in use",
        });
      }
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      if (!data.id) {
        data.id = 3;
      }
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        name: data.name,
        phonenumber: data.phonenumber,
        address: data.address,
        roleId: data.roleId === "1" ? true : false,
      });
      return resolve({
        errCode: 0,
        message: "Create account successfully!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let updateAccountData = (data) => {
  //
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing input parameter",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (!user) {
        resolve({
          errCode: 2,
          errMessage: "Account not found!",
        });
      }
      user.id = data.id ? data.id : user.id;
      user.name = data.name ? data.name : user.name;
      user.address = data.address ? data.address : user.address;
      user.phonenumber = data.phonenumber ? data.phonenumber : user.phonenumber;
      //
      user.save();
      // let accounts = await db.Account.findAll();
      resolve({
        errCode: 0,
        message: "Update Account Successfully!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewAccount: createNewAccount,
  updateAccountData: updateAccountData,
};
