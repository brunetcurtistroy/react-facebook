import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Form, Input, Radio, Button, Table, Row, Col, Space, DatePicker, } from "antd";
import { getScreenListDataProgramSearchAction } from "redux/SystemMaintenance/ProgressInfoMaintain/ProgramSearch.actions";
import moment from "moment";
import Color from "constants/Color";

class WS0276001_ProgramSearch extends React.Component {
  static propTypes = {
    Lio_Publicval: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'プログラム検索';

    this.state = {
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true
      },
      dataSource: [],
      isLoading: true,
      rowSelect: {},
      initParams: {
        PublicName: '',
        Date: '',
        Search: '',
        SortOrder: '0'
      }
    };
    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount = () => {
    this.loadData(this.state.initParams);
  }

  loadData = (params) => {
    this.setState({ isLoading: true });
    getScreenListDataProgramSearchAction(params)
      .then(res => {
        if (res) {
          this.setState({ dataSource: res.data });
        }
      })
      .catch()
      .finally(() => this.setState({ isLoading: false }))
  }

  handleChangeParams = (value, name) => {
    this.setState({ 
      initParams: {
        ...this.state.initParams,
        [name]: value
      }
    }, () => this.loadData(this.state.initParams));
  }

  onFinish(record) {
    if(this.props.onFinishScreen){
      this.props.onFinishScreen({
        Lio_Publicval: record.public_val,
        recordData: record
      })
    }
  }

  render() {
    return (
      <div className="program-search">
        <Card title="プログラム検索">
          <Form ref={this.formRef} initialValues={this.state.initParams}>
            <Row gutter={24}>
              <Col span={18}>
                <Row gutter={10}>
                  <Col span={16}>
                    <Form.Item name="PublicName" label="公開名" >
                      <Input onChange={(e) => this.handleChangeParams(e.target.value, 'PublicName')}/>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="Date" label="更新日" >
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} onChange={(date) => this.handleChangeParams(moment(date, 'YYYY/MM/DD').format('YYYY/MM/DD'), 'Date')}/>
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item name="Search" label="　名称" >
                  <Input onChange={(e) => this.handleChangeParams(e.target.value, 'Search')}/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name='SortOrder'>
                  <Radio.Group onChange={(e) => this.handleChangeParams(e.target.value, 'SortOrder')}>
                    <Space direction="vertical">
                      <Radio value='0'>連　番</Radio>
                      <Radio value='1'>日　付</Radio>
                      <Radio value='2'>公開名</Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Table
              className='mt-3'
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
              <Table.Column title="No" dataIndex="no" />
              <Table.Column title="名　称" dataIndex="description" />
              <Table.Column title="公開名" dataIndex="public_val" />
              <Table.Column title="タイプ" dataIndex="Expression_6" 
                render={(text, record, index) => {
                  let color = '';
                  switch (record.tasktype_val) {
                    case 'B': color = Color(210).Foreground; break;
                    case 'M': color = Color(209).Foreground; break;
                    case 'O': color = Color(210).Foreground; break;
                    case 'S': color = Color(211).Foreground; break;
                    default:　color = Color(208).Foreground; break;
                  }
                  return <p style={{color: color}}>{text}</p>
                }}
              />
              <Table.Column title="ソースファイル" dataIndex="Expression_8" />
              <Table.Column title="更新日" dataIndex="lastmodified_date_on" />
              <Table.Column title="時間" dataIndex="lastmodified_time_at" />
              <Table.Column render={(text, record, index) => (
                <Button type="primary" size='small' onClick={() => this.onFinish(record)}>選択</Button>
              )}/>
            </Table>

            <Form.Item className='mt-3' style={{ float: 'right', display: 'none' }}>
              <Button type="primary">選択</Button>
            </Form.Item>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0276001_ProgramSearch);
