import React from 'react';
import PropTypes from 'prop-types';
import axios from 'configs/axios';
import moment from 'moment';
import Color from 'constants/Color';
import { number_format } from 'helpers/CommonHelpers';
import { ReloadOutlined, PlusOutlined,} from '@ant-design/icons';
import {Form, Input, Card, Col, Row, Select, Table, Modal, Menu, Popconfirm, Dropdown, Button, Space, Spin, message, Tag,} from 'antd';
