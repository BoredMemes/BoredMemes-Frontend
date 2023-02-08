import React from "react";

const FormatMoneyOptionLabel = ({ value, label, customAbbreviation }) => (
	<div style={{ display: "flex", alignItems: "center", background: "transparent" }}>
		<div>
			<div 
				style={{
					width: "30px", 
					height: "30px", 
					fontSize: "1rem",
					borderRadius: "50%", 
					display: "flex",
					justifyContent: "center", 
					alignItems: "center",
					color:'#3059E8',
					background: "rgb(152, 162, 178, 0.5)"
			}}>
				{
					value === "usd" ? <i className="fas fa-dollar-sign"></i>
					: (value === "eth" ?  <img src="/assets/icons/eth_logo.png" alt="" style={{	width: "14px", height: "18px", borderRadius: "50%"}}/> 
					: (value === "eur" ?  <i className="fas fa-euro-sign"></i> 
					:<img src="/assets/icons/binance_icon.svg" alt="" style={{	width: "30px", height: "30px", borderRadius: "50%"}}/> ))
				}
			</div> 
		</div>
		<div style={{color: "#727272", fontWeight: 500, paddingLeft: "10px", fontSize:16}}>{label}</div>
	</div>
);

export default FormatMoneyOptionLabel;
