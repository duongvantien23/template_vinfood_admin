import React, { useState, useEffect } from 'react';
import { Modal, Form, Select, Button, message, DatePicker, InputNumber,Input } from 'antd';
import { apiGetOrderById, apiUpdateOrder } from '../../services/order.services';
import moment from 'moment';
import { apiGetAllStatus, apiGetAllMethod, apiGetAllSP, apiGetAllKH } from '../../services/order.services';

const { Option } = Select;

interface EditOrderProps {
  orderId: any;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditOrder: React.FC<EditOrderProps> = ({ orderId, visible, setVisible }) => {
  const [form] = Form.useForm();
  const [statusList, setStatusList] = useState<any[]>([]);
  const [methodList, setMethodList] = useState<any[]>([]);
  const [productList, setProductList] = useState<any[]>([]);
  const [customerList, setCustomerList] = useState<any[]>([]);
  const [order, setOrder] = useState<any>(null);
  const [detailList, setDetailList] = useState<any[]>([]); // Chi tiết đơn hàng

  useEffect(() => {
    if (visible && orderId) {
      fetchOrderData(orderId);
      fetchStatusList();
      fetchMethodList();
      fetchProductList();
      fetchCustomerList();
    }
  }, [visible, orderId]);

  const fetchStatusList = async () => {
    try {
      const data = await apiGetAllStatus();
      setStatusList(data);
    } catch (error) {
      console.error('Failed to fetch status list:', error);
    }
  };

  const fetchMethodList = async () => {
    try {
      const data = await apiGetAllMethod();
      setMethodList(data);
    } catch (error) {
      console.error('Failed to fetch method list:', error);
    }
  };

  const fetchProductList = async () => {
    try {
      const data = await apiGetAllSP();
      setProductList(data);
    } catch (error) {
      console.error('Failed to fetch product list:', error);
    }
  };
  const fetchCustomerList = async () => {
    try {
      const data = await apiGetAllKH();
      setCustomerList(data);
    } catch (error) {
      console.error('Failed to fetch customer list:', error);
    }
  };
  const fetchOrderData = async (orderId: any) => {
    try {
      const data = await apiGetOrderById(orderId);
      setOrder(data);
      form.setFieldsValue({
        maDonHang: data.maDonHang,
        maKH: data.maKH,
        maTrangThai: data.maTrangThai,
        maPhuongThuc: data.maPhuongThuc,
        diaChiGiaoHang: data.diaChiGiaoHang,
        ngayDatHang: moment(data.ngayDatHang),
        maSP: data.maSP, 
        soLuong: data.soLuong, 
        tongGia: data.tongGia, 
        maGiamGia: data.maGiamGia
      });
    } catch (error) {
      console.error('Failed to fetch order:', error);
    }
  };
  

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = async (values: any) => {
    try {
      const updatedOrder = {
        ...order,
        ...values,
        list_json_chitiet_dh: [
            {
              maSP: form.getFieldValue('maSP'),
              soLuong: form.getFieldValue('soLuong'),
              tongGia: form.getFieldValue('tongGia'),
              maGiamGia: form.getFieldValue('maGiamGia')
            }
          ]
      };
      await apiUpdateOrder(updatedOrder);
      message.success('Cập nhật đơn hàng thành công!');
      setVisible(false);
      // Reload page
      window.location.reload();
    } catch (error) {
      message.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  };

  return (
    <>
      <Modal
        title="Sửa đơn hàng"
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Đóng
          </Button>,
          <Button key="submit" type="primary" onClick={form.submit}>
            Lưu lại
          </Button>,
        ]}
      >
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{ maTrangThai: '', maKH: '', maPhuongThuc: '', ngayDatHang: moment(), maCTDH: '', maSP: '', soLuong: 0, tongGia: 0, maGiamGia: '' }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
        >
             <Form.Item label="Mã đơn hàng" name="maDonHang">
            <Input disabled />
           </Form.Item>
            <Form.Item label="Tên khách hàng" name="maKH" rules={[{ required: true, message: 'Vui lòng chọn khách hàng!' }]}>
            <Select placeholder="Chọn khách hàng">
              {customerList.map(customer => (
                <Option key={customer.maKH} value={customer.maKH}>
                  {customer.tenKH}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Trạng thái" name="maTrangThai" rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}>
            <Select placeholder="Chọn trạng thái">
              {statusList.map(status => (
                <Option key={status.maTrangThai} value={status.maTrangThai}>
                  {status.tenTrangThai}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Phương thức" name="maPhuongThuc" rules={[{ required: true, message: 'Vui lòng chọn phương thức!' }]}>
            <Select placeholder="Chọn phương thức">
              {methodList.map(method => (
                <Option key={method.maPhuongThuc} value={method.maPhuongThuc}>
                  {method.tenPhuongThuc}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Địa chỉ giao hàng" name="diaChiGiaoHang" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ giao hàng!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Ngày đặt hàng" name="ngayDatHang" rules={[{ required: true, message: 'Vui lòng chọn ngày đặt hàng!' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          {/* Chi tiết đơn hàng */}
          <Form.Item label="Mã sản phẩm" name="maSP">
            <Select placeholder="Chọn sản phẩm">
              {productList.map(product => (
                <Option key={product.maSP} value={product.maSP}>
                  {product.tenSP}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Số lượng" name="soLuong">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Tổng giá" name="tongGia">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Mã giảm giá" name="maGiamGia">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditOrder;
