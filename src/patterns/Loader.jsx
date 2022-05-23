import React from "react";
import ReactDOM from 'react-dom';

// import Toast from './Toast';

const Container = "outsideContainer";
const TimeOut = 15000;
var FinishTimeOut;

const LoaderLayout = () => {
	return (
		<div className="backdrop" style={{ 
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			}}>
			<div className="
				spinner-border 
				spinner-colorful
			" style={{ width: "3rem", height: "3rem" }} role="status"></div>
		</div>
	);
}

const StopLoader = () => {
	ReactDOM.unmountComponentAtNode(document.getElementById(Container));
}

export const Loading = () => {
	ReactDOM.render(<LoaderLayout />, document.getElementById(Container));

	FinishTimeOut = setTimeout(() => {
		StopLoader();
		// Toast("danger", "<strong>Whoop!</strong><br/>Something went wrong!");
	}, TimeOut);
}

export const Finish = () => {
	StopLoader();
	clearTimeout(FinishTimeOut);
}
