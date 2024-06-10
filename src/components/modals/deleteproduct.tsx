import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';
import { apiDelete } from '../../services/product.services';

interface DeleteProductProps {
    productId: string; // Thay vì product, sử dụng productId
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  }
const DeleteProduct: React.FC<DeleteProductProps> = ({ productId, visible, setVisible }) => {
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await apiDelete(productId);
      message.success('Xóa sản phẩm thành công!');
      setVisible(false);
      // Load lại trang sau khi xóa thành công
      window.location.reload();
    } catch (error) {
      message.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      title="Xác nhận xóa"
      visible={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Hủy
        </Button>,
        <Button key="delete" type="primary" loading={loading} onClick={handleDelete}>
          Xóa
        </Button>,
      ]}
    >
      <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
    </Modal>
  );
};

export default DeleteProduct;
