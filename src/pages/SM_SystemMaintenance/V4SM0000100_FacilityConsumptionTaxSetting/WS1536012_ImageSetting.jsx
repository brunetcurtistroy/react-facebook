/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Button, Card, Form, Input, Space, Upload, } from "antd";

import defaultImg from 'assets/img/userlogo.bmp';
import { SaveOutlined, DeleteOutlined } from '@ant-design/icons';
import ImageSettingAction from "redux/SystemMaintenance/FacilityConsumptionTaxSetting/ImageSetting.action";

const styleCustom = {
  styleImg: {
    marginBottom: '0.5em',
    width: '500px',
    height: 'auto',
    cursor: 'pointer'
  }
}
class WS1536012_ImageSetting extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Lio_ImageFile: PropTypes.any, 

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '画像設定';

    this.state = {
      urlFile: defaultImg,
      file: {}
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        urlFile: defaultImg,
        file: {}
      });
    }
  }

  uploadImage() {
    let formData = new FormData();
    formData.append("Lio_ImageFile", this.state.file);
    ImageSettingAction.uploadImage(formData)
    .then((res) => {
      if (this.props.onFinishScreen) {
        this.props.onFinishScreen({
          Lio_ImageFile: res ? res.facilities_logo_file : '',
        });
      }
    })
  }

  onFinish() { }

  removeImage() {
    this.setState({
      urlFile: defaultImg
    })
    this.formRef.current?.setFieldsValue({
      Lio_ImageFile: ''
    })
  }

  render() {
    return (
      <div className="image-setting">
        <Card title="画像設定">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <div style={{ margin: '20px', textAlign: 'center' }}>
              <img src={this.state.urlFile} style={styleCustom.styleImg} />
            </div>

            <Form.Item name="Lio_ImageFile" label="ファイル">
              <Input readOnly
                onClick={() => {
                  document.getElementById("idUpload").click()
                }}
              />
            </Form.Item>
            <Upload id="idUpload" accept=".jpg, .jpeg, .png" beforeUpload={(file) => {
              return new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                  console.log(file, URL.createObjectURL(file))
                  this.setState({
                    file: file,
                    urlFile: URL.createObjectURL(file)
                  })
                  this.formRef.current?.setFieldsValue({
                    Lio_ImageFile: file.name
                  })
                };
              });
            }}>&emsp;
              </Upload>
            <Space style={{ float: 'right' }}>
              <Button type="primary"
                icon={<DeleteOutlined />}
                onClick={() => { this.removeImage() }}
              > 削除 </Button>
              <Button type="primary"
                icon={<SaveOutlined />}
                onClick={() => { 
                  this.uploadImage()
                 }} 
              >保存</Button>
            </Space>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1536012_ImageSetting);
