import React from 'react';

import { Table, Form, InputNumber, Input } from 'antd';

const CodeInfo = React.forwardRef((props, ref) => {
  let [data, setData] = React.useState([]);

  React.useEffect(() => {
    setData(props.personal.personal_codes);
  }, [props]);
  
  return (
    <div className="code-info">
      <Table 
        size='small' 
        dataSource={data}
        rowKey={record => record.id}
        pagination={false} 
      >
        <Table.Column render={(text, record, index) => (
          <>
            <Form.Item name={['personal_codes', index, 'personal_number_id']} hidden={true}>
              <Input />
            </Form.Item>
            <Form.Item name={['personal_codes', index, 'id']} hidden={true}>
              <Input />
            </Form.Item>
          </>
        )} />
        <Table.Column title="名称" width={'20%'} dataIndex="W7_code_name" render={(text, record, index) => (
          <Form.Item name={['personal_codes', index, 'W7_code_name']} >
            <Input readOnly style={{ border: 'none', outline: 'none',  }} />
          </Form.Item>

        )} />
        <Table.Column title='コード' width={'60%'} dataIndex="W7_code" render={(text, record, index) => (
          <Form.Item name={['personal_codes', index, 'W7_code']} >
            <InputNumber min={0} style={{width: '100%'}} 
              onChange={(value) => props.handleChangeValue(value, 'W7_code', 'personal_codes', record)} />
          </Form.Item>
        )} />
        <Table.Column title="説明" width={'20%'} dataIndex="W7_description" render={(text, record, index) => (
          <Form.Item name={['personal_codes', index, 'W7_description']} >
            <Input readOnly style={{ border: 'none', outline: 'none' }} />
          </Form.Item>
        )} />
      </Table>
    </div>
  )
});

export default CodeInfo
