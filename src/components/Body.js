import React from "react";

function getRandomIndex(lowerBound, upperBound) {
	return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
}

export default function Body() {
	const [pokemon, setPokemon] = React.useState({});
	const [pokemonIndex, setPokemonIndex] = React.useState(1);
	const [disableButton, setDisableButton] = React.useState(false);
	
	const btnStyles = {
		backgroundColor: disableButton ? "gray" : "inherit"
	}
	
	function disableBtn() {
		setDisableButton(true);
		setTimeout(() => setDisableButton(false), 1500);
	}
	
	function loadRandomPokemon(e) {
		e.preventDefault()
		const randomIndex = getRandomIndex(1, 898)
		setPokemonIndex(randomIndex);
		disableBtn();
	}
	
	React.useEffect(() => {
		fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`)
		.then(res => res.json())
		.then(setPokemon)
	}, [pokemonIndex]);
	
	const specifics = React.useMemo(() => {
		if (!pokemon) {
			return null;
		}
		return {
			pokemonImage: pokemon.sprites ? pokemon.sprites.other[`official-artwork`].front_default : [],
			pokemonName: pokemon.name,
			pokemonId: pokemon.id,
			pokemonType: pokemon.types ? pokemon.types.map((type) => type.type.name) : [],
			pokemonAbility: pokemon.abilities ? pokemon.abilities.map((ability) => ability.ability.name) : []
		};
	}, [pokemon])

	return (
        <div className="body-container">
			<div className="wider-screen-pokemon-name">
				<span>{specifics.pokemonName}</span>
			</div>
			<div className="image-container">
				<img className="pokemon-image" src={specifics.pokemonImage}></img>
			</div>
			<div className="info-container">
				<div>
					<h3 className="narrow-screen-pokemon-h3">Pokemon</h3>
					<div className="poke-info-div narrow-screen-pokemon-name">
						<span>{specifics.pokemonName}</span>
					</div>
					<h3>Pokemon ID</h3>
					<div className="poke-info-div">
						<span>#{specifics.pokemonId}</span>
					</div>
					<h3>Pokemon Type(s)</h3>
					<div className="poke-info-div">
						{specifics.pokemonType.length === 1 ? <span>{specifics.pokemonType}</span> : <span>{specifics.pokemonType[0]} / {specifics.pokemonType[1]}</span>}
					</div>
					<h3>Pokemon Abilities</h3>
					<div className="poke-info-div">
						{specifics.pokemonAbility.length === 1 ? <span>{specifics.pokemonAbility}</span> : <span>{specifics.pokemonAbility[0]} / {specifics.pokemonAbility[1]}</span>}
					</div>
				</div>
			</div>
			<button style={btnStyles} className="button" onClick={loadRandomPokemon} disabled={disableButton} type="button">New Pokemon</button>
        </div>
    )
}