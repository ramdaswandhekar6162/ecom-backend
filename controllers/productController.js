const { PrismaClient } = require("@prisma/client");
const { skip } = require("@prisma/client/runtime/library");

const {convert} = require("../Utils/queryParamUtils");

const prisma = new PrismaClient();


const getProducts = async (req,res) => {

    const { page, pageSize}= convert(req.query);
    
    const offset = (page - 1) * pageSize;
    
    try {
      const products = await prisma.product.findMany({
        skip: parseInt(offset),
        take: parseInt(pageSize),
        include: { category: true }
      });

      const categories = await prisma.category.findMany();
      
      const totalProducts = await prisma.product.count();
      const totalPages = Math.ceil(totalProducts / pageSize);
      
      res.render('product', { products, page, totalPages , categories});
    } catch (error) {
      res.status(500).send('Error retrieving products');
    }
};

const addProduct = async (req,res) => {
    console.log(req.body);
    const {name,categoryId} = req.body;

    try {
        
        await prisma.product.create({
            data : {
                name,
                categoryId : parseInt(categoryId)
            }
        });

        res.redirect("/products");


    } catch (error) {
        
        res.status(500).send("Error retrive from Products controller........");
    }
}

const editProduct = async (req,res) => {
    const { id } = req.query;
    
    try {

        const product = await prisma.product.findUnique({
            where : {
                id : parseInt(id),
            },
        });
        const categories = await prisma.category.findMany();
        res.render("editProduct", { product, categories});

    } catch (error) {
        console.log(error);
        console.log("error in edit product ..");
    }
}


/* 
const updateUser = await prisma.user.update({
  where: {
    email: 'viola@prisma.io',
  },
  data: {
    name: 'Viola the Magnificent',
  },
})
*/

const updateProduct = async (req,res) => {
   const {productId , productName ,categoryId } = req.body;

    await prisma.product.update({
        where : {
            id : parseInt(productId),
        },
        data : {
            name : productName,
            categoryId : parseInt(categoryId),
        },
    });

    res.redirect('/products');
}

module.exports = {getProducts , addProduct , editProduct ,updateProduct};