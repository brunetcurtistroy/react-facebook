import React from 'react';

import { Form, Input, Button, Select, Table, Modal, message, } from "antd";
import { InfoCircleOutlined, WarningOutlined, CloseCircleOutlined, PlusOutlined, DeleteOutlined, } from "@ant-design/icons";

const SpecialInfo = React.forwardRef((props, ref) => {
  let [data, setData] = React.useState([]);

  React.useEffect(() => {
    setData(props.personal.personal_specials);
  }, [props]);

  return (
    <div className='special-info' >
      <Table
        size='small'
        pagination={false}
        dataSource={data}
        rowKey={record => record.id}
      >
        <Table.Column render={(text, record, index) => (
          <>
            <Form.Item name={['personal_specials', index, 'personal_number_id']} hidden={true}>
              <Input />
            </Form.Item>
            <Form.Item name={['personal_specials', index, 'id']} hidden={true}>
              <Input />
            </Form.Item>
          </>
        )} />
        <Table.Column title="重要度" dataIndex="importance" render={(text, record, index) => {
          return (
            <Form.Item name={['personal_specials', index, 'importance']} >
              <Select disabled={!props.personal.personal_number_id} onChange={(value) => {
                props.handleChangeValue(value, 'importance', 'personal_specials', record);
              }}>
                <Select.Option value={1}>情報</Select.Option>
                <Select.Option value={3}>警告</Select.Option>
                <Select.Option value={5}>重要</Select.Option>
              </Select>
            </Form.Item>
          )
        }} />
        <Table.Column dataIndex="importance" key="icon" render={(code, record, index) => {
          let icon = '';
          switch (code) {
            case 1:
              icon = (<InfoCircleOutlined style={{ color: '#1890ff' }} />)
              break;
            case 3:
              icon = (<WarningOutlined style={{ color: '#faad14' }} />)
              break;
            case 5:
              icon = (<CloseCircleOutlined style={{ color: '#ff4d4f' }} />)
              break;
            default: icon = (<InfoCircleOutlined style={{ color: '#1890ff' }} />)
              break;
          };
          return (<Form.Item style={{ fontSize: 20 }}>{icon}</Form.Item>)
        }} />
        <Table.Column title="特記メモ" dataIndex="content" render={(text, record, index) => (
          <Form.Item name={['personal_specials', index, 'content']} >
            <Input
              readOnly={!props.personal.personal_number_id}
              onChange={(e) => props.handleChangeValue(e.target.value, 'content', 'personal_specials', record)}
            />
          </Form.Item>
        )} />
        <Table.Column title='ユーザー' dataIndex="registered_person" render={(text, record, index) => (
          <Form.Item name={['personal_specials', index, 'registered_person']} >
            <Input readOnly />
          </Form.Item>
        )} />
        <Table.Column key="action" dataIndex=""
          title={() => (
            <Button type="primary" size='small' icon={<PlusOutlined />}
              disabled={!props.personal.personal_number_id}
              onClick={() => {
                props.handleChangeValue('', '', 'personal_specials', {})
              }} />
          )}
          render={(text, record, index) => {
            return (
              <Button style={{ border: 'none', }}
                danger icon={<DeleteOutlined />}
                onClick={() => {
                  Modal.confirm({
                    content: '消去してもよろしいですか？',
                    okText: 'は　い',
                    cancelText: 'いいえ',
                    onOk: () => props.deleteDataSpecials(record, index)
                  })
                }}
              ></Button>
            )
          }}
        />
      </Table>
    </div>
  )
});

export default SpecialInfo;



