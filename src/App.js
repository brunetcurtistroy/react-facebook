import React from "react";
import { ConfigProvider } from "antd";
import { BrowserRouter, Switch, Route, Router } from "react-router-dom";
import { connect } from "react-redux";
import ja_JP from "antd/lib/locale/ja_JP";
import moment from 'moment';
import 'moment/locale/ja';

import WS2517001_SignInScreen from "./pages/MN_Basis/V5MN0001000_Main/WS2517001_SignInScreen.jsx";
import WS2519001_MainMenu from "./pages/MN_Basis/V5MN0001000_Main/WS2519001_MainMenu.jsx";
import WS3061001_PassingControlInspectsDisplay from './pages/ZZ_Others/V5IS01010_PassingControlInspectsDisplay/WS3061001_PassingControlInspectsDisplay';
import PageNotFound from "./pages/Common/Error/PageNotFound.jsx";

import { history } from "./constants/BrowserHistory";
import { clear } from "./redux/alert/alert.actions";

import "./assets/scss/App.scss";

class App extends React.Component {
  constructor(props) {
    super(props);

    moment.locale('ja');
    moment.defaultFormat = 'YYYY/MM/DD';
    moment.updateLocale(moment.locale(), { invalidDate: '0000/00/00' });
    ja_JP.Popconfirm = {
      ...ja_JP.Popconfirm,
      cancelText: 'いいえ',
      okText: 'はい',
    };
    ja_JP.Modal = {
      ...ja_JP.Modal,
      cancelText: 'いいえ',
      justOkText: 'はい',
      okText: 'はい',
    };

    history.listen(() => {
      // clear alert on location change
      this.props.clear();
    });
  }

  render() {
    return (
      <ConfigProvider locale={ja_JP}>
        <BrowserRouter forceRefresh={true}>
          <Router history={history}>
            <Switch>
              {/* Login Pages */}
              <Route exact={true} path="/login/:hospital" component={WS2517001_SignInScreen} />
              <Route path="/login/" component={PageNotFound} />

              {/* WS3061001_PassingControlInspectsDisplay Page */}
              <Route path="/passing-control-inspects-display/passing-control-inspects-display/:num/:date"
                component={WS3061001_PassingControlInspectsDisplay}
                exact={true} key="route_ws3061001" />

              {/* MainMenu Pages */}
              <Route path="/" component={WS2519001_MainMenu} />

              {/* Page404 Pages */}
              <Route path="*" component={PageNotFound} />
            </Switch>
          </Router>
        </BrowserRouter>
      </ConfigProvider>
    );
  }
}
const mapStateToProps = ({ userReducer }) => ({
  loggedIn: userReducer.loggedIn
});
const mapDispatchToProps = (dispatch) => ({
  clear: () => dispatch(clear())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
