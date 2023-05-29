import productService from "../services/productService";

let getProduct = async (req, res) => {
  try {
    let id = req.query.id;
    let response = await productService.handleGetProduct(id);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from sever!",
    });
  }
};

module.exports = {
  getProduct,
};
