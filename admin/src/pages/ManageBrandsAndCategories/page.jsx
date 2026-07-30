import React, { useState, useEffect, useContext } from "react";
import { Plus, Edit2, Trash2, Tag, Layers, Search, Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

// Helper function to auto-generate slug
const createSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

export default function BrandCategoryManager({ url = "" }) {
  const [activeTab, setActiveTab] = useState("categories"); // 'categories' | 'brands'
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { token } = useContext(AuthContext);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Adjust items per page as needed

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    isActive: true,
  });

  const baseUrl = url.replace(/\/$/, "");
  const apiEndpoint = `${baseUrl}/api/v1/${activeTab}`;

  // Reset pagination when switching tabs or searching
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  // Fetch Items
  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      if (json.success) {
        setItems(json.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [activeTab, url, token]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
      if (name === "name" && !editingItem) {
        updated.slug = createSlug(value);
      }
      return updated;
    });
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name || "",
        slug: item.slug || createSlug(item.name || ""),
        description: item.description || "",
        isActive: item.isActive ?? true,
      });
    } else {
      setEditingItem(null);
      setFormData({ name: "", slug: "", description: "", isActive: true });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingItem ? "PUT" : "POST";
    const targetUrl = editingItem ? `${apiEndpoint}/${editingItem._id}` : apiEndpoint;

    try {
      const res = await fetch(targetUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const json = await res.json();

      if (json.success) {
        fetchItems();
        setIsModalOpen(false);
      } else {
        alert(json.message || "An error occurred");
      }
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handleDelete = async (id) => {
    const typeLabel = activeTab === "categories" ? "category" : "brand";
    if (!window.confirm(`Are you sure you want to delete this ${typeLabel}?`)) return;

    try {
      const res = await fetch(`${apiEndpoint}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      if (json.success) {
        setItems((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert(json.message || "Failed to delete");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Filter Items
  const filteredItems = items.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.slug?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const isCategory = activeTab === "categories";

  return (
    // FULL WIDTH CONTAINER (w-full px-6 py-6)
    <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 border-b pb-4 border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">Catalog Management</h1>
            <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800">
              {isCategory ? "Category Mode" : "Brand Mode"}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Currently viewing and managing <strong className="text-gray-700">{isCategory ? "Product Categories" : "Product Brands"}</strong>.
          </p>
        </div>

        <button
          onClick={() => openModal()}
          className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm cursor-pointer text-sm"
        >
          <Plus className="w-4 h-4" />
          Add New {isCategory ? "Category" : "Brand"}
        </button>
      </div>

      {/* Navigation Tabs & Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 p-4 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
          
          {/* Main Switcher Tabs */}
          <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab("categories")}
              className={`flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-md transition-all cursor-pointer ${
                isCategory ? "bg-white text-orange-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Layers className="w-4 h-4" />
              Categories ({activeTab === "categories" ? items.length : "..."})
            </button>
            <button
              onClick={() => setActiveTab("brands")}
              className={`flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-md transition-all cursor-pointer ${
                !isCategory ? "bg-white text-orange-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Tag className="w-4 h-4" />
              Brands ({activeTab === "brands" ? items.length : "..."})
            </button>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${isCategory ? "Categories" : "Brands"} by name or slug...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full">
        {loading ? (
          <div className="p-12 text-center text-gray-500 font-medium">Loading catalog data...</div>
        ) : filteredItems.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No {isCategory ? "categories" : "brands"} found. Click "Add New {isCategory ? "Category" : "Brand"}" to create one.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase text-gray-500">
                  <tr>
                    <th className="px-6 py-3.5">{isCategory ? "Category Name" : "Brand Name"}</th>
                    <th className="px-6 py-3.5">URL Slug</th>
                    <th className="px-6 py-3.5 hidden md:table-cell">
                      {isCategory ? "Category Description" : "Brand Bio / Details"}
                    </th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedItems.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        <div className="flex items-center gap-2">
                          {isCategory ? (
                            <Layers className="w-4 h-4 text-orange-500 shrink-0" />
                          ) : (
                            <Tag className="w-4 h-4 text-emerald-500 shrink-0" />
                          )}
                          {item.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-gray-500">{item.slug}</td>
                      <td className="px-6 py-4 hidden md:table-cell max-w-md truncate text-gray-500">
                        {item.description || "—"}
                      </td>
                      <td className="px-6 py-4">
                        {item.isActive ? (
                          <span className="inline-flex items-center gap-1 text-xs font-medium bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">
                            <Check className="w-3 h-3" /> Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full border border-gray-200">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openModal(item)}
                            className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors cursor-pointer"
                            title={`Edit ${isCategory ? "Category" : "Brand"}`}
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title={`Delete ${isCategory ? "Category" : "Brand"}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-gray-50 border-t border-gray-200 text-sm">
                <p className="text-gray-600 text-xs sm:text-sm">
                  Showing <span className="font-semibold">{startIndex + 1}</span> to{" "}
                  <span className="font-semibold">
                    {Math.min(startIndex + itemsPerPage, filteredItems.length)}
                  </span>{" "}
                  of <span className="font-semibold">{filteredItems.length}</span> {isCategory ? "categories" : "brands"}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="text-xs font-medium text-gray-700 px-2">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Context-Aware Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl relative border border-gray-100">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                  {isCategory ? "Category Setup" : "Brand Setup"}
                </span>
                <h2 className="text-lg font-bold text-gray-900">
                  {editingItem ? "Edit" : "Create"} {isCategory ? "Category" : "Brand"}
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {isCategory ? "Category Name *" : "Brand Name *"}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-sm"
                  placeholder={isCategory ? "e.g. Spices & Masalas" : "e.g. Ram Bandhu"}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {isCategory
                    ? "The general product grouping (e.g., Electronics, Spices)."
                    : "The manufacturer or brand identity (e.g., Apple, Ram Bandhu)."}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {isCategory ? "Category Slug" : "Brand Slug"}
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2 border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm font-mono text-gray-600"
                  placeholder={isCategory ? "e.g. spices-and-masalas" : "e.g. ram-bandhu"}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {isCategory ? "Category Description" : "Brand Overview / Bio"}
                </label>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm"
                  placeholder={
                    isCategory
                      ? "Briefly describe what kind of items belong in this category..."
                      : "Briefly describe the brand or company history..."
                  }
                ></textarea>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Show this {isCategory ? "category" : "brand"} publicly in the catalog
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg cursor-pointer shadow-sm"
                >
                  {editingItem ? "Update" : "Create"} {isCategory ? "Category" : "Brand"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}