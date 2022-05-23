import React from "react";
import { connect } from "react-redux";
import { Card, Table, Form, Input, Select } from "antd";

class WS0922003_MedicalInstitutionsMaster extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    // document.title = '医療機関マスタ';

    this.state = {
    };
  }

  componentWillUnmount() {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        // Pass value
      });
    };
  }

  render() {
    return (
      <div className="medical-institutions-master">
        <Card title="医療機関マスタ">
          <Form ref={this.formRef} onFinish={this.onFinish} />
          <Table
            size="small"
            bordered
            dataSource={[{}]}
            loading={false}
            pagination={{
              defaultCurrent: 1,
              total: 1,
              pageSize: 1,
              showSizeChanger: true,
              onChange: (page, pageSize) => { },
              onShowSizeChange: (page, pageSize) => { },
            }}
            rowKey={(record) => record.id}
          >
            <Table.Column title="コード" width="100px" dataIndex="" key="" render={(value, record, index) => {
              return <Form.Item name={['tableData', index, 'various_codes']} >
                <Input type="number" />
              </Form.Item>
            }} />
            <Table.Column title="検索キー"  width="200px" dataIndex="" key="" render={(value, record, index) => {
              return <Form.Item name={['tableData', index, 'search_key']} >
                <Input />
              </Form.Item>
            }} />
            <Table.Column title="正式名称" dataIndex="" key="" render={(value, record, index) => {
              return <Form.Item name={['tableData', index, 'medical_institution_name']} >
                <Input />
              </Form.Item>
            }} />
            <Table.Column title="略称名"  width="15%" dataIndex="" key="" render={(value, record, index) => {
              return <Form.Item name={['tableData', index, 'medical_institutions_short_name']} >
                <Input />
              </Form.Item>
            }} />
            <Table.Column title="当院/他院"  width="10%" dataIndex="" key="" render={(value, record, index) => {
              return <Form.Item name={['tableData', index, 'our_hospital_another_hospital']} >
                <Select defaultValue="他院">
                  <Select.Option value="他院">他院</Select.Option>
                  <Select.Option value="当院">当院</Select.Option>
                </Select>
              </Form.Item>
            }} />
            <Table.Column title="備　　考" dataIndex="" key="" render={(value, record, index) => {
              return <Form.Item name={['tableData', index, 'remarks']} >
                <Input />
              </Form.Item>
            }} />
          </Table>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0922003_MedicalInstitutionsMaster);
