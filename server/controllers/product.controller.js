const Product = require('../models/product.model');


exports.createProduct = async (req, res) => {
    try {
        const { name, description, availability } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'Image is required' });
        }

        // Create a new product instance
        const product = new Product({
            name,
            description,
            availability,
            image: req.file.path // Assuming req.file.path contains the path of the uploaded image
        });

        await product.save();

        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateProduct = async (req, res) => {
    const prodId = req.params.id;
    const { name, availability, description } = req.body;
    const image = req.file;

    try {
        // Find the product by ID
        const product = await Product.findById(prodId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Update product details
        product.name = name;
        product.availability = availability;
        product.description = description;
        if (image) {
            product.image = { data: image.path, contentType: image.mimetype };
        }

        await product.save();
        res.status(200).json(product);
    } catch (error) {
        // Handle errors
        res.status(400).json({ error: error.message });
    }
};


// Controller for deleting a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
