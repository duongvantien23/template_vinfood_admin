import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { apiGetById, apiUpdate } from '../../services/warehouse.services';
import WarehouseModel from '../../models/warehouse.model';

interface EditWarehouseProps {
  warehouse: WarehouseModel | null;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditWarehouse: React.FC<EditWarehouseProps> = ({ warehouse, visible, setVisible }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && warehouse) {
      const fetchData = async () => {
        try {
          const warehouseData = await apiGetById(warehouse.maKho);
          form.setFieldsValue({
            maKho: warehouseData?.maKho,
            maSP: warehouseData?.maSP,
            soLuong: warehouseData?.soLuong,
          });
        } catch (error) {
          console.error('Failed to fetch warehouse:', error);
        }
      };
      fetchData();
    } else {
      form.resetFields();
    }
  }, [visible, warehouse, form]);

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = async (values: any) => {
    try {
      if (warehouse) {
        await apiUpdate({ ...warehouse, ...values });
        message.success('Cập nhật kho thành công!');
        setVisible(false);
        window.location.reload();
      }
    } catch (error) {
      message.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  };

  return (
    <Modal
      title="Sửa kho"
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
        <Form.Item label="Mã kho" name="maKho">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Mã sản phẩm" name="maSP" rules={[{ required: true, message: 'Vui lòng nhập mã sản phẩm!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Số lượng" name="soLuong" rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}>
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditWarehouse;
