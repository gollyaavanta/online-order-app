import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { AuthContext } from "../../context/AuthContext";

const Add = ({ url }) => {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  // State strictly mapping to all backend productPayload fields
  const [data, setData] = useState({
    name: "",
    slug: "",
    sku: "",
    brand: "",
    category: "",
    shortDescription: "",
    description: "",
    ingredients: "",
    nutritionalInformation: "",
    directionsForUse: "",
    benefits: "",
    storageInstructions: "",
    shelfLife: "",
    netWeight: "",
    mrp: "",
    sellingPrice: "",
    gstPercent: "0",
    stock: "0",
    lowStockThreshold: "5",
    isActive: true,
    isFeatured: false,
    tagsInput: "",
    frequentlyBoughtTogether: [],
    relatedProducts: [],
  });

  // Dynamic FAQs State
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);

  const fetchBrands = async () => {
    try {
      const res = await axios.get(`${url}/api/v1/brands`);
      setBrands(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch brands");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${url}/api/v1/categories`);
      setCategories(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch categories");
    }
  };

  const fetchProductsList = async () => {
    try {
      const res = await axios.get(`${url}/api/v1/products?limit=100`);
      setAllProducts(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch products for relations selection");
    }
  };

  useEffect(() => {
    fetchBrands();
    fetchCategories();
    fetchProductsList();
  }, []);

  // Form field change handler
  const onChangeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Multiple selection handler for relations
  const handleMultiSelectChange = (e, field) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setData((prev) => ({
      ...prev,
      [field]: selectedOptions,
    }));
  };

  // Dynamic Image Handler
  const handleImageChange = (e) => {
  const selectedFiles = Array.from(e.target.files);

  setImages((prevImages) => {
    const updatedImages = [...prevImages, ...selectedFiles];

    if (updatedImages.length > 5) {
      toast.error("You can upload a maximum of 5 images.");
      return prevImages;
    }

    return updatedImages;
  });

  // Reset input so the same file can be selected again
  e.target.value = "";
};

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // FAQ Handlers
  const handleFaqChange = (index, field, value) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index][field] = value;
    setFaqs(updatedFaqs);
  };

  const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }]);
  const removeFaq = (index) => setFaqs(faqs.filter((_, i) => i !== index));

  // Form Submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      toast.error("Please upload at least one product image.");
      return;
    }

    setLoading(true);
    const formData = new FormData();

    // Append Images for Multer array input
    images.forEach((img) => {
      formData.append("images", img);
    });

    // Append standard primitive fields
    Object.keys(data).forEach((key) => {
      if (!["tagsInput", "frequentlyBoughtTogether", "relatedProducts"].includes(key)) {
        formData.append(key, data[key]);
      }
    });

    // Parse and Append Array/JSON Fields
    const tagsArray = data.tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    formData.append("tags", JSON.stringify(tagsArray));
    formData.append("faqs", JSON.stringify(faqs.filter((f) => f.question && f.answer)));
    formData.append("frequentlyBoughtTogether", JSON.stringify(data.frequentlyBoughtTogether));
    formData.append("relatedProducts", JSON.stringify(data.relatedProducts));

    try {
      const response = await axios.post(`${url}/api/v1/products/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success(response.data.message || "Product added successfully!");
        
        // Reset Form completely
        setData({
          name: "", slug: "", sku: "", brand: "", category: "",
          shortDescription: "", description: "", ingredients: "",
          nutritionalInformation: "", directionsForUse: "", benefits: "",
          storageInstructions: "", shelfLife: "", netWeight: "", mrp: "",
          sellingPrice: "", gstPercent: "0", stock: "0", lowStockThreshold: "5",
          isActive: true, isFeatured: false, tagsInput: "",
          frequentlyBoughtTogether: [], relatedProducts: [],
        });
        setImages([]);
        setFaqs([{ question: "", answer: "" }]);
        fetchProductsList(); // Refresh available relation items
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-slate-50 min-h-screen">
      <form onSubmit={onSubmitHandler} className="space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
            <p className="text-sm text-gray-500">Fill in the required information to list a new item.</p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg shadow transition disabled:opacity-50"
          >
            {loading ? "Saving Product..." : "Save Product"}
          </button>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* General Information */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">Basic Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={data.name}
                    onChange={onChangeHandler}
                    placeholder="e.g. Organic Almond Butter"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Custom Slug (Optional)</label>
                  <input
                    type="text"
                    name="slug"
                    value={data.slug}
                    onChange={onChangeHandler}
                    placeholder="organic-almond-butter"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU *</label>
                  <input
                    type="text"
                    name="sku"
                    required
                    value={data.sku}
                    onChange={onChangeHandler}
                    placeholder="ALM-BTR-001"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <select
                    name="brand"
                    value={data.brand}
                    onChange={onChangeHandler}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="">Select Brand</option>
                    {brands.map((brand) => (
                      <option key={brand._id} value={brand._id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                <input
                  type="text"
                  name="shortDescription"
                  value={data.shortDescription}
                  onChange={onChangeHandler}
                  placeholder="Brief high-level summary..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Description *</label>
                <textarea
                  name="description"
                  rows="4"
                  required
                  value={data.description}
                  onChange={onChangeHandler}
                  placeholder="Detailed breakdown of the product..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Media Upload */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">Product Images</h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition">
                <input
                  type="file"
                  id="imageUpload"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label htmlFor="imageUpload" className="cursor-pointer flex flex-col items-center">
                  <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="text-sm font-medium text-gray-600">Click to upload images</span>
                  <span className="text-xs text-gray-400 mt-1">PNG, JPG, WebP up to 5MB (First image will be primary)</span>
                </label>
              </div>

              {/* Previews */}
              {images.length > 0 && (
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative group rounded-md overflow-hidden border border-gray-200 aspect-square">
                      <img src={URL.createObjectURL(img)} alt="preview" className="object-cover w-full h-full" />
                      {idx === 0 && (
                        <span className="absolute top-1 left-1 bg-indigo-600 text-white text-[10px] px-1.5 py-0.5 rounded">
                          Primary
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Item Specifications & Instructions */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">Specifications & Usage</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
                  <textarea
                    name="ingredients"
                    rows="2"
                    value={data.ingredients}
                    onChange={onChangeHandler}
                    placeholder="e.g. Roasted Almonds, Sea Salt"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nutritional Info</label>
                  <textarea
                    name="nutritionalInformation"
                    rows="2"
                    value={data.nutritionalInformation}
                    onChange={onChangeHandler}
                    placeholder="e.g. Calories: 200, Protein: 7g"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Directions For Use</label>
                  <textarea
                    name="directionsForUse"
                    rows="2"
                    value={data.directionsForUse}
                    onChange={onChangeHandler}
                    placeholder="e.g. Mix well before use. Spread on toast."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Benefits</label>
                  <textarea
                    name="benefits"
                    rows="2"
                    value={data.benefits}
                    onChange={onChangeHandler}
                    placeholder="e.g. High protein, Rich in Fiber, Zero Preservatives"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Net Weight</label>
                  <input
                    type="text"
                    name="netWeight"
                    value={data.netWeight}
                    onChange={onChangeHandler}
                    placeholder="e.g. 500g / 1lb"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shelf Life</label>
                  <input
                    type="text"
                    name="shelfLife"
                    value={data.shelfLife}
                    onChange={onChangeHandler}
                    placeholder="e.g. 12 Months"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Storage Instructions</label>
                  <input
                    type="text"
                    name="storageInstructions"
                    value={data.storageInstructions}
                    onChange={onChangeHandler}
                    placeholder="e.g. Keep in a cool, dry place"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Product Cross-Sells & Recommendations */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">Product Relations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Frequently Bought Together
                  </label>
                  <select
                    multiple
                    value={data.frequentlyBoughtTogether}
                    onChange={(e) => handleMultiSelectChange(e, "frequentlyBoughtTogether")}
                    className="w-full h-28 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
                  >
                    {allProducts.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <span className="text-xs text-gray-400">Hold Ctrl (Cmd on Mac) to select multiple</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Related Products
                  </label>
                  <select
                    multiple
                    value={data.relatedProducts}
                    onChange={(e) => handleMultiSelectChange(e, "relatedProducts")}
                    className="w-full h-28 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
                  >
                    {allProducts.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <span className="text-xs text-gray-400">Hold Ctrl (Cmd on Mac) to select multiple</span>
                </div>
              </div>
            </div>

            {/* Dynamic FAQs Section */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-700">Product FAQs</h2>
                <button
                  type="button"
                  onClick={addFaq}
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  + Add Question
                </button>
              </div>

              {faqs.map((faq, index) => (
                <div key={index} className="space-y-2 border-b pb-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Question"
                      value={faq.question}
                      onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    {faqs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFaq(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Answer"
                    value={faq.answer}
                    onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              ))}
            </div>

          </div>

          {/* Sidebar Column (1/3 width) */}
          <div className="space-y-6">

            {/* Pricing & Tax */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">Pricing</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">MRP (₹) *</label>
                <input
                  type="number"
                  name="mrp"
                  required
                  step="0.01"
                  value={data.mrp}
                  onChange={onChangeHandler}
                  placeholder="29.99"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price (₹) *</label>
                <input
                  type="number"
                  name="sellingPrice"
                  required
                  step="0.01"
                  value={data.sellingPrice}
                  onChange={onChangeHandler}
                  placeholder="24.99"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GST / Tax (%)</label>
                <input
                  type="number"
                  name="gstPercent"
                  value={data.gstPercent}
                  onChange={onChangeHandler}
                  placeholder="5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Inventory */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">Inventory</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
                <input
                  type="number"
                  name="stock"
                  required
                  value={data.stock}
                  onChange={onChangeHandler}
                  placeholder="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Low Stock Warning Limit</label>
                <input
                  type="number"
                  name="lowStockThreshold"
                  value={data.lowStockThreshold}
                  onChange={onChangeHandler}
                  placeholder="5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Categorization & Tags */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">Organization</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  name="category"
                  required
                  value={data.category}
                  onChange={onChangeHandler}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  name="tagsInput"
                  value={data.tagsInput}
                  onChange={onChangeHandler}
                  placeholder="organic, healthy, vegan"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Visibility Options */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">Visibility & Status</h2>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Active Status</span>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={data.isActive}
                  onChange={onChangeHandler}
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Featured Product</span>
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={data.isFeatured}
                  onChange={onChangeHandler}
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                />
              </div>
            </div>

          </div>
        </div>
      </form>
    </div>
  );
};

export default Add;