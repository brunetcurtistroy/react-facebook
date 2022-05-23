import React from "react";
import { connect } from "react-redux";

import { Card, Table, Form, Row, Col, Button, Input, Space } from "antd";

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  ...restProps
}) => {
  const saveInput1 = async (value) => {
    console.log("Save 1:", value.target.value);
  };
  const saveInput2 = async (value) => {
    console.log("Save 2:", value.target.value);
  };
  const saveInput3 = async (value) => {
    console.log("Save 3:", value.target.value);
  };
  let childNode = children;
  if (editable) {
    childNode = (
      <Form.Item style={{ margin: 0 }}
      >
        <Input id={record.key} onPressEnter={saveInput1} style={{ marginBottom: '0.1em' }} defaultValue={children[1]} />
        <Input id={record.key + "*"} onPressEnter={saveInput2}  />
      </Form.Item>
    )
  } else {
    childNode = (
      <Form.Item style={{ margin: 0 }} 
      >
        <Input id={record.key} onPressEnter={saveInput3} defaultValue={children[1]} />
      </Form.Item>
    )
  }
  return <td {...restProps}>{childNode}</td>;
};
const grid = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
}
class WS0343080_SelectOffice extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '事業所選択';

    this.state = {
      insurerNumber: "",
      insuranceCard: "",
      insuranceNumber: "",

    };
    this.columns = [
      {
        title: "事業所",
        dataIndex: "office",
        align:"center"
      },
      {
        title: "保険者番号",
        dataIndex: "insurerNumber",
        align:"center"
      },
      {
        title: "保険証記号/番号",
        dataIndex: "insuranceNumber",
        editable: true,
        align:"center"
      }
    ];
    //data test
    this.state = {
      dataSource: [
        {
          key: "0",
          office: "",
          insurerNumber: "",
          insuranceNumber: ""
        },
        {
          key: "2",
          office: "",
          insurerNumber: "",
          insuranceNumber: ""
        }
      ],
    };
  }

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell
      }
    };
    const columns = this.columns.map((col) => {
      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
        }),
      };
    });
    return (
      <div className="select-office">
        <Form ref={this.formRef} {...grid}>
          <Card title="事業所選択" >
            <Row className="mb-3 ">
              <Col lg={24} xl={12} className="d-flex align-items-center">
                <Space >
                  <span span={10}>保険者番号</span> <span>{this.state.insurerNumber}</span>
                </Space>
              </Col>
            </Row>
            <Row>
              <Col sm={10} xl={4} className="d-flex align-items-center">
                <Space >
                  <span >保険証記号</span> <span>{this.state.insuranceCard} </span>
                </Space>
              </Col>
              <Col sm={10} xl={4} className="d-flex align-items-center">
                <Space >
                  <span >保険証番号</span> <span>{this.state.insuranceNumber}</span>
                </Space>
              </Col>
            </Row>
            <Row style={{ marginTop: '2em' }}>
              <Col span={24}>
                <Table
                  components={components}
                  bordered={true}
                  dataSource={dataSource}
                  columns={columns}
                  pagination={false}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: event => {
                      }, // click row
                     
                    };
                  }}
                />
              </Col>
            </Row>
            <div style={{ float: 'right', 'margin': '0.5em 0' }}>
              <Button type="primary"  onClick={() => {}}> 選択
              </Button>
            </div>
          </Card>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0343080_SelectOffice);
