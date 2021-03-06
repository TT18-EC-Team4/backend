const Products = require("../models/productModel");

// Filter, sorting and paginating

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const productCtrl = {
  getProducts: async (req, res) => {
    try {
      const length = await Products.find({});
      const temp = length.length;
      const { page, limit } = req.body;
      const features = new APIfeatures(Products.find({}), req.body)
        // .filtering()
        // .sorting()
        .paginating();

      const products = await features.query;
      // const products = await Products.find({});

      res.json({
        // status: "success",
        // result: products.length,
        products: products,
        page: page,
        limit: limit,
        totalRows: temp,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      console.log(req.body);
      const {
        id,
        name,
        cost,
        author,
        publishedYear,
        picture,
        category,
        quantity,
      } = req.body;
      if (!picture) return res.status(400).json({ msg: "No image upload" });

      const product = await Products.findOne({
        name: name.toLowerCase(),
        author: author,
        publishedYear: publishedYear,
        cost: cost,
      });
      if (product)
        return res.status(400).json({ msg: "This product already exists." });

      const newProduct = new Products({
        id,
        name: name.toLowerCase(),
        cost,
        author,
        publishedYear,
        picture,
        category,
        quantity,
      });

      await newProduct.save();
      res.json({ msg: "Created a product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    console.log(req.params.id);
    try {
      await Products.findOneAndDelete({ id: req.params.id });
      res.json({ msg: "Deleted a Product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      console.log(req.body);
      const {
        name,
        cost,
        author,
        publishedYear,
        picture,
        category,
        quantity,
        onDiscount,
        numOfReviews,
        ratePoint,
      } = req.body;
      if (!picture) return res.status(400).json({ msg: "No image upload" });

      await Products.findOneAndUpdate(
        { id: req.params.id },
        {
          name: name.toLowerCase(),
          cost,
          author,
          publishedYear,
          picture,
          category,
          quantity,
          onDiscount,
          numOfReviews,
          ratePoint,
        }
      );

      res.json({ msg: "Updated a Product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = productCtrl;
