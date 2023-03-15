import db from "../models/index";
import bcrypt, { compare } from 'bcryptjs'
////
let handleUserLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if(isExist) {
                // user exist 
                // compare password
                let user = await db.User.findOne({
                    attributes: ['email', 'address', 'password'],
                    where: {email: email},
                    raw: true
                }); 
                if(user) {
                    let check =  bcrypt.compareSync(password, user.password);
                    // let check = true;
                    if(check) {
                        userData.errMessage = 'Login succeed!';
                        delete user.password
                        userData.user =  user;
                    }else {
                        userData.errMessage = 'The password you enter is incorrect.';
                    }  
                    // resolve(user.password)
                }else {
                    userData.errMessage = `User's not found!`;
                }
                
            }else {
                userData.errMessage = `The email address you entered is incorrect.`;
            }

            resolve(userData) // resolve ~ return 
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail =(userEmail) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email : userEmail}
            })

            if(user) {
                resolve(true)
            }else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
}