/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, message } from 'antd';

interface Asset {
  asset_id: number;
  asset_serial: string;
  asset_ip_id: number;
  asset_model: string;
  asset_description?: string;
  asset_price: number;
}

const AssetPage: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Fetch assets from the backend
  const fetchAssets = async () => {
    try {
      const response = await axios.get('http://localhost:3000/assets');
      setAssets(response.data);
    } catch (error) {
      message.error('Failed to fetch assets.');
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  // Handle form submission to add a new asset
  const handleAddAsset = async (values: Asset) => {
    try {
      await axios.post('http://localhost:3000/assets', values);
      message.success('Asset added successfully!');
      fetchAssets(); // Refresh the list after adding
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to add asset.');
    }
  };

  return (
    <div>
      <h1>Asset Management</h1>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add New Asset
      </Button>
      <Table dataSource={assets} rowKey="asset_id">
        <Table.Column title="Serial" dataIndex="asset_serial" key="asset_serial" />
        <Table.Column title="Model" dataIndex="asset_model" key="asset_model" />
        <Table.Column title="IP ID" dataIndex="asset_ip_id" key="asset_ip_id" />
        <Table.Column title="Price" dataIndex="asset_price" key="asset_price" />
      </Table>

      {/* Modal to add a new asset */}
      <Modal
        title="Add New Asset"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddAsset} layout="vertical">
          <Form.Item
            name="asset_serial"
            label="Asset Serial"
            rules={[{ required: true, message: 'Please enter the asset serial!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="asset_ip_id"
            label="Asset IP ID"
            rules={[{ required: true, message: 'Please enter the asset IP ID!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="asset_model"
            label="Asset Model"
            rules={[{ required: true, message: 'Please enter the asset model!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="asset_description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="asset_price"
            label="Price"
            rules={[{ required: true, message: 'Please enter the price!' }]}
          >
            <Input type="number" step="0.01" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AssetPage;
