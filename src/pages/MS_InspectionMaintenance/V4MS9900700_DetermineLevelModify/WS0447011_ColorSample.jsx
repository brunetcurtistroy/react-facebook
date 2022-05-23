import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { getDataColorSampleAction } from "redux/InspectionMaintenance/DetermineLevelModify/ColorSample.actions";

class WS0447011_ColorSample extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '色サンプル';

    this.state = {
      dataSource: [],
      isLoading: true,
      HighlightSwitch: false,
    };
  }

  componentDidMount = () => {
    this.setState({isLoading: true});
    getDataColorSampleAction()
      .then(res => {
        if(res){
          this.setState({
            dataSource: res.data.data,
            HighlightSwitch: parseInt(res.data.HighlightSwitch) === 1 ? true : false, 
          })
        }
      })
      .finally(() => this.setState({isLoading: false}))
  }

  handleChangeCheckbox = (e) => {
    this.setState({HighlightSwitch: e.target.checked})
  }

  render() {
    return (
      <div className="color-sample" style={{width: 300}}>
        <Card title="色サンプル">
          <Table
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoading}
            pagination={false}
            rowKey={(record) => record.id}
            scroll={{y: 600}}
            onRow={(record, index) => ({ onDoubleClick: event => {
              if(this.props.onFinishScreen){
                this.props.onFinishScreen({Lio_ColorCode: record.ColorSample, recordData: record});
              }
            }})}
          >
            <Table.Column title="No" dataIndex="W2_color_cd" />
            <Table.Column title="サンプル" dataIndex="ColorSample" />
          </Table>
          <Checkbox 
            className='mt-3'
            onChange={this.handleChangeCheckbox}
            checked={this.state.HighlightSwitch}
            >ﾊｲﾗｲﾄ</Checkbox>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0447011_ColorSample);
