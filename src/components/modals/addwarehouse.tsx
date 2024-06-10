import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { apiCreate, apiGetAllWarehouse } from '../../services/warehouse.services';
import Kho from "../../models/warehouse.model"; 

interface AddWareHouseProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddWarehouse: React.FC<AddWareHouseProps> = ({ visible, setVisible }) => {
  const [form] = Form.useForm();
  const [warehouses, setWarehouses] = useState<Kho[]>([]);

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const data = await apiGetAllWarehouse();
      console.log("Dữ liệu kho hàng:", data);
      setWarehouses(data);
    } catch (error) {
      console.error('Failed to fetch warehouses:', error);
    }
  };
  
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = async (values: any) => {
    const formattedValues = { 
      ...values, 
    };
   
    try {
      await apiCreate(formattedValues);
      message.success('Thêm kho hàng thành công!');
      setVisible(false);
      form.resetFields();
      fetchWarehouses(); // Refetch warehouses after adding new one
    } catch (error) {
      message.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  };

  return (
    <>
      <Modal
        title="Thêm kho hàng"
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Đóng
          </Button>,
          <Button key="submit" type="primary" onClick={form.submit}>
            Thêm kho hàng
          </Button>,
        ]}
      >
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{ maKho: 0, maSP: '', soLuong: 0 }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
        >
          {/* Các trường thông tin kho hàng */}
          <Form.Item label="Mã sản phẩm" name="maSP" rules={[{ required: true, message: 'Vui lòng nhập mã sản phẩm!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Số lượng" name="soLuong" rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddWarehouse;
