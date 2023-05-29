import express from "express";
import accountController from "../controllers/accountController";
import productController from "../controllers/productController";
import billController from "../controllers/billController";
import apiController from "../controllers/apiController";

let router = express.Router();

const initAPIRoute = (app) => {
  router.get("/get-acc", accountController.getAcc);
  router.post("/create-acc", accountController.createAcc);
  router.put("/update-acc", accountController.updateAcc);
  router.delete("/delete-acc", accountController.deleteAcc);

  router.get("/get-product", productController.getProduct);
  router.post("/create-product", productController.createProduct);
  router.put("/update-product", productController.updateProduct);
  router.delete("/delete-product", productController.deleteProduct);
  router.get("/get-group-product", productController.getProductByGroup);

  router.post("/login", apiController.checkLogin);
  router.post("/register-member", apiController.registerMember);

  router.post("/create-bill", billController.createBill);
  router.get("/get-bill", billController.getBill);
  return app.use("/api/test/", router);
};

export default initAPIRoute;
