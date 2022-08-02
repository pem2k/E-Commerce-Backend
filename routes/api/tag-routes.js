const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include:[{
        model: Product,
        attributes: ["id","product_name", "price", "stock", "category_id"],
        through: {
          model: ProductTag
        }
      }]
    })
    res.status(200).json(allTags)
  } catch (err) {
    res.status(500).json({
      msg: "internal server error",
      err
    })
  }
});



router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const singleTag = await Tag.findByPk(req.params.id, {
      include:[{
        model: Product,
        attributes: ["id","product_name", "price", "stock", "category_id"],
        through: {
          model: ProductTag
        }
      }]
    })
    if (!singleTag) {
      return res.status(404).json({ msg: "Product not found" })
    }

    res.json(singleTag)

  } catch (err) {
    res.status(500).json({
      msg: "internal server error",
      err
    })
  }

});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body)

    res.json(newTag)

  } catch (err) {
    res.status(500).json({
      msg: "internal server error",
      err
    })
  }

});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update({
      tag_name: req.body.tag_name
    },
      {
        where: {
          id: req.params.id
        }
      })

    if (!updatedTag) {
      return res.status(404).json({ msg: "Tag not found" })
    }

    res.json(updatedTag)
  } catch (err) {
    res.status(500).json({
      msg: "internal server error",
      err
    })
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const delTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!delTag) {
      return res.status(404).json({ msg: "Tag not found" })
    }

    res.json(delTag)

  } catch (err) {
    res.status(500).json({
      msg: "internal server error",
      err
    })
  }

});

module.exports = router;
