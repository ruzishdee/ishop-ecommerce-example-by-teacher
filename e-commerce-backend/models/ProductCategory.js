const mongoose = require("mongoose");

const productCategorySchema = new mongoose.Schema({
  product_category_name: {
    type: String,
    require: true,
  },
  product_category_description: String,
});

const ProductCategory = mongoose.model("category", productCategorySchema);

module.exports = ProductCategory;
