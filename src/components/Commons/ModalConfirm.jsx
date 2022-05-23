import { Modal } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

export const ModalConfirm = ({ title, content, icon, okText, cancelText, onOk, styleIconModal, autoFocusButton, onCancel }) => (
    Modal.confirm({
        title: title,
        content: content,
        icon: icon || <QuestionCircleOutlined style={styleIconModal} />,
        okText: okText || 'はい',
        cancelText: cancelText || 'いいえ',
        onOk: onOk,
        onCancel: onCancel,
        autoFocusButton: autoFocusButton
    })
)

export const ModalError = (content, okText, cancelText, onOk) => {
    Modal.error({
        content: content,
        okText: okText || 'はい',
        cancelText: cancelText || 'いいえ',
        onOk: onOk
    })
}

export const ModalInfo = (content, okText, cancelText, onOk) => {
    Modal.info({
        content: content,
        okText: okText || 'はい',
        cancelText: cancelText || 'いいえ',
        onOk: onOk
    })
}