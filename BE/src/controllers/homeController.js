import db from '../models/index';
import CRUDService from '../services/CRUDService';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log('---------------------')
        console.log(data)
        console.log('---------------------')
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e)
    }
}

let getAboutPage = async (req, res) => {
    return res.render('test/test.ejs');
}

let getCRUD = async (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD =  async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    let data = await CRUDService.getAllUser();
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
    // console.log(message);
    // return res.send('post crud form sever');
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    // console.log('----------------')
    // console.log(data)
    // console.log('----------------')
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if(userId)
    {
        let userData =await CRUDService.getUserInfoById(userId);
        // console.log('----------------')
        // console.log(userData)
        // console.log('----------------')
        // edit user
        return res.render('editCRUD.ejs', {
            user: userData,
        });
        
    }
    else {
        return res.send('User not found!');
    }
}
// request: yeu cau
//response: phan ung
let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    // 
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    })
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if(id)
    {
        let de_user = await CRUDService.deleteUserData(id);
        //show
        return res.render('displayCRUD.ejs', {
            dataTable: de_user
        })
        // return res.send('Delete user succeed!')
    }
    else {
        return res.send('User not found!');
    }
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}
