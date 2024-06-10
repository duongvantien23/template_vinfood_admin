import "../../assets/Css/style.css";
import { IonIcon } from '@ionic/react';
import { homeOutline } from 'ionicons/icons';
import { bagRemoveOutline } from 'ionicons/icons';
import { accessibilityOutline } from 'ionicons/icons';
import { bagHandleOutline } from 'ionicons/icons';
import { browsersOutline } from 'ionicons/icons';
import { storefrontOutline } from 'ionicons/icons';
import { receiptOutline } from 'ionicons/icons';
import { tvOutline } from 'ionicons/icons';
import { logOutOutline } from 'ionicons/icons';
import { peopleOutline } from 'ionicons/icons';
import { idCardOutline } from 'ionicons/icons';
import { podiumOutline } from 'ionicons/icons';
import { cubeOutline } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';


const Navbar = () =>{
  const [selectedItem, setSelectedItem] = useState(null);
  const [logoutConfirmed, setLogoutConfirmed] = useState(false);
  const handleItemClick = (itemName:any) => {
    setSelectedItem(itemName);
  };
  const handleLogout = () => {
    if (!logoutConfirmed) {
      const confirmed = window.confirm('Bạn có muốn đăng xuất không?');
      if (confirmed) {
        // Xác nhận đăng xuất
        setLogoutConfirmed(true);
      }
    } else {
      // Chuyển hướng đến trang đăng xuất
      window.location.href = '/';
    }
  };
    return(
        <>
        <div className="navigation">
        <ul>
          <li>
            <a href="#">
              <span className="icon">
              <IonIcon icon={idCardOutline} />
              </span>
              <span className="title">Cửa Hàng Vinfood</span>
              </a>
          </li>
          <li>
            <a href="/index">
              <span className="icon">
              <IonIcon icon={homeOutline} />
              </span>
              <span className="title">Tổng Quan</span>
            </a>
          </li>
          <li className={selectedItem === 'Sản Phẩm' ? 'selected' : ''}>
          <Link to="/sanpham" onClick={() => handleItemClick('Sản Phẩm')}>
            <span className="icon">
              <IonIcon icon={bagRemoveOutline} />
            </span>
            <span className="title">Sản Phẩm</span>
          </Link>
        </li>
          <li className={selectedItem === 'Danh Mục' ? 'selected' : ''}>
          <Link to="/danhmuc" onClick={() => handleItemClick('Danh Mục')}>
              <span className="icon">
              <IonIcon icon={receiptOutline} />
              </span>
              <span className="title">Danh Mục</span>
              </Link>
          </li>
          <li className={selectedItem === 'Khách Hàng' ? 'selected' : ''}>
          <Link to="/khachhang" onClick={() => handleItemClick('Khách Hàng')}>
              <span className="icon">
              <IonIcon icon={accessibilityOutline} />
              </span>
              <span className="title">Khách Hàng</span>
              </Link>
          </li>
          <li className={selectedItem === 'Đơn Hàng' ? 'selected' : ''}>
          <Link to="/donhang" onClick={() => handleItemClick('Đơn Hàng')}>
              <span className="icon">
              <IonIcon icon={bagHandleOutline} />
              </span>
              <span className="title">Đơn Hàng</span>
              </Link>
          </li>
          <li className={selectedItem === 'Kho Hàng Hóa' ? 'selected' : ''}>
          <Link to="/khohang" onClick={() => handleItemClick('Kho Hàng Hóa')}>
              <span className="icon">
              <IonIcon icon={cubeOutline} />
              </span>
              <span className="title">Kho Hàng Hóa</span>
              </Link>
          </li>
          <li>
            <a href="#">
              <span className="icon">
              <IonIcon icon={browsersOutline} />
              </span>
              <span className="title">Hóa Đơn Nhập</span>
            </a>
          </li>
          <li className={selectedItem === 'Nhà Cung Cấp' ? 'selected' : ''}>
          <Link to="/nhacungcap" onClick={() => handleItemClick('Nhà Cung Cấp')}>
              <span className="icon">
              <IonIcon icon={storefrontOutline} />
              </span>
              <span className="title">Nhà Cung Cấp</span>
              </Link>
          </li>
          <li className={selectedItem === 'Tin Tức' ? 'selected' : ''}>
          <Link to="/tintuc" onClick={() => handleItemClick('Tin Tức')}>
              <span className="icon">
              <IonIcon icon={tvOutline} />
              </span>
              <span className="title">Tin Tức</span>
              </Link>
          </li>
          <li className={selectedItem === 'Thống Kê' ? 'selected' : ''}>
          <Link to="/thongke" onClick={() => handleItemClick('Thống Kê')}>
              <span className="icon">
              <IonIcon icon={podiumOutline} />
              </span>
              <span className="title">Thống Kê</span>
              </Link>
          </li>
          <li className={selectedItem === 'Tài khoản người dùng' ? 'selected' : ''}>
          <Link to="/accountkh" onClick={() => handleItemClick('Tài khoản người dùng')}>
              <span className="icon">
              <IonIcon icon={peopleOutline} />
              </span>
              <span className="title">Tài Khoản Người Dùng</span>
              </Link>
          </li>
          <li>
          <Link to="/" onClick={handleLogout}>
              <span className="icon">
              <IonIcon icon={logOutOutline} />
              </span>
              <span className="title">Sign Out</span>
            </Link>
          </li>
        </ul>
      </div> 
      </>     
    )
}
export default Navbar;