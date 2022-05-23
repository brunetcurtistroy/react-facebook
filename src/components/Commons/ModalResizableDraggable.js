import React, { Component, createRef } from 'react';
import { Modal } from 'antd';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';
import './ModalDraggable.scss';

class ModalResizableDraggable extends Component {

    constructor(props) {
        super(props);

        this.draggableRef = createRef();

        this.state = {
            width: 300,
            height: 400,
        };
    }

    componentDidMount = () => {
        this.setState({
            width: this.props.width ?? 300,
            height: this.props.height ?? 400,
        });
    }

    componentDidUpdate = (prevProps) => {
        if (this.props !== prevProps) {
            this.resetDraggable();
        }
    }

    afterClose = () => {
        this.setState({
            width: this.props.width ?? 300,
            height: this.props.height ?? 400,
        });
    }

    resetDraggable() {
        const current = this.draggableRef?.current
        if (current) {
            current.state.x = 0
            current.state.y = 0
        }
      }

    render() { 
        return (
            <Modal
                className='modal-resize-dragg'
                width={this.props.width}
                footer={null}
                maskClosable={false}
                visible={this.props.visible}
                onCancel={this.props.onCancel}
                afterClose={this.afterClose}
                bodyStyle={{ padding: 0 }}
                modalRender={(modal) => (
                    <Draggable ref={this.draggableRef} handle='.ant-card-head'>
                        {modal}
                    </Draggable>
                )}
            >
                <Resizable
                    minWidth={this.props.minWidth ?? 200}
                    minHeight={this.props.minHeight ?? 475}
                    size={{ width: this.state.width, height: this.state.height }}
                    onResizeStop={(e, direction, ref, d) => {
                        this.setState({
                            width: this.state.width + d.width,
                            height: this.state.height + d.height,
                        });
                    }}
                >
                    {this.props.component}
                </Resizable>
            </Modal>
        );
    }
}

export default ModalResizableDraggable;