const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.render('category', { categories });
    } catch (error) {
        res.status(500).send('Error retrieving categories');
    }
};

// Add a new category
const addCategory = async (req, res) => {
    const { name } = req.body;
    try {
        await prisma.category.create({
            data: { name }
        });
        res.redirect('/categories');
    } catch (error) {
        res.status(500).send('Error adding category');
    }
};

// Update an existing category
const updateCategory = async (req, res) => {
    let { id } = req.query;
    const { name } = req.body;
    try {
        await prisma.category.update({
            where: { id: parseInt(id) },
            data: { name }
        });
        res.redirect('/categories');
    } catch (error) {
        res.status(500).send('Error updating category');
    }
};

const getUpdateCategory = async (req, res) => {
    let { id } = req.query;
    id = parseInt(id);
    console.log(id);
    console.log(req.query);
    try {
        const category = await prisma.category.findUnique({
            where: {
                id: id
            }
        });
        console.log(category);
        res.render('updateCategory', { category });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error in get Update Category ');
    }
};

// Delete a category
const deleteCategory = async (req, res) => {
    let { id } = req.body;
    console.log(id);
    try {
        await prisma.category.delete({
            where: { id: parseInt(id) }
        });
        res.redirect('/categories');
    } catch (error) {
        res.status(500).send('Error deleting category');
    }
};

const test = (req, res) => {
    console.log(req.params);
    res.status(200).send('Test executed');
};

module.exports = {
    getCategories,
    addCategory,
    updateCategory,
    getUpdateCategory,
    deleteCategory,
    test
};
