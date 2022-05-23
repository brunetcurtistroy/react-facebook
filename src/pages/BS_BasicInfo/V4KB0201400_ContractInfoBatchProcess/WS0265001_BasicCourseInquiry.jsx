import React from "react";
import PropTypes from 'prop-types';

import {
  Card, Form, Input, Button, Table, message
} from "antd";
import { ReloadOutlined } from '@ant-design/icons';

import axios from "configs/axios";
import { debounce } from "lodash";

const grid = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};

/**
* @extends {React.Component<{onSelect:Function}>}
*/
class WS0265001_BasicCourseInquiry extends React.Component {
  static propTypes = {
    Lo_CourseCode: PropTypes.func,
    Lo_CourseName: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '基本コース照会';

    this.state = {
      coursesData: [],

      isLoadingCourse: false,
    };

    this.loadCourses = this.loadCourses.bind(this);
  }

  componentDidMount() {
    this.loadCourses();
  }

  loadCourses() {
    this.setState({ isLoadingCourse: true });

    const formIns = this.formRef.current;

    axios.get('/api/contract-info-batch-process/basic-course-inquiry', {
      params: {
        ShortNameSearch: formIns.getFieldValue('ShortNameSearch'),
      },
    })
      .then(res => {
        this.setState({
          coursesData: res.data,
        })
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
        this.setState({ isLoadingCourse: false });
      });
  }

  render() {
    return (
      <div className="basic-course-inquiry">
        <Card title="基本コース照会">
          <Form {...grid} ref={this.formRef}>
            <Form.Item name="ShortNameSearch" label="略称検索">
              <Input onChange={debounce(() => this.loadCourses(), 300)} />
            </Form.Item>

            <Table 
            size='small'
            dataSource={this.state.coursesData} 
            loading={this.state.isLoadingCourse} 
            rowKey={(record) => record.course_code} 
            pagination={{ showQuickJumper: true, showSizeChanger: true, }} 
            bordered
            scroll={{x: 700, y: 700}}
            >
              <Table.Column title="ｺｰｽｺｰﾄﾞ" dataIndex="course_code" align='center' width={80}/>
              <Table.Column title="コース略称" dataIndex="course_name_short_name" />
              <Table.Column title="コース名称" dataIndex="course_name_formal" />
              <Table.Column title="予約項目" dataIndex={['reserve_item', 'W1_reserves_item_name']} width={130}/>
              <Table.Column title="ﾊﾟﾀｰﾝｺｰﾄﾞ" dataIndex="pattern_code" align='center' width={100}/>
              <Table.Column key="action" align='center' width={70} fixed='right'
                title={(
                  <Button type="primary" icon={<ReloadOutlined />} loading={this.state.isLoadingInsurersList} onClick={() => this.loadCourses()} />
                )}
                render={(value, record) => (
                  <Button type="primary" size="small" htmlType="button" onClick={() => {
                    const func = this.props.onSelect || this.props.onFinishScreen;
                    func({
                      Lo_CourseCode: record.course_code,
                      Lo_CourseName: record.course_name_short_name,
                      recordData: record,
                    });
                  }}>選択</Button>
                )}
              />
            </Table>
          </Form>
        </Card>
      </div>
    );
  }
}

export default WS0265001_BasicCourseInquiry;
