import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { AuthContext } from '../../context/AuthContext';

const List = ({ url }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Modal States
  const [deleteId, setDeleteId] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

  // Fetch Products
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/v1/products`);
      if (response.data.success) {
        setData(response.data.data);
      } else {
        toast.error('Failed to fetch products');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  // Handle Delete
  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const response = await axios.post(
        `${url}/api/v1/products/${deleteId}`,
        { id: deleteId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            token,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || 'Product removed successfully');
        setData((prev) => prev.filter((item) => item._id !== deleteId));
      } else {
        toast.error(response.data.message || 'Error removing product');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete product');
    } finally {
      setDeleteId(null);
    }
  };

  // Handle Update Submit
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${url}/api/v1/products/${editProduct._id}`,
        editProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            token,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || 'Product updated successfully');
        fetchData();
        setEditProduct(null);
      } else {
        toast.error(response.data.message || 'Update failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update product');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(data.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 w-full">
      <div className="mx-auto w-full space-y-6">
        
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">All Products</h1>
            <p className="text-sm text-slate-500">Manage catalog items.</p>
          </div>
          <button
            onClick={fetchData}
            className="self-start rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Refresh Catalog
          </button>
        </div>

        {/* Data Table Container */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {loading ? (
            <div className="flex h-64 items-center justify-center text-slate-500">
              Loading products...
            </div>
          ) : data.length === 0 ? (
            <div className="flex h-64 items-center justify-center text-slate-500">
              No products found in the catalog.
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="px-6 py-4">Product</th>
                      <th className="px-6 py-4">Brand</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Stock</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentItems.map((item) => {
                      const primaryImg =
                        item.images?.find((img) => img.isPrimary)?.url ||
                        item.images?.[0]?.url;

                      return (
                        <tr key={item._id} className="transition hover:bg-slate-50/80">
                          {/* Image & Name */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={primaryImg || 'https://via.placeholder.com/60'}
                                alt={item.name}
                                className="h-12 w-12 rounded-lg border border-slate-200 object-cover"
                              />
                              <div>
                                <p className="font-semibold text-slate-900">{item.name}</p>
                                <p className="text-xs text-slate-400">SKU: {item.sku || 'N/A'}</p>
                              </div>
                            </div>
                          </td>

                          {/* Brand */}
                          <td className="px-6 py-4 font-medium text-slate-700">
                            {item.brand?.name || 'N/A'}
                          </td>

                          {/* Category */}
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
                              {item.category?.name || 'Uncategorized'}
                            </span>
                          </td>

                          {/* Price */}
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="font-semibold text-slate-900">₹{item.sellingPrice}</span>
                              {item.mrp > item.sellingPrice && (
                                <span className="text-xs text-slate-400 line-through">₹{item.mrp}</span>
                              )}
                            </div>
                          </td>

                          {/* Stock Status */}
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                item.stock > item.lowStockThreshold
                                  ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                                  : item.stock > 0
                                  ? 'border border-amber-200 bg-amber-50 text-amber-700'
                                  : 'border border-red-200 bg-red-50 text-red-700'
                              }`}
                            >
                              {item.stock} in stock
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setEditProduct(item)}
                                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => setDeleteId(item._id)}
                                className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* --- PAGINATION BAR --- */}
              <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>Showing</span>
                  <span className="font-semibold text-slate-700">{indexOfFirstItem + 1}</span>
                  <span>to</span>
                  <span className="font-semibold text-slate-700">
                    {Math.min(indexOfLastItem, data.length)}
                  </span>
                  <span>of</span>
                  <span className="font-semibold text-slate-700">{data.length}</span>
                  <span>entries</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="ml-2 rounded border border-slate-300 bg-white p-1 text-xs outline-none"
                  >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                  </select>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white"
                  >
                    Previous
                  </button>

                  {[...Array(totalPages)].map((_, idx) => (
                    <button
                      key={idx + 1}
                      onClick={() => handlePageChange(idx + 1)}
                      className={`rounded-lg px-3 py-1 text-xs font-medium transition ${
                        currentPage === idx + 1
                          ? 'bg-slate-900 text-white'
                          : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* --- EDIT PRODUCT MODAL --- */}
      {editProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900">Edit Product Details</h3>
              <button
                onClick={() => setEditProduct(null)}
                className="text-xl font-bold text-slate-400 hover:text-slate-600"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4 text-left">
              {/* Product Name */}
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">
                  Product Name
                </label>
                <input
                  type="text"
                  value={editProduct.name || ''}
                  onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-sm outline-none focus:border-slate-900"
                  required
                />
              </div>

              {/* SKU & Net Weight */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    value={editProduct.sku || ''}
                    onChange={(e) => setEditProduct({ ...editProduct, sku: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-sm outline-none focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">
                    Net Weight (e.g., 500g)
                  </label>
                  <input
                    type="text"
                    value={editProduct.netWeight || ''}
                    onChange={(e) => setEditProduct({ ...editProduct, netWeight: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-sm outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              {/* Pricing Section */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">
                    MRP (₹)
                  </label>
                  <input
                    type="number"
                    value={editProduct.mrp || 0}
                    onChange={(e) => setEditProduct({ ...editProduct, mrp: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-sm outline-none focus:border-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">
                    Selling Price (₹)
                  </label>
                  <input
                    type="number"
                    value={editProduct.sellingPrice || 0}
                    onChange={(e) => setEditProduct({ ...editProduct, sellingPrice: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-sm outline-none focus:border-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">
                    GST Rate (%)
                  </label>
                  <input
                    type="number"
                    value={editProduct.gstPercent || 0}
                    onChange={(e) => setEditProduct({ ...editProduct, gstPercent: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-sm outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              {/* Stock Management */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={editProduct.stock || 0}
                    onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-sm outline-none focus:border-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">
                    Low Stock Alert Level
                  </label>
                  <input
                    type="number"
                    value={editProduct.lowStockThreshold || 0}
                    onChange={(e) => setEditProduct({ ...editProduct, lowStockThreshold: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-sm outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">
                  Short Description
                </label>
                <input
                  type="text"
                  value={editProduct.shortDescription || ''}
                  onChange={(e) => setEditProduct({ ...editProduct, shortDescription: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-sm outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">
                  Detailed Description
                </label>
                <textarea
                  rows={3}
                  value={editProduct.description || ''}
                  onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-sm outline-none focus:border-slate-900"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setEditProduct(null)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Confirm Deletion</h3>
            <p className="text-sm text-slate-600">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 border-t pt-4">
              <button
                onClick={() => setDeleteId(null)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default List;