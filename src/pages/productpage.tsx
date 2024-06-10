import React, { useState, useEffect } from "react";
import { apiSearch } from "../services/product.services";
import ProductModel from "../models/product.model"; 
import { IonIcon } from '@ionic/react';
import { menuOutline } from 'ionicons/icons';
import { arrowBackOutline } from 'ionicons/icons';
import { arrowForwardOutline } from 'ionicons/icons';
import { formatCurrency } from '../utils/format';
import  AddProduct from '../components/modals/addproduct';
import { apiGetAllCategory } from '../services/product.services';

import { Button } from "antd";
import  EditProduct from '../components/modals/editproduct';
import  DeleteProduct from '../components/modals/deleteproduct';

const Product = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchData();
    fetchAllCategories();
  }, [page, pageSize]);

  const fetchData = async () => {
    setLoading(true);
    const results = await apiSearch({
      page: page,
      pageSize: pageSize,
    });
    setProducts(results.data);
    setTotalItems(results.totalItems);
    setLoading(false);
  };

  const handlePageChange = (newPage:any) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (pageSize:any) => {
    setPage(1); 
    setPageSize(pageSize);
  };
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  const handleAddProductClick = () => {
    setShowAddProductModal(true);
  };
// Hàm để lấy tất cả danh mục
const fetchAllCategories = async () => {
  try {
    const allCategories = await apiGetAllCategory();
    setCategories(allCategories); // Cập nhật danh sách danh mục vào state
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};
// Hàm xử lý khi nhấn nút "Sửa"
const handleEditClick = (product: ProductModel) => {
  setEditingProduct(product);
  setShowEditModal(true);
};
const handleDeleteClick = (product: ProductModel) => {
  setEditingProduct(product);
  setShowDeleteModal(true);
};
    return(
        <div className="main">
        <div className="topbar">
          <div id="clock" className="header-common" />
          <div className="user">
            <img src="{{asset('/Img/logoavatar.jpg.jpg')}}" alt="" />
          </div>
        </div>
        {/* ======================= Cards ================== */}
        <div className="menu-right">
  <div className="app-title">
    <ul className="app-header-title">
      <li className="header-title-item header-common ">
        <b>Danh sách sản phẩm</b>
      </li>
    </ul>
  </div>
  <div className="row-element-button">
    <div className="row-button">
    <div className="button-elemet">
              <button type="button" id="AddSanPham" onClick={handleAddProductClick}>
                <i className="fa-solid fa-plus" /> Tạo mới sản phẩm
              </button> 
            </div>
      <div className="button-elemet-delete">
        <button type="button" id="DeleteSanPham">
          <i className="fa-solid fa-trash" /> Xóa nhiều
        </button>
      </div>
    </div>
    <div className="row-search-element">
      <label htmlFor="">Tìm kiếm:</label>
      <input
        type="search"
        className="from-control-search"
        ng-model="productNameSearch"
      />
      <button ng-click="searchProduct()">
        <i className="fa-solid fa-magnifying-glass icon-search" />
      </button>
    </div>
  </div>
  <div className="product-right-element">
    <form action="">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên sản phẩm</th>
            <th>Ảnh sản phẩm</th>
            <th>Giá</th>
            <th>Danh mục</th>
            <th>Chức năng</th>
            <th>Chọn</th>
          </tr>
        </thead>
        <tbody>
        {products.map(product => (
          <tr key={product.maSP}>
            <td>{product.maSP}</td>
            <td>{product.tenSP}</td>
            <td>
              <img
                style={{ width: 70, height: 60 }}
                src={product.hinhAnh} // Sử dụng thuộc tính hinhAnh của sản phẩm
                alt=""
              />
            </td>
            <td>{formatCurrency(product.gia)}đ</td>
            <td>{product.tenDanhMuc}</td>
            <td>
            <button
                      className="edit-button"
                      title="Sửa"
                      type="button"
                      onClick={() => handleEditClick(product)}
                    >
                      Sửa
                    </button>
                    <button
                    className="delete-button"
                    title="Xóa"
                    type="button"
                    onClick={() => handleDeleteClick(product)}
                  >
                    Xóa
                  </button>
            </td>
            <td>
              <input type="checkbox" name="productCheckbox" />
            </td>
          </tr>
        ))}
      </tbody>
      </table>
    </form>
  </div>
  {/* <div id="confirmDelete" class="confirmation">
              <p>Bạn có chắc muốn xóa sản phẩm này?</p>
              <button id="confirmButton" class="confirm-button" ng-click="deleteProduct(x.maSanPham)">Xác nhận</button>
              <button id="cancelButton" class="cancel-button">Hủy bỏ</button>
          </div> */}
     <ul className="pageul">
        {/* Pagination */}
        <Button className="button-page" 
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Sau
        </Button>
        <span className="title-page">{page}</span>
        <Button className="button-page"
          onClick={() => handlePageChange(page + 1)}
          disabled={page * pageSize >= totalItems}
        >
          Trước
        </Button>
        {/* Option to change page size */}
        <select className="select-item"
          onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
          value={pageSize}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </ul>
</div>
<AddProduct visible={showAddProductModal} setVisible={setShowAddProductModal} />
<EditProduct
        product={editingProduct}
        visible={showEditModal}
        setVisible={setShowEditModal}
      />
      <DeleteProduct
      productId={editingProduct?.maSP} 
      visible={showDeleteModal}
      setVisible={setShowDeleteModal}
    />
      </div>
    )
}
export default Product;