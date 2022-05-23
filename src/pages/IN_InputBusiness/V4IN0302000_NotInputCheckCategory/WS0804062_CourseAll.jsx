import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Form, Input, Radio, Table, } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import CourseAllAction from "redux/InputBusiness/NotInputCheckCategory/CourseAll.action";

const styleRadio = { display: 'block', lineHeight: '30px' }

class WS0804062_CourseAll extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_StyleCode: PropTypes.any,
    Lio_CourseList: PropTypes.any,
    Lio_CourseSelectCondition: PropTypes.any,

    Li_SearchChar: PropTypes.any,

    onChangeValue: PropTypes.func,
    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = 'コース(全体)';

    this.state = {
      dataSource: [],
      isLoading: false,

      dataChecked: []
    };
  }

  componentDidMount() {
    this.getDataScreen()
  }

  componentDidUpdate(prv) {
    if (this.props !== prv) {
      this.getDataScreen()
    }
  }

  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }

  getDataScreen() {
    let params = {
      Style: this.isEmpty(this.props.Li_StyleCode) ? '' : this.props.Li_StyleCode,
      ConfiguredCourses: this.isEmpty(this.props.Lio_CourseList) ? '' : this.props.Lio_CourseList,
      CourseSelectCondition: this.isEmpty(this.props.Lio_CourseSelectCondition) ? '' : this.props.Lio_CourseSelectCondition,
    }

    CourseAllAction.getDataScreen(params)
      .then((res) => {
        this.formRef.current?.setFieldsValue({
          CourseSelectCondition: res?.CourseSelectCondition
        })

        this.getDataTable(false)
      })
  }

  getDataTable(loadSearch) {
    let params = {
      Style: this.isEmpty(this.props.Li_StyleCode) ? '' : this.props.Li_StyleCode,
      ConfiguredCourses: this.isEmpty(this.props.Lio_CourseList) ? '' : this.props.Lio_CourseList,
      CourseSelectCondition: this.formRef.current?.getFieldValue('CourseSelectCondition'),
      SearchChar: this.formRef.current?.getFieldValue('SearchChar')
    }

    this.setState({ isLoading: true })
    CourseAllAction.getListData(params)
      .then((res) => {
        let data = res ? res : []
        if (loadSearch) {
          data.forEach(e => {
            this.state.dataChecked.forEach(x => {
              if (e.course_code === x.course_code) {
                e.Vl3StsMemoryFill = 1
              }
            })
          });

          this.setState({
            dataSource: data,
            isLoading: false,
          })

        } else {
          this.setState({
            dataSource: data,
            isLoading: false,

            dataChecked: data.filter(x => x.Vl3StsMemoryFill === 1)
          })
        }
      })
      .finally(() => this.setState({ isLoading: false }))
  }

  findIndexByID = (recordID) => {
    return this.state.dataSource.findIndex((item) => recordID === item.id);
  };

  changeCheckbox(record, index, value) {
    let data = [...this.state.dataSource]

    data[index]['Vl3StsMemoryFill'] = value ? 1 : 0

    let lstChecked = [...this.state.dataChecked]
    let idx = lstChecked.findIndex(x => x.course_code === record.course_code);
    if (idx === -1) {
      lstChecked.push(record);
      this.setState({
        dataChecked: lstChecked
      });
    } else {
      lstChecked.splice(idx, 1);
      this.setState({
        dataChecked: lstChecked
      });
    }

    this.setState({
      dataSource: data,
    })

    if (this.props.onChangeValue) {
      this.props.onChangeValue({
        Lio_CourseList: lstChecked.map(x => x.course_code).toString(),
        Lio_CourseSelectCondition: this.formRef.current?.getFieldValue('CourseSelectCondition')
      });
    }
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="course-all">
        <Card title="コース(全体)">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Form.Item name="CourseSelectCondition" style={{ marginLeft: 38 }}>
              <Radio.Group
              onChange={() => {
                if (this.props.onChangeValue) {
                  this.props.onChangeValue({
                    Lio_CourseList: this.state.dataChecked.map(x => x.course_code).toString(),
                    Lio_CourseSelectCondition: this.formRef.current?.getFieldValue('CourseSelectCondition')
                  });
                }
              }}
              >
                <Radio value="NOT" style={styleRadio}>これらのコースを全て記載しない</Radio>
                <Radio value="OR" style={styleRadio}>これらのコースのみ記載する</Radio>
                <Radio value="EMP" style={styleRadio}>コースで絞らない</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="SearchChar" label="検索">
              <Input onBlur={() => this.getDataTable(true)} />
            </Form.Item>
          </Form>
          <br />
          <Table
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoading}
            pagination={false}
            bordered
            rowKey={(record) => record.id}
            scroll={{ x: 400, y: 400 }}
          >
            <Table.Column dataIndex='Vl3StsMemoryFill' width={30} align='center'
              render={(value, record, index) => {
                return (
                  <Checkbox checked={record.Vl3StsMemoryFill === 1}
                    onChange={(e) => this.changeCheckbox(record, this.findIndexByID(record.id), e.target.checked)}
                  >
                  </Checkbox>
                )
              }}
            />
            <Table.Column title="ｺｰｽｺｰﾄﾞ" dataIndex="course_code" width={60} align='center'
              render={(value, record, index) => {
                return (
                  <span>{record.course_code ?
                    (record.course_code?.toString().substr(0, 1)
                      + '-'
                      + record.course_code?.toString().substr(1, 2))
                    : ''
                  }
                  </span>
                )
              }} />
            <Table.Column title="コース名称_正式" dataIndex="course_name_formal" />
          </Table>

          {/* <div style={{marginTop: 15, textAlign: "right"}}>
            <Button type='primary'
              onClick={() => {
                if (this.props.onFinishScreen) {
                  this.props.onFinishScreen({
                    Lio_CourseList: this.state.dataChecked.map(x => x.course_code).toString(),
                    Lio_CourseSelectCondition: this.formRef.current?.getFieldValue('CourseSelectCondition')
                  })
                }
              }}
            >閉じる</Button>
          </div> */}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0804062_CourseAll);
