import db from "../models/index";

let handleGetProduct = (idProduct) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product;
      if (!idProduct) {
        product = await db.Product.findAll();
      } else {
        product = await db.Product.findOne({
          where: { id: idProduct },
        });
      }
      resolve({
        errCode: 0,
        message: "Get product successfully!",
        data: product,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let handleCreateProduct = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        return resolve({
          errCode: 1,
          errMessage: "Missing input!",
        });
      }
      if (!data.nameP || !data.priceP || !data.countP || !data.imageP) {
        return resolve({
          errCode: 1,
          errMessage: "Missing input value!",
        });
      }
      await db.Product.create({
        idGroup: data.idGroup,
        nameP: data.nameP,
        priceP: data.priceP,
        countP: data.countP,
        imageP: data.imageP,
        infoP: data.infoP,
        parameterP: data.parameterP,
      });
      resolve({
        errCode: 0,
        message: "Create product successfully!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let handleUpdateProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        return resolve({
          errCode: 1,
          errMessage: "Missing input parameter",
        });
      }
      if (!data.nameP || !data.priceP || !data.imageP) {
        return resolve({
          errCode: 1,
          errMessage: "Missing input value",
        });
      }
      let product = await db.Product.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (!product) {
        resolve({
          errCode: 2,
          errMessage: "Product not found!",
        });
      }
      product.idGroup = data.idGroup;
      product.nameP = data.nameP;
      product.priceP = data.priceP;
      product.countP = data.countP;
      product.imageP = data.imageP;
      product.infoP = data.infoP;
      product.parameterP = data.parameterP;
      product.save();
      // let products = await db.Product.findAll();
      resolve({
        errCode: 0,
        message: "Update Product Successfully!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let handleDeleteProduct = async (idProduct) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!idProduct) {
        resolve({
          errCode: 1,
          errMessage: "Missing input parameter!",
        });
      }
      let product = await db.Product.findOne({
        where: { id: idProduct },
        raw: false,
      });
      if (!product) {
        resolve({
          errCode: 2,
          errMessage: "Product not found!",
        });
      }
      await product.destroy();
      // let products = await db.Product.findAll();
      resolve({
        errCode: 0,
        message: "Delete product successfully!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let handleGetProductByGroup = (idGroup) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!idGroup) {
        return resolve({
          errCode: 1,
          errMessage: "Missing value idGroup!",
        });
      }
      let products = await db.Product.findAll({
        where: { idGroup: idGroup },
      });
      return resolve({
        errCode: 0,
        message: "Get products by group successfully!",
        data: products,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let handleGetGroupProduct = (idProduct) => {
  return new Promise(async (resolve, reject) => {
    try {
      let productGroup = await db.ProductGroup.findAll();
      return resolve({
        errCode: 0,
        message: "Get product group successfully!",
        data: productGroup,
      });
    } catch (e) {
      reject(e);
    }
  });
};

//.................................

module.exports = {
  handleCreateProduct,
  handleGetProduct,
  handleUpdateProduct,
  handleDeleteProduct,
  //
  handleGetProductByGroup,
  handleGetGroupProduct,
};
