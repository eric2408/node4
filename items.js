// const items = require('./fakeDb')
// const express = require("express");
// const ExpressError = require('./expressError');
// const router = new express.Router();


// router.get('', (req, res, next)=> {
//     try {
//       return res.json(items);
//     } catch (error) {
//         next(error)
//     }
// })

// router.post('', (req, res, next)=> {
//     try {
//         const newItem = { name: req.body.name, price: req.body.price };
//         items.push(newItem);
//         return res.json({ added: newItem });
//     } catch (error) {
//         next(error)
//     }
// })

// router.get('/:name', (req, res, next)=> {
//     try {
//         const foundItem = items.find(item => item.name === req.params.name)
//         if(foundItem === undefined){
//             throw new ExpressError('Item not found', 404)
//         }
//         res.json({foundItem})
//     } catch (error) {
//         next(error)
//     }
// })

// router.patch('/:name', (req, res, next)=> {
//     try {
//         const foundItem = items.find(item => item.name === req.params.name)
//         if(foundItem === undefined){
//             throw new ExpressError('Item not found', 404)
//         }
//         foundItem.name = req.body.name
//         foundItem.price = req.price.name
//         res.json({foundItem})
//     } catch (error) {
//         next(error)
//     }
// })

// router.delete('/:name', (req, res, next)=> {
//     try {
//         const foundItem = items.find(item => item.name === req.params.name)
//         if(foundItem === -1){
//             throw new ExpressError('Item not found', 404)
//         }
//         items.splice(foundItem, 1)
//         res.json({ message: 'Deleted' })
//     } catch (error) {
//         next(error)
//     }
// })


// module.exports = router;

const Item = require('./item');
const express = require('express');

const router = express.Router();

/** GET / => [item, ...] */

router.get('', (req, res, next) => {
  try {
    return res.json({ items: Item.findAll() });
  } catch(err){
    return next(err)
  }
});

/** POST / {name, price} => new-item */

router.post('', (req, res, next) => {
  try {
    let newItem = new Item(req.body.name, req.body.price);
    return res.json({item: newItem});
  } catch (err) {
    return next(err)
  }
});

/** GET /[name] => item */

router.get('/:name', (req, res, next) => {
  try {
    let foundItem = Item.find(req.params.name);
    return res.json({item:foundItem});
  } catch(err){
    return next(err)
  }
});

/** PATCH /[name] => item */

router.patch('/:name', (req, res, next) => {
  try {
    let foundItem = Item.update(req.params.name, req.body);
    return res.json({ item: foundItem });
  } catch (err) {
    return next(err)
  }
});

/** DELETE /[name] => "Removed" */

router.delete('/:name', (req, res, next) => {
  try {
    Item.remove(req.params.name);
    return res.json({message:'Deleted'});
  } catch (err) {
    return next(err)
  }
});

module.exports = router;