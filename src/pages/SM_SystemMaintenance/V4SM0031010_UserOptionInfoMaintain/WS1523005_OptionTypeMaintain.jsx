import React from "react";
import { connect } from "react-redux";

import { Card, Table, Button, Form, Input } from "antd";
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { getScreenDataUserOptionTypeMaintainAction } from "redux/SystemMaintenance/UserOptionInfoMaintain/OptionTypeMaintain.actions";

const styleFormItem = {
  margin: 0
}
const styleInput = {
  border: 'none'
}
class WS1523005_OptionTypeMaintain extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();

    // document.title = 'オプション種別保守';

    this.state = {
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true
      },
      dataSource: [],
      isLoading: true,
      rowSelect: {}
    };
  }

  componentDidMount = () => {
    this.loadData();
  }

  loadData = () => {
    this.setState({ isLoading: true });
    getScreenDataUserOptionTypeMaintainAction()
      .then(res => {
        if (res) {
          this.setState({ dataSource: res.data });
          this.formRef?.current?.setFieldsValue({ 'dataSource': res.data });
        }
      })
      .catch()
      .finally(() => this.setState({ isLoading: false }))
  }

  handleChangeInput = (record, value, name) => {
    let arrTemp = [...this.state.dataSource];
    let index = arrTemp.indexOf(record);
    if (index !== -1) {
      let objTemp = {
        ...record,
        [name]: value
      }
      arrTemp[index] = objTemp;
      this.setState({ 
        dataSource: arrTemp, 
        rowSelect: objTemp
      });
      this.formRef.current.setFieldsValue({ 'dataSource': arrTemp });
    }
  }

  addData = () => {
    let arrTemp = [...this.state.dataSource];
    arrTemp.push({})
    this.formRef?.current?.setFieldsValue({ 'dataSource': arrTemp });
    this.setState({ dataSource: arrTemp });
  }

  render() {
    return (
      <div className="option-type-maintain">
        <Card title="オプション種別保守">
          <Form ref={this.formRef}>
            <Table
              size='small'
              dataSource={this.state.dataSource}
              loading={this.state.isLoading}
              pagination={{
                ...this.state.pagination,
                hideOnSinglePage: this.state.dataSource.length > 10 ? false : true
              }}
              rowKey={(record) => record.id}
              onRow={(record, index) => ({ onClick: event => this.setState({ rowSelect: record }) })}
            >
              <Table.Column title="種別" dataIndex="W1_option_type"
                render={(text, record, index) => (
                  <Form.Item name={["dataSource", index, "W1_option_type"]} style={styleFormItem}>
                    <Input readOnly={record.id} style={styleInput}
                      onChange={(e) => this.handleChangeInput(record, e.target.value, 'W1_option_type')} />
                  </Form.Item>
                )}
              />
              <Table.Column align='center' width={70}
                title={() => (<Button size='small' type='primary'
                  icon={<PlusOutlined />} onClick={this.addData}></Button>)}
                render={(text, record, index) => (
                  <Button size='small' style={{ border: 'none', display: record.id ? 'none' : '' }} 
                    disabled={!record.W1_option_type}
                    icon={<SaveOutlined style={{ color: 'green' }} />}
                    onClick={() => this.props.onFinishScreen(this.state.rowSelect.W1_option_type)}
                  ></Button>
                )}
              />
            </Table>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1523005_OptionTypeMaintain);
