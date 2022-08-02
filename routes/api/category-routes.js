const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      include: [{
        model: Product
      }]
    })
    res.status(200).json(allCategories)
  } catch (err) {
    res.status(500).json({
      msg: "internal server error",
      err
    })
  }
});


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const singleCategory = await Category.findByPk(req.params.id, {
      include: [{
        model: Product
      }]
    })
    if (!singleCategory) {
      return res.status(404).json({ msg: "Product not found" })
    }

    res.json(singleCategory)

  } catch (err) {
    res.status(500).json({
      msg: "internal server error",
      err
    })
  }

});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body)

    res.json(newCategory)

  } catch (err) {
    res.status(500).json({
      msg: "internal server error",
      err
    })
  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(
      {
      category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        }
      }
      )

    if (!updatedCategory) {
      return res.status(404).json({ msg: "Category not found" })
    }

    res.json(updatedCategory)
  } catch (err) {
    res.status(500).json({
      msg: "internal server error",
      err
    })
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const delCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!delCategory) {
      return res.status(404).json({ msg: "Product not found" })
    }

    res.json(delCategory)

  } catch (err) {
    res.status(500).json({
      msg: "internal server error",
      err
    })
  }

});

module.exports = router;
