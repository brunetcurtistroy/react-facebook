export const CancelModalByClassNameFunc = (output, className, closeModal) => {
    const path = output.nativeEvent.path[4];
    const ModalContent = path?.children[1];
    const ClassName = ModalContent && ModalContent?.firstChild && ModalContent?.firstChild?.className
    if (ClassName === className) {
        closeModal()
    }
}