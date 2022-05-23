import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Card, Form, Select, Spin, } from "antd";
import PatternChangeAction from "redux/InputBusiness/NotInputCheckCategory/PatternChange.action";

class WS0745022_PatternChange extends React.Component {
  static propTypes = {
    Lio_Pattern: PropTypes.any,
  };

  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'ﾊﾟﾀｰﾝ変更';

    this.state = {
      isLoadingForm: false,
      lstPattern: [],
      StsPatternCorrection: 0
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

  getDataScreen() {
    this.setState({ isLoadingForm: true })
    PatternChangeAction.getDataScreen()
      .then((res) => {
        this.setState({
          lstPattern: res
        })
        this.formRef.current?.setFieldsValue({
          Lio_Pattern: res && res.length > 0 ? this.props.Lio_Pattern ? this.props.Lio_Pattern : res[0].LinkField : ''
        })
      })
      .finally(() => this.setState({ isLoadingForm: false }))
  }

  onFinish(values) { }

  checkStsPatternCorrection(data) {
    const dataChange = data;
    const dataCurrent = this.props.Lio_Pattern ? this.props.Lio_Pattern : this.state.lstPattern[0].LinkField
    if (dataCurrent !== dataChange) {
      this.setState({ StsPatternCorrection: 1 })
    }
  }

  render() {
    return (
      <div className="pattern-change">
        <Card title="ﾊﾟﾀｰﾝ変更">
          <Spin spinning={this.state.isLoadingForm}>
            <Form
              ref={this.formRef}
              onFinish={this.onFinish}
            >
              <Form.Item name="Lio_Pattern" label="ﾊﾟﾀｰﾝ" >
                <Select onChange={(event) => this.checkStsPatternCorrection(event)}>
                  {this.state.lstPattern?.map((item, index) => (
                    <Select.Option key={index} value={item.LinkField}>{item.DisplayField}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item style={{ float: 'right', marginTop: 15 }}>
                <Button size="small" type="primary"
                  onClick={() => {
                    if (this.props.onFinishScreen) {
                      this.props.onFinishScreen({
                        Lio_Pattern: this.formRef.current?.getFieldValue('Lio_Pattern'),
                        StsPatternCorrection: this.state.StsPatternCorrection
                      });
                    }
                  }}
                >
                  選択
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0745022_PatternChange);
