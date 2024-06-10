import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';
import { apiDeleteOrder } from '../../services/order.services';

interface DeleteOrderProps {
    OrderId: string; 
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  }
  const DeleteOrder: React.FC<DeleteOrderProps> = ({ OrderId, visible, setVisible }) => {
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await apiDeleteOrder(OrderId);
      message.success('Xóa đơn hàng thành công!');
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
      <p>Bạn có chắc chắn muốn đơn hàng này?</p>
    </Modal>
  );
};

export default DeleteOrder;
