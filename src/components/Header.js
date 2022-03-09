import React from "react";
import pokemonLogo from "../images/pokemon-logo.png"

export default function Header() {
	
	return (
		<div className="header-container">
			<img className="logo-img" src={pokemonLogo}></img>
		</div>
	)
}