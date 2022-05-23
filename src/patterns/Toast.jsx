import React from "react";
import ReactDOM from 'react-dom';
import Icon from 'patterns/Icon';

const Container 		= "toastContainer";
const DefaultTimeOut	= 5000;

export const Toast = (state, message, callback) => {
	const parentNode = document.createElement("div");
	document.getElementById(Container).appendChild(parentNode);
	ReactDOM.render(<ToastBody message={message} type={state} callback={callback} />, parentNode);
	
	setTimeout(() => {
		parentNode.classList.add("hiding");
		setTimeout(() => {
			parentNode.remove();
		}, 300);
	}, DefaultTimeOut);
};

const ToastBody = props => {
	const switchIcon = type => {
        switch(type) {
            case "success":
                return <Icon icon="check-circle-fill" />;
            case "danger": 
                return <Icon icon="x-circle-fill" />;
            case "warning":
                return <Icon icon="exclamation-triangle-fill" />;
            case "info": 
                return <Icon icon="info-circle-fill" />;
            default:
                return null;
        }
	}

	const CallBack = (CallBackFn = () => {}) => {
        CallBackFn();
    }

	return (
        <div
			className={`alert alert-${props.type} alert-dismissible alert-icon`}
			role="alert"
			onClick={ () => CallBack(props.callback) }
		>
			<div className="alert-icon">
				{ switchIcon(props.type) }
			</div>
			<div dangerouslySetInnerHTML={{ __html: props.message }}></div>
			<button
				type="button"
				className="close"
				data-dismiss="alert"
			>
				&times;
			</button>
		</div>
    );
}

export default Toast;
