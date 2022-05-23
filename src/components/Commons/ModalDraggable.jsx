import Draggable from 'react-draggable';
import { Modal } from "antd";
import React from "react";
import { connect } from "react-redux";
import './ModalDraggable.scss';
import { setDisplayComponent } from "redux/user/user.actions";

let divArr = ['top', 'left', 'right', 'bottom']
class ModalDraggable extends React.Component {
  draggleRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
    }
  }

  resetDraggable() {
    const current = this.draggleRef?.current
    if (current) {
      current.state.x = 0
      current.state.y = 0
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.resetDraggable()

      // Get a modal screen ID for testing
      if (this.props.visible) {
        const screenName = this.props.component?.type.WrappedComponent?.name + ' (ﾓｰﾀﾞﾙ)';
        if (this.props.componentName === screenName) return;
        // redux
        this.props.setDisplayComponent(screenName);
      }
    }
  }
  DraggableRender = (modal) => {
    const { disabled } = this.state;
    return (<Draggable
      disabled={disabled}
      ref={this.draggleRef}
    >
      {modal}
    </Draggable>)
  }
  handleMouseOver = () => {
    const { disabled } = this.state
    if (disabled) {
      this.setState({ disabled: false })
    }
  }
  handleMouseOut = () => {
    this.setState({ disabled: true })
  }
  squareLine = () => {
    return <div className="parent">
      {divArr.map((item, index) => {
        return <div className={item} key={index}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}></div>
      })}
    </div>
  }
  render() {
    const { afterClose = null, component, footer = null, width, visible, onCancel, destroyOnClose = false, className } = this.props
    return <Modal
      className={className}
      footer={footer}
      afterClose={afterClose}
      title={this.squareLine()}
      width={width}
      visible={visible}
      bodyStyle={{ margin: 0, padding: 0 }}
      maskClosable={false}
      onCancel={(e) => onCancel()}
      destroyOnClose={destroyOnClose}
      focusTriggerAfterClose={true}
      modalRender={modal => this.DraggableRender(modal)}
    >
      {component}
    </Modal>
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
  componentName: userReducer.component,
});

const mapDispatchToProps = (dispatch) => ({
  setDisplayComponent: (componentName) => dispatch(setDisplayComponent(componentName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalDraggable);
