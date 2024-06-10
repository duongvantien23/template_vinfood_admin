import React, { useState, useEffect } from "react";
import Kho from "../models/warehouse.model"; 
import { apiGetAllWarehouse, apiDelete } from '../services/warehouse.services';
import AddWarehouse from '../components/modals/addwarehouse'; 
import EditWarehouse from '../components/modals/editwarehouse';
import DeleteWarehouse from '../components/modals/deletewarehouse';

const Warehouse = () => {
  const [products, setProducts] = useState<Kho[]>([]);
  const [showAddWarehouseModal, setShowAddWarehouseModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState<Kho | null>(null);
  const [deletingWarehouse, setDeletingWarehouse] = useState<Kho | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const productData: Kho[] = await apiGetAllWarehouse();
        setProducts(productData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleAddWarehouseClick = () => {
    setShowAddWarehouseModal(true);
  };
  
  const handleEditClick = (warehouse: Kho) => {
    setEditingWarehouse(warehouse);
    setShowEditModal(true);
  };

  const handleDeleteClick = (warehouse: Kho) => {
    setDeletingWarehouse(warehouse);
    setShowDeleteModal(true);
  };

  return (
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
              <b>Danh sách số lượng sản phẩm trong kho</b>
            </li>
          </ul>
        </div>
        <div className="row-element-button">
          <div className="row-button">
            <div className="button-elemet">
              <button type="button" id="AddSanPham" onClick={handleAddWarehouseClick}>
                <i className="fa-solid fa-plus" /> Tạo mới kho
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
                  <th>Số lượng</th>
                  <th>Chức năng</th>
                  <th>Chọn</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.maKho}>
                    <td>{product.maKho}</td>
                    <td>{product.tenSP}</td>
                    <td>
                      <img
                        style={{ width: 70, height: 60 }}
                        src={product.hinhAnh} // Sử dụng thuộc tính hinhAnh của sản phẩm
                        alt=""
                      />
                    </td>
                    <td>{product.soLuong}</td>
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
        <ul className="pageul">
        </ul>
      </div>
      <AddWarehouse visible={showAddWarehouseModal} setVisible={setShowAddWarehouseModal} />
      <EditWarehouse 
        warehouse={editingWarehouse} 
        visible={showEditModal} 
        setVisible={setShowEditModal} 
      />
      <DeleteWarehouse 
        warehouseId={deletingWarehouse?.maKho || ''} 
        visible={showDeleteModal} 
        setVisible={setShowDeleteModal} 
      />
    </div>
  );
};

export default Warehouse;
