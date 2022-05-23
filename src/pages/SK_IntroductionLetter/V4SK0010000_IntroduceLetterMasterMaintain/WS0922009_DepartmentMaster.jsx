import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Table, Form, Space, Button, Input, Modal } from "antd";

class WS0922009_DepartmentMaster extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '診療科マスタ';
    this.formRef = React.createRef();
    this.state = {
      childModal: {
        width: 0,
        visible: false,
        component: null
      }
    };
  }
  componentDidMount() {
    this.setFormValue('tableData', [{ various_codes: 1111 }]);
  }
  componentWillUnmount() {
    if (this.props.onFinishScreen)
      this.props.onFinishScreen({
        // output
      })
  }
  setFormValue = (namePath, value) => {
    this.formRef.current.setFields([
      {
        name: namePath,
        value
      }
    ])
  }

  secondaryInspectNotificationMa = () => {
    const { various_codes } = this.formRef.current.getFieldValue('tableData');
    this.setState({
      childModal: {
        width: '80%',
        visible: true,
        component: (
          <div // Component
            Li_DepartmentCode={various_codes}
            onFinishScreen={(output) => {
              this.setDataOutput(output);
              this.closeModal()
            }}
          />
        )
      }
    })
  }

  setDataOutput = (output) => {
    console.log(output);
  }

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false
      }
    })
  }

  onFinish = (value) => {
    console.log('submit', value)
  }
  render() {
    return (
      <div className="department-master">
        <Card title="診療科マスタ">
          <Space>
            <Button type="primary" onClick={() => { }}>
              明細
            </Button>
          </Space>
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
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
              <Table.Column title="コード" width='100px' dataIndex="" key="" render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'various_codes']}>
                    <Input type="number" min={0} max={9999} />
                  </Form.Item>
                )
              }} />
              <Table.Column title="検索キー" dataIndex="" key="" render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'search_key']}>
                    <Input maxLength='8' />
                  </Form.Item>
                )
              }} />
              <Table.Column title="診療科" dataIndex="" key="" render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'department_name']}>
                    <Input maxLength={16} />
                  </Form.Item>
                )
              }} />
              <Table.Column title="コード" width='120px' dataIndex="" key="" render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'medical_institutions_cd']}>
                    <Input.Search type="number" max={9999} style={{ textAlign: 'right' }} onSearch={this.secondaryInspectNotificationMa} />
                  </Form.Item>
                )
              }} />
              <Table.Column title="医療機関名称" dataIndex="" key="" render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'medical_institution_name']}>
                    <Input maxLength={36} />
                  </Form.Item>
                )
              }} />
              <Table.Column title="備　　考" dataIndex="" key="" render={(value, record, index) => {
                return (
                  <Form.Item name={['tableData', index, 'remarks']}>
                    <Input maxLength={40} />
                  </Form.Item>
                )
              }} />

            </Table>
          </Form>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          onCancel={() => {
            this.setState({
              childModal: {
                ...this.state.childModal,
                visible: false,
              },
            });
          }}
        />
      </div >
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0922009_DepartmentMaster);
