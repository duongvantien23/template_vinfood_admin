import React, { useState, useEffect } from "react";
import { apiGetAllOrder } from "../services/order.services";
import OrderModel from "../models/order.model"; 
import Kho from "../models/warehouse.model"; 
import { IonIcon } from '@ionic/react';
import { cartOutline } from 'ionicons/icons';
import { cashOutline } from 'ionicons/icons';
import { apiThongKeDonHang } from "../services/statistical.services";
import { apiGetAllStatus, apiGetStatusById, apiGetAllSapHet} from "../services/statistical.services";
import ProductOutModal from '../components/modals/productout'; 

interface Status {
  id: string; 
  tenTrangThai: string; 
}
const Statistical = () => {
  const [ngayBatDau, setNgayBatDau] = useState("");
  const [ngayKetThuc, setNgayKetThuc] = useState("");
  const [tongDonHang, setTongDonHang] = useState(0);
  const [tongDoanhThu, setTongDoanhThu] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState<Status | undefined>(); // Thay đổi giá trị ban đầu từ null sang undefined
  const [statusOptions, setStatusOptions] = useState<Status[]>([]); 
  const [orderList, setOrderList] = useState<OrderModel[]>([]); 
  const [products, setProducts] = useState<Kho[]>([]);
  const [showProductOutModal, setShowProductOutModal] = useState(false);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const statusData = await apiGetAllStatus();
        console.log("Dữ liệu trạng thái:", statusData); // Kiểm tra dữ liệu trạng thái được lấy từ API
        setStatusOptions(statusData);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    }
    const fetchProducts = async () => {
      try {
        const productData: Kho[] = await apiGetAllSapHet();
        setProducts(productData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
    fetchStatus();
  }, []);  

  useEffect(() => {
    console.log("selectedStatus changed:", selectedStatus); // In selectedStatus ra console để kiểm tra
    // Gọi API để lấy danh sách đơn hàng khi trạng thái được chọn thay đổi
    async function fetchOrdersByStatus() {
      try {
        if (selectedStatus) {
          const statusId = selectedStatus.id;
          const orderData = await apiGetStatusById(statusId);
          console.log("Danh sách đơn hàng:", orderData); // In danh sách đơn hàng ra console để kiểm tra
          setOrderList(orderData);
        }
      } catch (error) {
        console.error("Error fetching orders by status:", error);
      }
    }
    fetchOrdersByStatus();
  }, [selectedStatus]);
  
  
  const handleLocTimKiem = async () => {
    try {
      const ngayBatDauDate = new Date(ngayBatDau);
      const ngayKetThucDate = new Date(ngayKetThuc);
      const results = await apiThongKeDonHang(ngayBatDauDate, ngayKetThucDate);
      const result = results[0];

      const soDonHang = typeof result.soDonHang === 'number' ? result.soDonHang : parseInt(result.soDonHang);
      const tongDoanhThu = typeof result.doanhThu === 'number' ? result.doanhThu : parseFloat(result.doanhThu);
      
      setTongDonHang(soDonHang);
      setTongDoanhThu(tongDoanhThu);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleProductOutClick = () => {
    setShowProductOutModal(true);
  };
const formattedTongDoanhThu = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND'
}).format(tongDoanhThu);
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
        <b>Báo cáo thống kê</b>
      </li>
    </ul>
    <div id="clock" className="header-common" />
  </div>
  <div className="row-element-button">
    <div className="row-button">
    <div className="button-elemet-date">
                            <label htmlFor="">Từ ngày:</label>
                            <input type="date" value={ngayBatDau} onChange={(e) => setNgayBatDau(e.target.value)} />
                        </div>
                        <div className="button-elemet-date">
                            <label htmlFor="">Đến ngày:</label>
                            <input type="date" value={ngayKetThuc} onChange={(e) => setNgayKetThuc(e.target.value)} />
                        </div>
                        <div className="button-elemet-searchs">
                            <button type="button" onClick={handleLocTimKiem}>
                                Lọc tìm kiếm
                 </button>
      </div>
    </div>
  </div>
  <div className="row-element-button">
    <div className="row-button">
      <div className="button-elemet-date">
        <label className="control-label">Trạng thái </label>
        <select 
        value={selectedStatus ? selectedStatus.id : ''} 
        onChange={(e) => {
            const selectedStatusId = e.target.value;
            const foundStatus: Status | undefined = statusOptions.find(status => status.id === selectedStatusId);
            setSelectedStatus(foundStatus);
            console.log("selectedStatus changed:", foundStatus); // In ra giá trị mới của selectedStatus            
        }}
    >
        <option value="">-- Chọn trạng thái --</option>
        {statusOptions.map(status => (
            <option key={status.id} value={status.id}>{status.tenTrangThai}</option>
        ))}
    </select>
      </div>
      <div className="button-elemet-searchs icon-date-product">
        <button type="button" id="AddSanPham" onClick={handleProductOutClick}>
          Xem sản phẩm sắp hết <i className="fa-regular fa-exclamation" />
        </button>
      </div>
    </div>
  </div>
  <div className="info-container">
                    <div className="icon-info">
                        <IonIcon icon={cartOutline} className="icon3" />
                        <div className="info info3">
                            <h4>Tổng đơn hàng</h4>
                            <p>
                                <b className="font-order">{tongDonHang}</b>
                            </p>
                        </div>
                    </div>
                    <div className="icon-info">
                        <IonIcon icon={cashOutline} className="icon4" />
                        <div className="info info4">
                            <h4>Tổng doanh thu</h4>
                            <p>
                            <b className="font-order">{formattedTongDoanhThu}</b>
                            </p>
                        </div>
                    </div>
                </div>
  <div className="product-right-element">
    <form action="">
      <table>
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Tên khách hàng</th>
            <th>Địa chỉ giao hàng</th>
            <th>Ngày đặt hàng</th>
          </tr>
        </thead>
        <tbody>
            {orderList.map(order => (
              <tr key={order.maDonHang}>
                <td>{order.maDonHang}</td>
                <td>{order.tenKH}</td>
                <td>{order.diaChiGiaoHang}</td>
                <td>{order.ngayDatHang.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
      </table>
    </form>
  </div>
  <div id="overlay" className="overlay" />
  <div className="modal-container" id="myModal">
    <div className="modal-body">
      <div className="modal-header">
        <h5 className="modal-title">Sản phẩm sắp hết</h5>
      </div>
      <form>
        <table>
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Số lượng còn</th>
            </tr>
          </thead>
          <tbody>
            {/*Hàm searchPhanTrang x in listItem*/}
            <tr ng-repeat="x in productdate">
              <td>
                {"{"}
                {"{"}x.tenSP{"}"}
                {"}"}
              </td>
              <td>
                {"{"}
                {"{"}x.soLuong{"}"}
                {"}"}
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-secondary"
        data-dismiss="modal"
        id="closeModalBtn"
      >
        Đóng
      </button>
    </div>
  </div>
</div>
      <ProductOutModal 
        visible={showProductOutModal} 
        setVisible={setShowProductOutModal} 
      />
      </div>
    )
}
export default Statistical;
