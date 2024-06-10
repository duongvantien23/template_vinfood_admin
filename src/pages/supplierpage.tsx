import React, { useState, useEffect } from "react";
import NhaCungCap from "../models/supplier.model"; 
import { apiGetAllNhaCC } from '../services/product.services';

const Supplier = () => {
    const [suppliers, setSuppliers] = useState<NhaCungCap[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const supplierData: NhaCungCap[] = await apiGetAllNhaCC();
                setSuppliers(supplierData);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

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
                            <b>Danh sách nhà cung cấp</b>
                        </li>
                    </ul>
                </div>
                <div className="row-element-button">
                    <div className="row-button">
                        <div className="button-elemet">
                            <button type="button" id="AddSanPham">
                                <i className="fa-solid fa-plus" /> Tạo mới nhà cung cấp
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
                                    <th>Tên nhà cung cấp</th>
                                    <th>Chức năng</th>
                                    <th>Chọn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {suppliers.map(supplier => (
                                    <tr key={supplier.maNhaCC}>
                                        <td>{supplier.maNhaCC}</td>
                                        <td>{supplier.tenNhaCC}</td>
                                        <td>
                                        <button className="edit-button" title="Sửa" type="button">
                                            Sửa
                                        </button>
                                        <button className="delete-button" title="Xóa" type="button">
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
      </div>
    )
}
export default Supplier;
