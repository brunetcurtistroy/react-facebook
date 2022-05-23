import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Form, Input, Menu, Dropdown, Button, Space, message } from "antd";

import WS0494006_HeaderInput from 'pages/KK_ResultOutput/OITA0310_BindingModeSetting/WS0494006_HeaderInput.jsx';
import WS0267001_CategorySearchQuerySingle from 'pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0267001_CategorySearchQuerySingle.jsx';
import WS0271001_InspectItemSearchQuerySingle from 'pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle.jsx';
import WS0494007_DataInput from 'pages/KK_ResultOutput/OITA0310_BindingModeSetting/WS0494007_DataInput.jsx';
import ModalDraggable from "components/Commons/ModalDraggable";
import { getScreenConditionExpressSetAction, outputConditionExpressSetAction } from "redux/ResultOutput/BindingModeSetting/ConditionExpressSet.actions";
import { ModalError } from "components/Commons/ModalConfirm";
import Menubar from "components/Commons/Menubar";

class WS0494004_ConditionExpressSet extends React.Component {
  inputRef = React.createRef();

  static propTypes = {
    Lio_ConditionalExpression: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '条件式設定';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      data: {
        ConditionalExpressionDisplay: '',
        ConditionalExpression: ''
      },
      stsFocusAll: false,
      textFocus: '',
      positionPointer: 0,
      Lio_Operator: 0,
      Lo_Variable: '+',
      menuItems: [
        { id: 1, label: '訂正', handleClick: this.eventF3 },
        { id: 2, label: 'ヘッダ', handleClick: this.eventF4 },
        { id: 3, label: '総合判定', handleClick: this.eventF7 },
        { id: 4, label: 'ｶﾃｺﾞﾘ', handleClick: this.eventF8 },
        { id: 5, label: '検査', handleClick: this.eventF9 },
        { id: 6, label: '演算子', handleClick: this.eventF10 },
        { id: 7, label: '再表示', handleClick: this.eventF11 },
        { id: 8, label: '更新', handleClick: this.eventF12 },
      ],
    };
  }

  componentDidMount = () => {
    this.loadInitData(this.props.Lio_ConditionalExpression);
  }

  componentDidUpdate = (prevProps) => {
    if (this.props !== prevProps) {
      this.loadInitData(this.props.Lio_ConditionalExpression);
    }
  }

  loadInitData = (params) => {
    getScreenConditionExpressSetAction({ formula: params })
      .then(res => {
        if (res?.data) {
          this.setState({
            data: {
              ConditionalExpressionDisplay: res.data.ConditionalExpressionDisplay,
              ConditionalExpression: res.data.ConditionalExpression
            }
          });
          this.focusAllTextArea()
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  outputCondition = async () => {
    return await outputConditionExpressSetAction({ ConditionalExpression: this.state.data.ConditionalExpression })
      .then(res => res?.data)
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  ReturnComponent = (component) => {
    let components = {
      WS0494006_HeaderInput,
      WS0267001_CategorySearchQuerySingle,
      WS0271001_InspectItemSearchQuerySingle,
      WS0494007_DataInput
    };
    return components[component];
  }

  callModal = (props, width, nameScreen) => {
    let Component = this.ReturnComponent(nameScreen);
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: width,
        component: (
          <Component
            {...props}
            onFinishScreen={({ Lo_HeaderInfo, Lio_CategoryCode, Lio_InspectItemCode, Lio_Operator, Lo_Variable, recordData }) => {
              this.closeModal();
              let value = '';
              if (Lo_HeaderInfo && parseInt(Lo_HeaderInfo) > 0) { // F4
                value = '[H' + Lo_HeaderInfo + ']' + '\n';
              } else if (Lio_CategoryCode && parseInt(Lio_CategoryCode) > 0) { // F8
                value = "'[C" + Lio_CategoryCode + "]'";
              } else if (Lio_InspectItemCode && parseInt(Lio_InspectItemCode) > 0) { // F9
                if (recordData.exam_type === 'S') {
                  // message.warning('所見は使用できません')
                }
                value = "'[K" + Lio_InspectItemCode + "]'";
              } else if (Lo_Variable !== '') { // F10
                value = Lo_Variable;
                this.setState({ Lo_Variable, Lio_Operator })
              }
              if (value.length > 0) {
                this.CharacterInsertion({
                  Li_InsertedChar: value,
                  Li_SelectPosition: this.state.positionPointer,
                  Li_MarkNumChars: this.state.textFocus.length,
                  event: nameScreen
                })
              }
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

  eventF3 = () => {
    this.setState({
      data: {
        ConditionalExpressionDisplay: '',
        ConditionalExpression: ''
      }
    })
  }

  eventF4 = () => {
    let props = { Lo_HeaderInfo: 0 };
    this.callModal(props, 400, 'WS0494006_HeaderInput')
  }

  eventF7 = () => {
    let Li_InsertedChar = '[H5010029]'; // '[H'&Trim(Str(05010029,'8'))&']'
    let Li_SelectPosition = this.state.positionPointer; // CaretPosGet(): vị trí con trỏ trong chuỗi
    let Li_MarkNumChars = this.state.textFocus.length; // Len(MarkedTextGet()): chiều dài chuỗi đang được bôi đen
    this.CharacterInsertion({ Li_InsertedChar, Li_SelectPosition, Li_MarkNumChars })
  }

  eventF8 = () => {
    let props = {
      Lio_CategoryCode: 0,
      Li_UnusedInspectDisplay: ''
    };
    this.callModal(props, 500, 'WS0267001_CategorySearchQuerySingle')
  }

  eventF9 = () => {
    let props = {
      Lio_InspectItemCode: 0,
      Li_UnusedInspectDisplay: ''
    }
    this.callModal(props, 800, 'WS0271001_InspectItemSearchQuerySingle')
  }

  eventF10 = () => {
    let props = {
      Lio_Operator: this.state.Lio_Operator,
      Lo_Variable: this.state.Lo_Variable
    }
    this.callModal(props, 400, 'WS0494007_DataInput')
  }

  eventF11 = () => {
    let content =
      '条件式を確認してください。'
      + '　　　　　　　　　' // break line
      + '検査ﾀｲﾌﾟが[X]の場合は、変数をｼﾝｸﾞﾙｺｰﾃｰｼｮﾝで囲ってください。'
    let valueTemp = this.state.data.ConditionalExpression;
    if (valueTemp?.indexOf('[') === -1 || valueTemp?.lastIndexOf(']') === -1)
      ModalError(content);
    let promise = this.outputCondition();
    promise.then(dataRes => {
      if (this.props.onFinishScreen) {
        this.setState({ data: { ...dataRes } })
      }
    })
  }

  eventF12 = () => {
    let promise = this.outputCondition();
    promise.then(data => {
      if (this.props.onFinishScreen) {
        this.setState({
          data: {
            ConditionalExpressionDisplay: data.ConditionalExpressionDisplay,
            ConditionalExpression: data.ConditionalExpression
          }
        });
        this.props.onFinishScreen({
          Lio_ConditionalExpression: data.ConditionalExpression,
          Lo_ConditionalExpressionDisplay: data.ConditionalExpressionDisplay
        })
      }
    })
  }

  CharacterInsertion = ({ Li_InsertedChar, Li_SelectPosition, Li_MarkNumChars, event }) => {
    // Del(ConditionalExpression,Li_SelectPosition-Li_MarkNumChars,Li_MarkNumChars)
    // Ins(ConditionalExpression,Trim(Li_InsertedChar),Li_SelectPosition-Li_MarkNumChars,Len(Trim(Li_InsertedChar)))
    const { data, stsFocusAll, textFocus } = this.state;
    let valueTemp = data.ConditionalExpression;
    if (stsFocusAll) {// replaceAll value
      valueTemp = Li_InsertedChar;
      this.handleChangeData(valueTemp, 'ConditionalExpression');
    } else {
      if (Li_MarkNumChars > 0) {
        valueTemp = valueTemp.replace(textFocus, '');
      }
      if (valueTemp?.length > 0) {
        let arr, str;
        arr = valueTemp.split('');
        arr.splice(Li_SelectPosition, 0, Li_InsertedChar)
        str = arr.toString();
        valueTemp = str.replaceAll(',', '');
      } else {
        valueTemp = Li_InsertedChar;
      }
      this.setState({
        data: {
          ...data,
          ConditionalExpression: valueTemp
        }
      })
    }
    if (event === 'WS0494006_HeaderInput') {
      this.setState({
        stsFocusAll: false,
        textFocus: '',
        positionPointer: valueTemp.length
      }, () => this.inputRef?.current?.focus({ cursor: 'end' }))
    } else {
      this.setState({
        stsFocusAll: true,
        textFocus: valueTemp,
        positionPointer: valueTemp.length
      }, () => this.inputRef?.current?.focus({ cursor: 'all' }))
    }
  }

  handleChangeData = (value, name) => {
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    })
  }

  focusAllTextArea = () => {
    this.inputRef?.current?.focus({ cursor: 'all' });
    let selection = document.getSelection();
    this.setState({
      stsFocusAll: selection.toString() === this.state.data.ConditionalExpression,
      textFocus: selection.toString(),
      positionPointer: selection.toString().length
    })
  }

  selectPositionPointer = (e) => {
    let selection = document.getSelection();
    this.setState({
      stsFocusAll: selection.toString() === this.state.data.ConditionalExpression,
      textFocus: selection.toString(),
      positionPointer: e.target.selectionEnd
    })
  }

  componentWillUnmount = () => {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        Lio_ConditionalExpression: this.state.data.ConditionalExpression,
        Lo_ConditionalExpressionDisplay: this.state.data.ConditionalExpressionDisplay
      })
    }
  }

  render() {
    return (
      <div className="condition-express-set">
        <Card title='条件式設定'>
          <Form>
            <Menubar items={this.state.menuItems} />
            <Form.Item className='mt-3'>
              <Input.TextArea
                value={this.state.data.ConditionalExpressionDisplay}
                maxLength={1024}
                autoSize={{ minRows: 7, maxRows: 7 }}
                readOnly
                onDoubleClick={() => {
                  let props = {
                    Lio_InspectItemCode: 0,
                    Li_UnusedInspectDisplay: ''
                  }
                  this.callModal(props, 800, 'WS0271001_InspectItemSearchQuerySingle')
                }}
              />
            </Form.Item>
            <Form.Item>
              <Input.TextArea
                ref={this.inputRef}
                value={this.state.data.ConditionalExpression}
                maxLength={1024}
                autoSize={{ minRows: 7, maxRows: 7 }}
                onChange={(e) => this.handleChangeData(e.target.value, 'ConditionalExpression')}
                onSelect={this.selectPositionPointer}
                onDoubleClick={() => {
                  let props = {
                    Lio_InspectItemCode: 0,
                    Li_UnusedInspectDisplay: ''
                  }
                  this.callModal(props, 800, 'WS0271001_InspectItemSearchQuerySingle')
                }}
              />
            </Form.Item>
          </Form>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          destroyOnClose={true}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0494004_ConditionExpressSet);
