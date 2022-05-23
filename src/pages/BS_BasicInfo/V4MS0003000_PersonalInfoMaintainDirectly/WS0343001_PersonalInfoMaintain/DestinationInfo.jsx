import React from 'react';

import { Table, Checkbox, Form, Input } from 'antd';

const DestinationInfo = React.forwardRef((props, ref) => {
  let [data, setData] = React.useState([]);

  React.useEffect(() => {
    setData(props.personal.personal_individual_addresses);
  }, [props]);

  return (
    <div className="destination-info">
      <Table
        size='small'
        dataSource={data}
        rowKey={(record) => record.id}
        pagination={false}
      >
        <Table.Column render={(text, record, index) => (
          <>
            <Form.Item name={['personal_individual_addresses', index, 'personal_number_id']} hidden={true}>
              <Input />
            </Form.Item>
            <Form.Item name={['personal_individual_addresses', index, 'id']} hidden={true}>
              <Input />
            </Form.Item>
          </>
        )} />
        <Table.Column title="書類" dataIndex="document_title" render={(text, record, index) => (
          <>
            <Form.Item name={["personal_individual_addresses", index, "send_document_code"]} hidden={true} >
              <Input />
            </Form.Item>
            {record.document_title}
          </>
        )} />
        <Table.Column title="事業所" dataIndex="W6_destination_office_1" render={(text, record, index) => (
          <Form.Item name={["personal_individual_addresses", index, 'W6_destination_office_1']} valuePropName="checked">
            <Checkbox onChange={(e) => props.handleChangeValue(e.target.checked, 'W6_destination_office_1', 'personal_individual_addresses', record)} />
          </Form.Item>
        )} />
        <Table.Column title="本店" dataIndex="W6_destination_office_2" render={(text, record, index) => (
          <Form.Item name={["personal_individual_addresses", index, 'W6_destination_office_2']} valuePropName="checked">
            <Checkbox onChange={(e) => props.handleChangeValue(e.target.checked, 'W6_destination_office_2', 'personal_individual_addresses', record)} />
          </Form.Item>
        )} />
        <Table.Column title="個人1" dataIndex="W6_destination_personal_1" render={(text, record, index) => (
          <Form.Item name={["personal_individual_addresses", index, 'W6_destination_personal_1']} valuePropName="checked">
            <Checkbox onChange={(e) => props.handleChangeValue(e.target.checked, 'W6_destination_personal_1', 'personal_individual_addresses', record)} />
          </Form.Item>
        )} />
        <Table.Column title="個人2" dataIndex="W6_destination_personal_2" render={(text, record, index) => (
          <Form.Item name={["personal_individual_addresses", index, 'W6_destination_personal_2']} valuePropName="checked">
            <Checkbox onChange={(e) => props.handleChangeValue(e.target.checked, 'W6_destination_personal_2', 'personal_individual_addresses', record)} />
          </Form.Item>
        )} />
        <Table.Column title="個人3" dataIndex="W6_destination_personal_3" render={(text, record, index) => (
          <Form.Item name={["personal_individual_addresses", index, 'W6_destination_personal_3']} valuePropName="checked">
            <Checkbox onChange={(e) => props.handleChangeValue(e.target.checked, 'W6_destination_personal_3', 'personal_individual_addresses', record)} />
          </Form.Item>
        )} />
      </Table>
    </div>
  )
});

export default DestinationInfo

