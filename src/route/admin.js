import express from "express";
import homeController from "../controllers/homeController";
import accountController from "../controllers/accountController";
import productController from "../controllers/productController";
import billController from "../controllers/billController";
import adminControllor from "../controllers/adminController";

let router = express.Router();

let checkLogin = async (req, res, next) => {
  if (req.cookies.token) {
    let roleId = req.cookies.roleId;
    if (roleId == 1) {
      return next();
    }
  }
  return res.redirect("/login");
};

const initAdminRoute = (app) => {
  router.get("/", homeController.getAdminPage);
  router.get("/account", homeController.getManageAccount);
  router.get("/product", homeController.getManageProduct);
  router.get("/bill", homeController.getManageBill);
  router.get("/group-product", adminControllor.getManageGroupProduct);
  router.get("/get-product-bygroup", productController.getProductByGroupWeb);

  router.post("/create-acc", accountController.createAccWeb);
  router.get("/edit-add-acc", accountController.getEditAcc);
  router.post("/update-acc", accountController.getUpdateAcc);
  router.get("/delete-acc", accountController.deleteAccWeb);

  router.post("/create-product", productController.createProductWeb);
  router.get("/edit-add-product", productController.getEditAddProduct);
  router.post("/update-product", productController.updateProductWeb);
  router.get("/delete-product", productController.deleteProductWeb);

  router.post("/create-bill", billController.createBillWeb);
  router.get("/edit-add-bill", billController.getEditAddBill);
  // router.post("/update-bill", billController.updateProductWeb);
  router.get("/delete-bill", billController.deleteBillWeb);
  return app.use("/admin/", checkLogin, router);
};

export default initAdminRoute;
