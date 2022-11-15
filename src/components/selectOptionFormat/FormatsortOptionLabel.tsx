import React from "react";

const FormatsortOptionLabel = ({ value, label, customAbbreviation }) => (
	<div style={{ display: "flex", alignItems: "center", background: "transparent", height: "40px" }}>
		<div style={{color: "black", fontWeight: 500, paddingLeft: "10px"}}>{label}</div>
	</div>
);

export default FormatsortOptionLabel;
