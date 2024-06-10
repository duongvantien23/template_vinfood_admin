import { DetailtOrder } from './detailtorder.model';
export interface Order {
    maDonHang: string,
    maKH: string,
    maTrangThai: string,
    maPhuongThuc: string,
    diaChiGiaoHang: string,
    ngayDatHang: Date,
    tenPhuongThuc: string,
    tenTrangThai: string,
    tenSP: string,
    tenKH: string,
    list_json_chitiet_dh: DetailtOrder[];
}
export default Order;

