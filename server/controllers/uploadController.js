const Product = require('../models/Product');

exports.uploadListing = async (req, res) => {
  try {
    const { name, description, price, quantity, category, imageUrl } = req.body;
    

    const product = new Product({
      name,
      description,
      image: imageUrl,
      price,
      quantity,
      category
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
