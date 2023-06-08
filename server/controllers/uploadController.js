const Product = require('../models/Product');
const Category = require('../models/Category')

exports.uploadListing = async (req, res) => {
  try {
    const { name, description, price, quantity, category, imageUrl } = req.body;
    
    const categoryId = await Category.findOne({
      name: category
    })

console.log(req.body.category)
console.log(categoryId)
    const product = await Product.create({
      name,
      description,
      image: imageUrl,
      price,
      quantity,
      category: categoryId.id
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Listing uploaded successfully',
      product
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error uploading listing',
      error: error.message
    });
  }
};
