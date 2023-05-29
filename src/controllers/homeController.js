import productService from "../services/productService";
import accountService from "../services/accountService";
import billService from "../services/billService";

let testApi = async (req, res) => {
  try {
    let data = await accountService.handleTestApi();
    res.status(200).json({
      errCode: 0,
      errMessage: "Get data successfully!",
      data: data,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!",
    });
  }
};
let getAllAcc = async (req, res) => {
  try {
    let response = await accountService.handleGetAcc("All");
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errorCode: -1,
      errorMessage: "Error from server!",
    });
  }
};
let createSlide = async (req, res) => {
  try {
    let data = req.body;
    let response = await accountService.handleCreateSlide(data);
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errorCode: -1,
      errorMessage: "Error from server!",
    });
  }
};

let getAboutPage = (req, res) => {
  res.render("login.ejs");
  // res.render("about.ejs")
};
let getDetailUser = async (req, res) => {
  // res.send("hello from page detail"+ req.params.userId)
  const userId = req.params.userId;
  const user = await pool.execute("select * from users where id= ?", [userId]);
  // console.log(user[0])
  res.render("about.ejs", { user: JSON.stringify(user[0]) });
};

let createUser = async (req, res) => {
  // console.log(req.body)
  const { name, email, address } = req.body;
  await pool.execute(
    "insert into users(name, email, address) values(?, ?, ?)",
    [name, email, address]
  );
  res.redirect("/");
};
let deleteUser = async (req, res) => {
  const userId = req.body.id;
  console.log(userId);
  // await pool.execute("delete from users whrere id = ?", [userId])
  // await pool.execute("insert into users(name, email, address) values(?, ?, ?)", [name, email, address])
  res.redirect("/");
};

let editUser = async (req, res) => {
  const userId = req.params.id;
  const [user] = await pool.execute("select * from users where id = ?", [
    userId,
  ]);
  console.log(user[0]);
  res.render("update.ejs", { dataUser: user[0] });
};

let updateUser = async (req, res) => {
  // const userId = req.body.id;
  const { id, name, email, address } = req.body;
  // console.log(id)
  console.log(req.body);
  // goi de update user
  // await pool.execute("update users(name, email, address) where id=?", [name, email, address, id])
  res.send("hello from update");
};

let getHomePage = (req, res) => {
  try {
    return res.render("login.ejs", { data: null });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!",
    });
  }
};

let getManagerPage = (req, res) => {
  res.render("manager/home.ejs");
};

let getMemberPage = (req, res) => {
  res.render("member/home.ejs");
};

let handleLogin = async (req, res) => {
  try {
    let data = req.body;
    let response = await accountService.handleUserLogin(
      data.email,
      data.password
    );
    if (response.errCode == 0) {
      switch (response.dataAcc.roleId) {
        case 1:
          return res.redirect("/admin-page");
        case 2:
          return res.redirect("/manager-page");
        case 3:
          return res.redirect("/member-page");
        default:
          return res.render("login.ejs");
      }
    } else {
      return res.render("login.ejs", {
        data: JSON.stringify(response.errMessage),
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!",
    });
  }
};

let getAdminPage = async (req, res) => {
  try {
    // let response = await accountService.handleGetAcc("All");
    // if(response.errCode===0){
    //   res.render("account.ejs", {data: response.data});
    // }
    return res.render("admin/home.ejs");
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!",
    });
  }
};

let getManageAccount = async (req, res) => {
  try {
    let response = await accountService.handleGetAcc("All");
    if (response.errCode === 0) {
      return res.render("account.ejs", { data: response.data });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!",
    });
  }
};

let getManageProduct = async (req, res) => {
  try {
    let response = await productService.handleGetProduct();
    if (response.errCode === 0) {
      return res.render("product.ejs", { data: response.data });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!",
    });
  }
};

let getManageBill = async (req, res) => {
  try {
    let response = await billService.handleGetBill();
    if (response.errCode === 0) {
      return res.render("bill.ejs", { data: response.data });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!",
    });
  }
};

module.exports = {
  getManageAccount,
  getManageProduct,
  getManageBill,
  getHomePage,
  handleLogin,
  getAboutPage,
  getAdminPage,
  getManagerPage,
  getMemberPage,
  getDetailUser,
  createUser,
  deleteUser,
  editUser,
  updateUser,
  getAllAcc,
  createSlide,
  testApi,
};
