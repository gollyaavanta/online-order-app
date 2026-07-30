import { Brand } from "../models/brand.model.js";

const createSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

export const createBrand = async (req, res) => {
  try {
    const brand = await Brand.create({
      name: req.body.name,
      slug: createSlug(req.body.name),
      description: req.body.description,
    });

    res.status(201).json({
      success: true,
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBrands = async (req, res) => {
  const brands = await Brand.find({
    isActive: true,
  }).sort("name");

  res.json({
    success: true,
    data: brands,
  });
};

export const updateBrand = async (req, res) => {
  const brand = await Brand.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.json({
    success: true,
    data: brand,
  });
};

export const deleteBrand = async (req, res) => {
  await Brand.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: "Brand deleted",
  });
};