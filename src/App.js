import React from "react";
import Body from "./components/Body.js";
import Header from "./components/Header.js";

import "./styles.scss"

export default function App() {
	
	
	return (
		<div className="project-container">
			<Header />
			<Body />
		</div>
	)
}

// useing this API https://pokeapi.co/api/v2/pokemon/{id or name}/
// And https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{pokedex.id}.png for the images