/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Select, Input, message } from 'antd';

interface Exchange {
  exchange_id: number;
  exchange_type: string;
  exchange_date: string;
  exchange_observation?: string;
  exchange_ticket?: string;
  exchange_asset_id: number;
  exchange_user_id: number;
  exchange_responsible: number;
}

const ExchangePage: React.FC = () => {
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Fetch exchanges from the backend
  const fetchExchanges = async () => {
    try {
      const response = await axios.get('http://localhost:3000/exchanges');
      setExchanges(response.data);
    } catch (error) {
      message.error('Failed to fetch exchanges.');
    }
  };

  useEffect(() => {
    fetchExchanges();
  }, []);

  // Handle form submission to add a new exchange
  const handleAddExchange = async (values: Exchange) => {
    try {
      await axios.post('http://localhost:3000/exchanges', values);
      message.success('Exchange added successfully!');
      fetchExchanges(); // Refresh the list after adding
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to add exchange.');
    }
  };

  return (
    <div>
      <h1>Exchange Management</h1>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add New Exchange
      </Button>
      <Table dataSource={exchanges} rowKey="exchange_id">
        <Table.Column title="Type" dataIndex="exchange_type" key="exchange_type" />
        <Table.Column title="Date" dataIndex="exchange_date" key="exchange_date" />
        <Table.Column title="Observation" dataIndex="exchange_observation" key="exchange_observation" />
        <Table.Column title="Ticket" dataIndex="exchange_ticket" key="exchange_ticket" />
        <Table.Column title="Asset ID" dataIndex="exchange_asset_id" key="exchange_asset_id" />
        <Table.Column title="User ID" dataIndex="exchange_user_id" key="exchange_user_id" />
      </Table>

      {/* Modal to add a new exchange */}
      <Modal
        title="Add New Exchange"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddExchange} layout="vertical">
          <Form.Item
            name="exchange_type"
            label="Exchange Type"
            rules={[{ required: true, message: 'Please select the exchange type!' }]}
          >
            <Select>
              <Select.Option value="loan">Loan</Select.Option>
              <Select.Option value="devolution">Devolution</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="exchange_date"
            label="Exchange Date"
            rules={[{ required: true, message: 'Please enter the exchange date!' }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item name="exchange_observation" label="Observation">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="exchange_ticket" label="Ticket">
            <Input />
          </Form.Item>
          <Form.Item
            name="exchange_asset_id"
            label="Asset ID"
            rules={[{ required: true, message: 'Please enter the asset ID!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="exchange_user_id"
            label="User ID"
            rules={[{ required: true, message: 'Please enter the user ID!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="exchange_responsible"
            label="Responsible User ID"
            rules={[{ required: true, message: 'Please enter the responsible user ID!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ExchangePage;
