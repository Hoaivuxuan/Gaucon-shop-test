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
          attributes: ["email", "roleId", "address", "password", "name"],
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
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let check = await checkUserEmail(data.email);
      if (check === true) {
        // resolve({
        //   errCode: 1,
        //   userData.errMessage =  "Email đã tồn tại!",
        // });
        userData.errMessage = "Email đã tồn tại!";
      }
      else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          name: data.name,
          phonenumber: data.phonenumber,
          address: data.address,
          roleId: data.roleId === "1" ? true : false,
        });

        resolve(userData);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewAccount: createNewAccount,
};
