import React, { createRef, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { debounce } from 'lodash';
import { Card, Form, Input, Select, Row, Col, List, Button } from 'antd';
import { getPublics, getCities, getAreas, setCurrentArea } from '../../../redux/basicInfo/InsurerInfoMaintain/InsurerInfoMaintain.actions'

class WS0084001_PostCodeSearchEngine extends Component {
  formRef = createRef();
  
  static propTypes = {
    Lio_ZipCode: PropTypes.any,
    Lio_Address: PropTypes.any,
    Li_CurrentPublic: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };
  
  constructor(props) {
    super(props);

    // document.title = '郵便番号検索';

    this.state = {
      isLoadingPostCodeData: false,

      isLoadingPublic: false,
      isLoadingCity: false,
      isLoadingArea: false,
    };

    this.loadAreas = debounce(this.loadAreas, 300);
    this.loadCities = debounce(this.loadCities, 300);

    this.onOk = this.onOk.bind(this);
  }

  componentDidMount() {
    this.setState({
      isLoadingPublic: true,
    });
    this.props.getPublics(this.props.Li_CurrentPublic ? this.props.Li_CurrentPublic : '')
      .finally(() => {
        this.setState({
          isLoadingPublic: false,
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.Li_CurrentPublic && this.props.Li_CurrentPublic !== prevProps.Li_CurrentPublic) {
      this.setState({
        isLoadingPublic: true,
      });
      this.props.getPublics(this.props.Li_CurrentPublic)
        .finally(() => {
          this.setState({
            isLoadingPublic: false,
          });
        });
    }
  }

  loadCities(data) {
    this.setState({
      isLoadingCity: true
    })
    this.props.getCities(data)
      .finally(() => {
        this.setState({
          isLoadingCity: false
        })
      });
  }

  loadAreas(data) {
    this.setState({
      isLoadingArea: true,
    })
    this.props.getAreas(data)
      .finally(() => {
        this.setState({
          isLoadingArea: false,
        })
      });
  }

  handleChangeArea = area => {
    this.props.setCurrentArea(area);
  }

  onOk() {
    const { currentPublic, currentCity, currentArea, onOk } = this.props;
    const { area, zip_7 } = currentArea;

    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        Lio_ZipCode: zip_7,
        Lio_Address: currentPublic + currentCity + area,
      });
    }

    if (onOk) {
      onOk(zip_7, currentPublic + currentCity + area);
    }
  }

  render() {
    const year = '2021年度';
    const { Option } = Select;
    const { publics, cities, areas, currentPublic, currentCity, currentArea } = this.props;

    return (
      <div className="post-code-search-engine">
        <Card title={`郵便番号検索 - ${year}`}>
          <Form ref={this.formRef}>
            <Form.Item>
              <div style={{ background: '#1166BB', color: 'white', padding: '5px' }}>〒{currentArea.zip_7} {currentPublic}{currentCity}{currentArea.area}</div>
            </Form.Item>
            <Form.Item>
              <Select value={currentPublic} className="select-after" style={{ width: '25%' }} size="large" onChange={(val) => {
                const data = { public: val, city_search: '' };
                this.loadCities(data);
              }}>
                {
                  publics.map((code, index) => (
                    <Option key={index} value={code}>{code}</Option>
                  ))
                }
              </Select>
            </Form.Item>
            <Form.Item>
              <Input.Group compact>
                <Input size="large" style={{ width: '25%' }} onChange={(e) => {
                  const { value } = e.target;
                  const { currentPublic } = this.props;
                  const data = { public: currentPublic, city_search: value }
                  this.loadCities(data);
                }} />
                <Input size="large" style={{ width: '75%' }} onChange={(e) => {
                  const { value } = e.target;
                  const { currentPublic, currentCity } = this.props;
                  const data = { public: currentPublic, city: currentCity, area_search: value }
                  this.loadAreas(data);
                }} />
              </Input.Group>
            </Form.Item>
            <Form.Item
            >
              <Row>
                <Col span={6}>
                  <List size="small" bordered dataSource={cities}
                    className="scrollbar"
                    style={{ height: '400px', overflowY: 'auto' }}
                    loading={this.state.isLoadingPublic || this.state.isLoadingCity}
                    renderItem={city => (
                      <List.Item
                        style={{ cursor: 'pointer', backgroundColor: (currentCity === city) ? '#a3d3ff' : '' }}
                        onClick={() => {
                          const { currentPublic } = this.props;
                          const data = { public: currentPublic, city, area_search: '' }
                          this.loadAreas(data);
                        }}
                        >
                        {city}
                      </List.Item>
                    )}
                  />
                </Col>
                <Col span={18}>
                  <List size="small" bordered dataSource={areas}
                    className="scrollbar"
                    style={{ height: '400px', overflowY: 'auto' }}
                    loading={this.state.isLoadingPublic || this.state.isLoadingCity || this.state.isLoadingArea}
                    renderItem={item => (
                      <List.Item
                        style={{ cursor: 'pointer', backgroundColor: (currentArea.area === item.area) ? '#a3d3ff' : '' }}
                        onClick={() => this.handleChangeArea(item)}
                        >
                        {item.area}
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={{ float: 'right' }}>
              <Button type="primary" htmlType="submit" onClick={this.onOk}>確定</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    publics: state.InsurerInfoMaintainReducer.publics,
    cities: state.InsurerInfoMaintainReducer.cities,
    areas: state.InsurerInfoMaintainReducer.areas,
    currentPublic: state.InsurerInfoMaintainReducer.currentPublic,
    currentCity: state.InsurerInfoMaintainReducer.currentCity,
    currentArea: state.InsurerInfoMaintainReducer.currentArea
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPublics: data => dispatch(getPublics(data)),
    getCities: data => dispatch(getCities(data)),
    getAreas: data => dispatch(getAreas(data)),
    setCurrentArea: area => dispatch(setCurrentArea(area))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WS0084001_PostCodeSearchEngine);
