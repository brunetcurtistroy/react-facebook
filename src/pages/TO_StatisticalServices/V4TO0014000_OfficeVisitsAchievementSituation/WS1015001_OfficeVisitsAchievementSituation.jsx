import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import WS0265001_BasicCourseInquiry from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0265001_BasicCourseInquiry.jsx';
import WS1015015_BusinessEstablishmentsSubjectToSelect from 'pages/TO_StatisticalServices/V4TO0014000_OfficeVisitsAchievementSituation/WS1015015_BusinessEstablishmentsSubjectToSelect.jsx';
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Form, Input, Select, Button, Table, DatePicker, Space, Modal } from "antd";
import { isNumber } from "lodash";

class WS1015001_OfficeVisitsAchievementSituation extends React.Component {
  formRef = React.createRef();
  static propTypes = {
    onFinishScreen: PropTypes.func,
  };
  constructor(props) {
    super(props);

    // document.title = '事業所受診実績状況';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
  }
  componentDidMount() {
    this.setFormFieldValue('SituationClassify', 0)
    this.setFormFieldValue('AllPart', 0)

    this.setFormFieldValue('dataSource', [{ id: 1, W1_course_cd_f: '-', W1_course_cd_t: '-' }])
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setFormFieldValue('dataSource', [{ id: 1, W1_course_cd_f: '-', W1_course_cd_t: '-' }])
      this.setFormFieldValue('SituationClassify', 0)
      this.setFormFieldValue('AllPart', 0)
    }
  }
  getRawValue = (name) => this.formRef?.current?.getFieldValue(name)
  setFormFieldValue(namePath, value) {
    this.formRef?.current?.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  showWS1015015_BusinessEstablishmentsSubjectToSelect() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '60%',
        component: (
          <WS1015015_BusinessEstablishmentsSubjectToSelect
            onFinishScreen={(output) => {
              this.closeModal()
            }}
          />),
      },
    })
  }
  showWS0265001_BasicCourseInquiry(name, index) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '60%',
        component: (
          <WS0265001_BasicCourseInquiry
            onFinishScreen={(output) => {
              // const dataArr = this.getRawValue('dataSource');
              // dataArr[index][name] = output.Lo_CourseCode
              this.formatValue(output.Lo_CourseCode, index, name)
              // dataArr[index].W1_course_cd_f = output.Lo_CourseCode
              this.closeModal()
            }}
          />),
      },
    })
  }
  onFinish(values) {

  }
  formatValue(e, index, name) {
    let val = e;
    let firstValue = e.split('')[0];
    const checkNumber = isNaN(Number(firstValue))
    let dataArr = this.getRawValue('dataSource')
    e = val
      .replace(/\D/g, '')
      .replace(/(\d{1,1})(\d{1,1})?(\d{1,124})?/g, function (txt, f, s, t, b) {
        if (t) {
          const value = checkNumber ? `${firstValue}-${f}${s}${t}` : `${f}-${s}${t}`
          dataArr[index][name] = value
        } else if (s) {
          const value = checkNumber ? `${firstValue}-${f}${s}` : `${f}-${s}`
          dataArr[index][name] = value
        } else if (f) {
          const value = checkNumber ? `${firstValue}-${f}` : `${f}-`
          dataArr[index][name] = value
        }
      });
  }
  render() {
    return (
      <div className="office-visits-achievement-situation">
        <Card title="事業所受診実績状況">
          <Space>
            <Button onClick={() => { this.showWS1015015_BusinessEstablishmentsSubjectToSelect() }}>実行</Button>
          </Space>
          <hr style={{ border: "1px solid #F0F0F0", marginBottom: "1.2rem" }} />

          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
              <Form.Item style={{ width: '100%' }}
                name="ImplementPeriodFChar"
                label="実績期間" >
                <VenusDatePickerCustom formRefDatePicker={this.formRef} style={{ width: '100%' }} format={'YYYY/MM/DD'} type="text" />
              </Form.Item>
              <div>～</div>
              <Form.Item style={{ width: '100%' }} name="ImplementPeriodTChar">
                <VenusDatePickerCustom formRefDatePicker={this.formRef} style={{ width: '100%' }} format={'YYYY/MM/DD'} type="text" />
              </Form.Item>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Form.Item style={{ width: '100%' }}
                name="CheckPeriodFChar"
                label="ﾁｪｯｸ期間" >
                <VenusDatePickerCustom formRefDatePicker={this.formRef} style={{ width: '100%' }} format={'YYYY/MM/DD'} />
              </Form.Item>
              <div>～</div>
              <Form.Item style={{ width: '100%' }} name="CheckPeriodTChar">
                <VenusDatePickerCustom formRefDatePicker={this.formRef} style={{ width: '100%' }} format={'YYYY/MM/DD'} />
              </Form.Item>
            </div>
            <div style={{ display: 'flex', marginBottom: '5px' }}>
              <div style={{ width: '69px', fontWeight: "bold", color: '#14468C' }}>受診ｺｰｽ</div>
              <Table
                style={{ width: '100%' }}
                showHeader={false}
                dataSource={this.getRawValue('dataSource')}
                pagination={false}
                size="small"
                scroll={{ y: 200 }}
                bordered={true}
                rowKey={(record) => record.id}
              >
                <Table.Column title="" dataIndex="W1_course_cd_f"
                  render={(value, record, index) => {
                    return <Form.Item name={['dataSource', index, 'W1_course_cd_f']}>
                      <Input maxLength={4} type="text"
                      onDoubleClick={() => {this.showWS0265001_BasicCourseInquiry('W1_course_cd_f', index)}}
                      onChange={(e) => this.formatValue(e.target.value, index, 'W1_course_cd_f')} suffix="～" />
                    </Form.Item>
                  }} />
                <Table.Column title="" dataIndex="W1_course_cd_t" 
                  render={(value, record, index) => {
                    return <Form.Item name={['dataSource', index, 'W1_course_cd_t']}>
                      <Input maxLength={4} type="text"
                      onDoubleClick={() => {this.showWS0265001_BasicCourseInquiry('W1_course_cd_t', index)}}
                      onChange={(e) => this.formatValue(e.target.value, index,'W1_course_cd_t' )} suffix={' '} />
                    </Form.Item>
                  }}
                />

              </Table>
            </div>
            <Form.Item
              name="SituationClassify"
              label="状況区分"
            >
              <Select>
                <Select.Option value={0}>全て</Select.Option>
                <Select.Option value={5}>新規</Select.Option>
                <Select.Option value={1}>未受診</Select.Option>
                <Select.Option value={2}>予約</Select.Option>
                <Select.Option value={3}>受付</Select.Option>
                <Select.Option value={4}>予約受付</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
              name="AllPart"
              label="出力区分"
            >
              <Select>
                <Select.Option value={0}>全て</Select.Option>
                <Select.Option value={1}>部分</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item style={{ float: 'right' }}
            >
              <Button type="primary">実行</Button>
            </Form.Item>

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
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1015001_OfficeVisitsAchievementSituation);
