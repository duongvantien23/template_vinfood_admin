import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, Upload, message, DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { apiGetById, apiUpdate, apiGetAllCategory, apiGetAllNhaCC } from '../../services/product.services';
import DanhMuc from "../../models/category.model"; 
import NhaCungCap from "../../models/supplier.model";
import moment from 'moment'; // Import moment
const { Option } = Select;

interface EditProductProps {
  product: any;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProduct: React.FC<EditProductProps> = ({ product, visible, setVisible }) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<DanhMuc[]>([]);
  const [nhaCCs, setNhaCCs] = useState<NhaCungCap[]>([]);
  

  useEffect(() => {
    fetchCategories();
    fetchNhaCCs();
  }, []);

  useEffect(() => {
    if (visible && product) { // Đảm bảo product không null hoặc undefined
      const fetchData = async () => {
        try {
          const productData = await apiGetById(product.maSP); // Giả sử product.maSP chính là productId
          form.setFieldsValue({
            maSP: productData?.maSP,
            maDanhMuc: productData?.maDanhMuc,
            tenSP: productData?.tenSP,
            gia: productData?.gia,
            moTa: productData?.mota, 
            donViTinh: productData?.donViTinh,
            luotXem: productData?.luotXem,
            maNhaCC: productData?.maNhaCC,
            ngaySanXuat: moment(productData?.ngaySanXuat)
          });
        } catch (error) {
          console.error('Failed to fetch product:', error);
        }
      };
      fetchData();
    }
  }, [visible, product, form]);

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

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = async (values: any) => {
    let imagePath = '';
    if (values.hinhAnh && values.hinhAnh.length > 0 && values.hinhAnh[0]?.response?.filePath) {
      // Nếu người dùng đã tải lên ảnh mới, sử dụng đường dẫn mới
      imagePath = "../Img/" + values.hinhAnh[0].response.filePath;
    } else {
      // Nếu không, sử dụng đường dẫn cũ
      imagePath = product.hinhAnh; // Giả sử product chứa thông tin ảnh cũ
    }
  
    const formattedValues = { 
      ...values, 
      ngaySanXuat: moment(values.ngaySanXuat).format(), 
      hinhAnh: imagePath 
    };
    
    try {
      await apiUpdate(formattedValues);
      message.success('Cập nhật sản phẩm thành công!');
      setVisible(false); 
      // Load lại trang bằng cách chuyển đổi URL
      window.location.reload();
    } catch (error) {
      message.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  };
  return (
       <>
      <Modal
        title="Sửa sản phẩm"
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Đóng
          </Button>,
          <Button key="submit" type="primary" onClick={form.submit}>
          Lưu
        </Button>,
        ]}
      >
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
        >
           <Form.Item label="Mã sản phẩm" name="maSP">
            <Input disabled />
           </Form.Item>
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
          <Form.Item label="Ngày sản xuất" name="ngaySanXuat">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
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

export default EditProduct;
