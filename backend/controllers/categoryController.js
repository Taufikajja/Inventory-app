import Category from '../models/Category.js';

const addCategory = async (req, res) => {
    try {
        const {categoryName, categoryDescription} = req.body;
        
        const existingCategory = await Category.findOne({categoryName}); 
        if (existingCategory) {
            return res.status(400).json({ success: false, message:'Category already exists'});
        }
 
        // create a new category
        const newCategory = new Category({
            categoryName,
            categoryDescription,
        });

        await newCategory.save();
        return res.status(201).json({ success:true,message:'Category added successfully'});
    } catch (error) {
        console.error('Error adding category:', error);
        return res.status(500).json({ success: false, message: "Server error"});
    }
}

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json ({success: true, categories });
    } catch (error) {
        console.error('error fetching categories:', error);
        return res.status(500).json ({ success: false, message: 'Server error in getting categories'});
    }
}

const updateCategory = async (req, res) => {
    try {
        const {id} = req.params;
        const { categoryName, categoryDescription} = req.body;

        //check if the category exists
        const existingCategory = await Category.findById(id);
        if (!existingCategory) {
            return res.status(404).json ({ success: false, message:'category not found' });
        }

        const updateCategory = await Category.findByIdAndUpdate (
            id,
            { categoryName, categoryDescription },
            {new: true}
        );
        return res.status(200).json({ success: true, message: 'Category updated successfully'});
    } catch (error) {
        console.error('Error updating category', error);
        return res.status(500).json({ success: false, message: 'Server error'});
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        //check if the category exists
        const existingCategory = await Category.findById(id);
        if (!existingCategory) {
            return res.status(404).json({ success: false, message: 'category not found' });
        }

        await Category.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

export {addCategory, getCategories, updateCategory, deleteCategory};