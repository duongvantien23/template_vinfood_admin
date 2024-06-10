import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, message } from 'antd';
import { apiGetAllSapHet } from '../../services/statistical.services';
import { Kho } from '../../models/warehouse.model'; // Đảm bảo import đúng model
import { ColumnsType } from 'antd/es/table'; // Import ColumnsType

interface ProductOutModalProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  }
const ProductOutModal: React.FC<ProductOutModalProps> = ({ visible, setVisible }) => {
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState<Kho[]>([]);

  useEffect(() => {
    if (visible) {
      fetchProductOut();
    }
  }, [visible]);

  const fetchProductOut = async () => {
    setLoading(true);
    try {
      const productOutData: Kho[] = await apiGetAllSapHet();
      setProductList(productOutData);
    } catch (error) {
      message.error('Đã xảy ra lỗi khi lấy dữ liệu sản phẩm sắp hết.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setVisible(false);
  };

  const columns: ColumnsType<Kho> = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'tenSP',
      key: 'tenSP',
    },
    {
      title: 'Số lượng còn',
      dataIndex: 'soLuong',
      key: 'soLuong',
    },
  ];

  return (
    <Modal
      title="Danh sách sản phẩm sắp hết"
      visible={visible}
      onCancel={handleClose}
      footer={[
        <Button key="close" onClick={handleClose}>
          Đóng
        </Button>,
      ]}
      width={800}
    >
      <Table<Kho>
        dataSource={productList}
        columns={columns}
        loading={loading}
        pagination={false}
        rowKey={(record) => record.maKho.toString()} // Đảm bảo sử dụng rowKey với giá trị duy nhất
      />
    </Modal>
  );
};

export default ProductOutModal;
