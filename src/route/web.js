import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import productController from "../controllers/productController";
//
let router = express.Router();
let initWebRouters = (app) => {
  // router.get("/", homeController.getHomePage);
  // router.get("/about", homeController.getAboutPage);
  // router.get("/crud", homeController.getCRUD);
  // router.post("/post-crud", homeController.postCRUD);
  // router.get("/get-crud", homeController.displayGetCRUD);
  // router.get("/edit-crud", homeController.getEditCRUD);
  // router.post("/put-crud", homeController.putCRUD);
  // router.get("/delete-crud", homeController.deleteCRUD);
  // account
  router.post("/api/login", userController.handleLogin); // post: gửi dữ liệu đến máy chủ để Tạo mới một tài nguyên hoặc cập nhật một tài nguyên hiện có
  router.get("/api/get-all-users", userController.handleGetAllUsers); // get: Thường được sử dụng để Lấy dữ liệu hoặc hiển thị một trang web.
  router.post("/api/create-new-account", userController.handleCreateNewAccount);
  router.put('/api/edit-account', userController.handleEditAccount);
  // sanpham
    router.get("/api/get-product", productController.getProduct);
  //
  return app.use("/", router);
}; 

module.exports = initWebRouters;
