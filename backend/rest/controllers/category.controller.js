const Category = require("../models/category.model");

exports.create_category = async (req, res) => {
    try {
        let category;
        category = new Category(req.body);
        await category.save();
        res.send(category);
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}

exports.list_category = async (req, res) => {
    try {
        const { offset, limit } = req.query;
        const categorys = await Category.find(
            {},
            {},
            { skip: Number(offset), limit: Number(limit) }
        );
        res.json(categorys);
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}

exports.all_categories = async (req, res) => {
    try {
        const category = await Category.find({});
        if (!category) {
            res.status(404).json({ msg: "No existen categorías" });
        }
        res.json(category.map((category) => category.toListJSONFor()));
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error en categories");
    }
}

exports.category_reference = async (req, res) => {
    try {
        // let category = await Category.findOne({name_category:req.params.name}).populate('products');
        let category = await Category.findOne({ reference: req.params.reference }).populate('products');
        await Category.updateOne({ reference: req.params.reference }, { $inc: { "visited": 1 } });

        if (!category) {
            res.status(404).json({ msg: "No existe la categoria" });
        }
        res.json(category);

    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}

exports.delete_category = async (req, res) => {
    try {
        let category = await Category.findById(req.params.id);
        if (!category) {
            res.status(404).json({ msg: "No existe la categoria" });
        }
        await Category.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: "categoria eliminado con éxito!" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}