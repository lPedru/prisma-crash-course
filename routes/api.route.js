const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/products', async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
    });

    res.json(products);
  } 
  catch (error) {
    next(error);
  }
});

router.get('/products/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id)
      }
    });
    res.send(product);
  }
  catch (error) {
    
  }
});

router.post('/products', async (req, res, next) => {
  try {

    const product = await prisma.product.create({
      data: req.body,
    });
    
    res.send(product);
  }
  catch (error) {
    next(error)  
  }

});

router.delete('/products/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await prisma.product.delete({
      where: {
        id: Number(id),
      }
    })
    res.send(deletedProduct);
  }
  catch (error) {
    
  }
});

router.patch('/products/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: req.body,
      include: {
        category: true,
      }
    });
    res.send(product);
  }
  catch (error) {
    next(error)
  }
});

module.exports = router;
