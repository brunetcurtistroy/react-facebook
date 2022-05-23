import React from "react";
import PropTypes from 'prop-types';

import { Card, Table, Button, Form, Input, Select, InputNumber, message, Space, Tooltip } from "antd";
import WS0344002_SelectedRange from "./WS0344002_SelectedRange";
import { ModalCustom } from "components/Commons/ModalCustom";
import axios from "configs/axios";

/**
 * @route @param IdentifyChar
 */
class WS0344001_SupplementalInfoSetting extends React.Component {
  static propTypes = {
    Li_IdentifyChar: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '補足情報設定';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      rowSelect: {},
      isLoadingSupplement: false,
    };

    this.loadSupplementList = this.loadSupplementList.bind(this);
    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount() {
    this.loadSupplementList(this.props.Li_IdentifyChar);
  }

  loadSupplementList(IdentifyChar) {
    this.setState({ isLoadingSupplement: true });
    axios.get('/api/insurer-info-maintain/supplemental-info-setting', {
      params: {
        IdentifyChar: IdentifyChar
      }
    })
      .then(res => {
        const resData = res.data;
        if (!resData) {
          return;
        }

        const formIns = this.formRef.current;

        formIns.setFieldsValue({
          supsData: resData.map((value) => {
            return {
              ...value,
              SerialNum: parseInt(value.item_id.substr(5, 1)),
            };
          }),
        });

        let data = this.formRef?.current.getFieldValue('supsData');
        this.setState({ rowSelect: data?.length > 0 ? data[0] : {} })
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }

        message.error(res.data.message);
      })
      .finally(() => {
        this.setState({ isLoadingSupplement: false });
      });
  }

  onFinish(values) {
    this.setState({
      isLoadingSupplement: true,
    });
    axios.post('/api/insurer-info-maintain/supplemental-info-setting', {
      ...values,
      IdentifyChar: this.props.Li_IdentifyChar
    })
      .then(res => {
        this.loadSupplementList(this.props.Li_IdentifyChar);
        message.success('保存が完了しました');

        if (this.props.onFinishScreen) {
          this.props.onFinishScreen();
        }
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }

        message.error(res.data.message);
      })
      .finally(() => {
        this.setState({
          isLoadingSupplement: false,
        });
      });
  }

  eventF12 = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 500,
        component: (
          <WS0344002_SelectedRange
            Li_ScreenId={this.state.rowSelect.item_id}
            Li_ScreenName={this.state.rowSelect.item}
            onFinishScreen={() => {
              this.loadSupplementList(this.props.Li_IdentifyChar);
            }}
          />
        ),
      },
    });
  }

  closeModal = () => {
    this.setState({
      childModal: {
      ...this.state.childModal,
      visible: false,
      },
    });
  }

  componentWillUnmount = () => {
    if(this.props.onFinishScreen) this.props.onFinishScreen()
  }

  render() {
    return (
      <div className="supplemental-info-setting">
        <Card title="補足情報設定" size="small">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Table
              dataSource={this.formRef.current ? this.formRef.current.getFieldValue('supsData') : []}
              loading={this.state.isLoadingSupplement}
              pagination={false}
              rowKey={(record) => record.id}
              size="small"
              bordered
              onRow={(record, index) => ({ onClick: event => this.setState({ rowSelect: record }) })}
              rowClassName={(record, index) => record.id === this.state.rowSelect.id ? 'hightlight-row-selected' : ''}
            >
              <Table.Column title="表示名称" dataIndex="id" render={(value, record, index) => {
                return (<>
                  <Form.Item name={['supsData', index, "item_id"]} hidden={true}>
                    <Input />
                  </Form.Item>
                  <Form.Item name={['supsData', index, "AttributeCode"]} hidden={true}>
                    <Input />
                  </Form.Item>
                  <Tooltip title={record?.Expression_9}>
                    <Form.Item name={['supsData', index, "item"]}>
                      <Input />
                    </Form.Item>
                  </Tooltip>
                </>)
              }} />
              <Table.Column title="順番" dataIndex="item_id" key="SerialNum" render={(value, record, index) => {
                return (<>
                  <Tooltip title={record?.Expression_9}>
                    <Form.Item name={['supsData', index, "SerialNum"]}>
                      <InputNumber />
                    </Form.Item>
                  </Tooltip>
                </>);
              }} />
              <Table.Column title="タイプ" dataIndex="condition_1" render={(value, record, index) => {
                return (
                  <Form.Item
                    name={['supsData', index, "condition_1"]}
                  >
                    <Select>
                      <Select.Option value="X">英数</Select.Option>
                      <Select.Option value="J">カナ</Select.Option>
                      <Select.Option value="K">漢字</Select.Option>
                    </Select>
                  </Form.Item>
                );
              }} />
              <Table.Column title="桁数" dataIndex="condition_2" render={(value, record, index) => {
                return (
                  <Form.Item
                    name={['supsData', index, "condition_2"]}
                  >
                    <InputNumber />
                  </Form.Item>
                );
              }} />
              <Table.Column title="備考" dataIndex="remarks" render={(value, record, index) => {
                return (
                  <Tooltip title={record?.Expression_9}>
                    <Form.Item name={['supsData', index, "remarks"]} >
                      <Input />
                    </Form.Item>
                  </Tooltip>
                );
              }} />
              <Table.Column title="選" dataIndex="Expression_13" />
            </Table>

            <Form.Item
              className="mt-3"
              style={{textAlign: 'right'}}
            >
              <Space>
                <Button type="primary" htmlType="submit" loading={this.state.isLoadingSupplement}>保存</Button>
                <Button type="primary" onClick={this.eventF12}>選択範囲</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
        {ModalCustom({
          width: this.state.childModal.width,
          visible: this.state.childModal.visible,
          component: this.state.childModal.component,
          destroyOnClose: true,
          onCancel: this.closeModal
        })}
      </div>
    );
  }
}

export default WS0344001_SupplementalInfoSetting;
