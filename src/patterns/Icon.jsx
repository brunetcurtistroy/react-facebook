import React from "react";
import BSIcon from "bootstrap-icons/bootstrap-icons.svg";

const Icon = ({ icon, size = "1em", color = null, verticalAlign = "initial" }) => (
    <svg
        className="bi"
        width={size}
        height={size}
        fill={color}
        style={{ 
			"color": color,
			"verticalAlign": verticalAlign
		}}
    >
        <use xlinkHref={BSIcon + "#" + icon} />
    </svg>
);

export default Icon;
