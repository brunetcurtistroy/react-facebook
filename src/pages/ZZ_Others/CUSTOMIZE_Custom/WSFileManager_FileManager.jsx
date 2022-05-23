import React from "react";
import PropTypes from 'prop-types';

import { Button, Card, message, Space, Table, Tag, Upload, } from "antd";
import { DeleteOutlined, DownloadOutlined, UploadOutlined, } from '@ant-design/icons';

import axios from 'configs/axios';
import { download_file } from "helpers/CommonHelpers";
import Cookies from "js-cookie";

/**
 * File manager like Windows 's explorer
 * 
 */
class WSFileManager_FileManager extends React.Component {
  static propTypes = {
    // This custom
    Li_Directory: PropTypes.any,

    /**
     * Fake 2612 function
     * {
     *   Li_Division: PropTypes.string,
     *   Li_Identify: PropTypes.string,
     * }
     */
    Params_2612: PropTypes.object,
  };

  constructor(props) {
    super(props);

    // document.title = 'ファイル管理';

    this.state = {
      isLoadingData: false,

      contentList: [],
    };
  }

  componentDidMount() {
    this.loadScreenData();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.loadScreenData();
    }
  }

  sendData = () => {
    return {
      Params_2612: this.props.Params_2612,
      Li_Directory: this.props.Li_Directory,
    };
  }

  loadScreenData = () => {
    this.setState({ isLoadingData: true });

    const data = this.sendData();
    axios.post('/api/custom/file-manager', data)
      .then(res => {
        this.setState({
          contentList: res.data.data,
        });
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }

        message.error(res.data.message);
      })
      .finally(() => this.setState({isLoadingData: false}));
  }

  render() {
    return (<div className="issue-list-input-control">
      <Card title="ファイル管理">
        <div>パス：<Tag color="#2db7f5">{this.props.Li_Directory || (this.props.Params_2612.Li_Division + '/' + this.props.Params_2612.Li_Identify)}</Tag></div>
        <Table loading={this.state.isLoadingData} dataSource={this.state.contentList} size="small">
          <Table.Column title="ファイル名" dataIndex="name" />
          <Table.Column title="更新日" dataIndex="filemtime" />
          <Table.Column title="サイズ" dataIndex="fileSize" render={value => Number(value / 1024).toFixed(2) + 'KB'} />
          <Table.Column
            width={60}
            title={<Upload
              headers={{
                'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
              }}
              withCredentials={true}
              showUploadList={false}
              data={{
                ...this.sendData(),
                Params_2612: this.props.Li_Directory?.length ? false : true,
                Params_2612_Li_Division: this.sendData().Params_2612?.Li_Division,
                Params_2612_Li_Identify: this.sendData().Params_2612?.Li_Identify,
              }}
              action="/api/custom/file-manager/upload"
              onChange={(info) => {
                if (info.file.status === 'uploading') {
                  this.setState({ isLoadingData: true });
                } else {
                  if (info.file.status === 'done') {
                    this.loadScreenData();
                  } else if (info.file.status === 'error') {
                    message.error('エラーが発生しました');
                    this.setState({ isLoadingData: false });
                  }
                }
              }}
            >
              <Button type="primary" icon={<UploadOutlined />} />
            </Upload>}
            render={(value, record) => (<Space>
              <Button type="primary" size="small" icon={<DownloadOutlined />} title="ダウンロード" onClick={() => {
                const data = this.sendData();
                axios.post('/api/custom/file-manager/download', {
                  ...data,
                  name: record.name,
                }, {responseType: 'blob'})
                  .then(res => {
                    download_file(res);
                  })
                  .catch(error => {
                    const res = error.response;
                    if (!res || !res.data || !res.data.message) {
                      message.error('エラーが発生しました');
                      return;
                    }

                    message.error(res.data.message);
                  });
              }}
              />
              <Button danger size="small" icon={<DeleteOutlined />} onClick={() => {
                this.setState({ isLoadingData: true });

                const data = this.sendData();
                axios.post('/api/custom/file-manager/delete', {
                  ...data,
                  name: record.name,
                })
                  .catch(error => {
                    const res = error.response;
                    if (!res || !res.data || !res.data.message) {
                      message.error('エラーが発生しました');
                      return;
                    }

                    message.error(res.data.message);
                  })
                  .finally(() => this.loadScreenData());
              }}></Button>
            </Space>)}
          />
        </Table>
      </Card>
    </div>);
  }
}

export default WSFileManager_FileManager;
