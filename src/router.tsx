import Product from './pages/productpage';
import Order from './pages/orderpage';
import Statistical from './pages/statisticalpage';
import Category from './pages/categorypage';
import Customer from './pages/customerpage';
import Supplier from './pages/supplierpage';
import Login from './pages/loginpage';
import Warehouse from './pages/warehousepage';
import Client from './pages/clientpage';
import Blogs from './pages/blogpage';

// Định nghĩa các hằng số cho đường dẫn
const ROUTE_PATHS = {
    Product: "/sanpham",
    Order: "/donhang",
    Statistical: "/thongke",
    Category: "/danhmuc",
    Customer: "/accountkh",
    Supplier: "/nhacungcap",
    Warehouse: "/khohang",
    Client: "/khachhang",
    Blogs: "/tintuc",
    Login: "/"
};

export const routes = [
    { path: ROUTE_PATHS.Product, element: <Product />, exact: true, description: "Quản lý sản phẩm" },
    { path: ROUTE_PATHS.Order, element: <Order />, exact: true, description: "Quản lý đơn hàng" },
    { path: ROUTE_PATHS.Statistical, element: <Statistical />, exact: true, description: "Quản lý thống kê" },
    { path: ROUTE_PATHS.Category, element: <Category />, exact: true, description: "Quản lý danh mục" },
    { path: ROUTE_PATHS.Customer, element: <Customer />, exact: true, description: "Quản lý tài khoản khách hàng" },
    { path: ROUTE_PATHS.Supplier, element: <Supplier />, exact: true, description: "Quản lý nhà cung cấp" },
    { path: ROUTE_PATHS.Warehouse, element: <Warehouse />, exact: true, description: "Quản lý kho hàng" },
    { path: ROUTE_PATHS.Client, element: <Client />, exact: true, description: "Quản lý khách hàng" },
    { path: ROUTE_PATHS.Blogs, element: <Blogs />, exact: true, description: "Quản lý tin tức" },
    { path: ROUTE_PATHS.Login, element: <Login />, exact: true, description: "Đăng nhập", hideNavbar: true },
];