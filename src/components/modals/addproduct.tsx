import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, Upload, message, DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { apiCreate, apiGetAllCategory, apiGetAllNhaCC } from '../../services/product.services';
import DanhMuc from "../../models/category.model"; 
import NhaCungCap from "../../models/supplier.model";
import moment from 'moment'; // Import moment
const { Option } = Select;
interface AddProductProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddProduct: React.FC<AddProductProps> = ({ visible, setVisible }) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<DanhMuc[]>([]);
  const [nhaCCs, setNhaCCs] = useState<NhaCungCap[]>([]);

  useEffect(() => {
    fetchCategories();
    fetchNhaCCs();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await apiGetAllCategory();
      console.log("Dữ liệu danh mục:", data);
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };
  
  const fetchNhaCCs = async () => {
    try {
      const data = await apiGetAllNhaCC();
      console.log("Dữ liệu nhà cung cấp:", data);
      setNhaCCs(data);
    } catch (error) {
      console.error('Failed to fetch suppliers:', error);
    }
  };
  

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = async (values: any) => {
    const imagePath = values.hinhAnh[0]?.response?.filePath || '';
  
    const formattedValues = { 
      ...values, 
      ngaySanXuat: "2024-04-07T13:21:26.553Z", 
      hinhAnh: "../Img/" + imagePath 
    };
   
    try {
      await apiCreate(formattedValues);
      message.success('Thêm sản phẩm thành công!');
      setVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  };  
  return (
    <>
      <Modal
        title="Thêm sản phẩm"
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Đóng
          </Button>,
          <Button key="submit" type="primary" onClick={form.submit}>
            Thêm sản phẩm
          </Button>,
        ]}
      >
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{ maSP: 0, maDanhMuc: '', tenSP: '', gia: 0, moTa: '', donViTinh: '', luotXem: 0, maNhaCC: '', ngaySanXuat: moment("2024-04-07T13:21:26.553Z") }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
        >
          {/* Các trường thông tin sản phẩm */}
          <Form.Item label="Tên sản phẩm" name="tenSP" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Giá tiền" name="gia" rules={[{ required: true, message: 'Vui lòng nhập giá tiền!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Mô tả" name="moTa">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Đơn vị tính" name="donViTinh">
            <Input />
          </Form.Item>
          <Form.Item label="Lượt xem" name="luotXem">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Danh mục" name="maDanhMuc" rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}>
            <Select placeholder="Chọn danh mục">
              {categories.map(category => (
                <Option key={category.maDanhMuc} value={category.maDanhMuc}>
                  {category.tenDanhMuc}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Nhà cung cấp" name="maNhaCC" rules={[{ required: true, message: 'Vui lòng chọn nhà cung cấp!' }]}>
            <Select placeholder="Chọn nhà cung cấp">
              {nhaCCs.map(nhaCC => (
                <Option key={nhaCC.maNhaCC} value={nhaCC.maNhaCC}>
                  {nhaCC.tenNhaCC}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {/* Trường ngày sản xuất */}
          <Form.Item label="Ngày sản xuất" name="ngaySanXuat">
            <DatePicker style={{ width: '100%' }} defaultValue={moment("2024-04-07T13:21:26.553Z")} />
          </Form.Item>
          {/* Trường upload ảnh */}
          <Form.Item label="Ảnh sản phẩm" name="hinhAnh" valuePropName="fileList" getValueFromEvent={(e) => e.fileList}>
            <Upload name="file" action="https://localhost:7222/api/UpLoadFile/upload" listType="picture">
              <Button icon={<UploadOutlined />}>Tải lên</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddProduct;
