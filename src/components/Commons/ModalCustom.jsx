
import ModalDraggable from "components/Commons/ModalDraggable";

export const ModalCustom = ({ component, footer = null, width, visible, onCancel, destroyOnClose = false, className }) => (
  // <Modal
  //   footer={footer}
  //   width={width}
  //   visible={visible}
  //   bodyStyle={{ margin: 0, padding: 0 }}
  //   maskClosable={false}
  //   onCancel={(e) => onCancel()}
  //   destroyOnClose={destroyOnClose}
  //   focusTriggerAfterClose={true}
  //   modalRender={modal => ( <Draggable><div>{modal}</div></Draggable> )}

  // >
  //   {component}
  // </Modal>
  <ModalDraggable
    className={className}
    focusTriggerAfterClose={true}
    width={width}
    visible={visible}
    maskClosable={false}
    component={component}
    destroyOnClose={destroyOnClose}
    bodyStyle={{ margin: 0, padding: 0 }}
    onCancel={(e) => onCancel()}
  />
)
