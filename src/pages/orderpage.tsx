import React, { useState, useEffect } from "react";
import { apiGetAllOrder } from "../services/order.services";
import OrderModel from "../models/order.model"; 
import { formatCurrency } from '../utils/format';
import { apiGetAllCategory } from '../services/product.services';
import { Button } from "antd";
import AddOrder from "../components/modals/addorder";
import EditOrder from "../components/modals/editorder";
import DeleteOrder from "../components/modals/deleteorder";


const Order = () => {
    const [orders, setOrders] = useState<OrderModel[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedOrderIdToDelete, setSelectedOrderIdToDelete] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersData: OrderModel[] = await apiGetAllOrder();
                setOrders(ordersData);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const showModal = () => {
        setIsModalVisible(true);
    };

    // Hàm để đóng modal
    const handleCancel = () => {
        setIsModalVisible(false);
    };
 // Hàm để hiển thị modal sửa order
 const handleEditOrder = (orderId: string) => {
    setSelectedOrderId(orderId); // Lưu ID của order được chọn
    setIsEditModalVisible(true);
};

// Hàm để đóng modal sửa order
const handleCancelEditOrder = () => {
    setIsEditModalVisible(false);
};
// Hàm để hiển thị modal xác nhận xóa đơn hàng
const handleDeleteOrder = (orderId: string) => {
    setSelectedOrderIdToDelete(orderId);
    setIsDeleteModalVisible(true);
};
// Hàm để đóng modal xác nhận xóa đơn hàng
const handleCancelDeleteOrder = () => {
    setIsDeleteModalVisible(false);
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
                            <b>Danh sách đơn hàng</b>
                        </li>
                    </ul>
                </div>
                <div className="row-element-button">
                    <div className="row-button">
                        <div className="button-elemet">
                            <button type="button" id="AddSanPham" onClick={showModal}>
                                <i className="fa-solid fa-plus" /> Tạo mới đơn hàng
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
                                    <th>Tên khách hàng</th>
                                    <th>Trạng thái</th>
                                    <th>Phương thức thanh toán</th>
                                    <th>Sản phẩm</th>
                                    <th>Địa chỉ</th>
                                    <th>Chức năng</th>
                                    <th>Chọn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.maDonHang}>
                                        <td>{order.maDonHang}</td>
                                        <td>{order.tenKH}</td>
                                        <td>{order.tenTrangThai}</td>
                                        <td>{order.tenPhuongThuc}</td>
                                        <td>{order.tenSP}</td>
                                        <td>{order.diaChiGiaoHang}</td>
                                        <td>
                                        <button className="edit-button" title="Sửa" type="button" onClick={() => handleEditOrder(order.maDonHang)}>
                                            Sửa
                                        </button>
                                        <button className="delete-button" title="Xóa" type="button" onClick={() => handleDeleteOrder(order.maDonHang)}>
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
        {/* Modal */}
        <AddOrder visible={isModalVisible} setVisible={setIsModalVisible} />
        <EditOrder orderId={selectedOrderId} visible={isEditModalVisible} setVisible={setIsEditModalVisible} />
        <DeleteOrder 
                OrderId={selectedOrderIdToDelete ? selectedOrderIdToDelete : ''} 
                visible={isDeleteModalVisible} 
                setVisible={setIsDeleteModalVisible} 
            />
      </div>
    )
}
export default Order;
