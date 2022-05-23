import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Table, Input, Form, Select, Modal } from "antd";
import PropTypes from 'prop-types';
class WS0922010_DayOfWeekBasedDeterminePhysicianMaster extends React.Component {
  static propTypes = {
    onFinishScreen: PropTypes.func,
    Li_ManageCode: PropTypes.number,
  }
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    // document.title = '曜日別判定医マスタ';
    this.state = {
      loading: false,
      childModal: {
        width: 0,
        visible: false,
        component: null
      }
    };
  }

  componentDidMount() {
    this.setFormValue('tableData', [])
    this.forceUpdate();
  }

  componentWillUnmount() {
    const value = this.formRef.current.getFieldValue('tableData');
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        // pass value here
        value
      })
    }
  }

  setFormValue = (namePath, value) => {
    this.formRef.current.setFields([
      {
        name: namePath,
        value
      }
    ])
  }
  linkOpenModal = (value) => {
    this.setState({
      childModal: {
        visible: true,
        width: '80%',
        component: (
          <div // pass component here
            Li_ManageCode
            Lo_VariousCodes={value}
            onFinishScreen={(output) => {
              this.setDataOutput(output)
              this.closeModal()
            }}
          />
        )
      }
    })
  }
  setDataOutput = (output) => {
    console.log(output)
  }
  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      }
    })
  }


  onFinish = (values) => {
    console.log('finish', values);
  }

  render() {
    return (
      <div className="day-of-week-based-determine-physician-master">
        <Card title="曜日別判定医マスタ">
          <Form
            onFinish={this.onFinish}
            ref={this.formRef}
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
                return <Form.Item name={['tableData', index, 'various_codes']}>
                  <Input type="number" />
                </Form.Item>
              }} />
              <Table.Column title="曜　日" dataIndex="" key="" render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'day_of_week_name']}>
                  <Input />
                </Form.Item>
              }} />
              <Table.Column title="コード" width='120px' dataIndex="" key="" render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'doctor_cd']}>
                  <Input.Search type="number" style={{ textAlign: 'right' }} onSearch={this.linkOpenModal} />
                </Form.Item>
              }} />
              <Table.Column title="ドクター名" dataIndex="" key="" render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'doctor_name']}>
                  <Input />
                </Form.Item>
              }} />
              <Table.Column title="備　　考" dataIndex="" key="" render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'remarks']}>
                  <Input />
                </Form.Item>
              }} />

            </Table>
          </Form>
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
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0922010_DayOfWeekBasedDeterminePhysicianMaster);
