import React, {Component} from 'react';
import './App.css';
import PokemonList from "./container/Pokemon/PokemonList";
import PokemonDetail from "./container/Pokemon/PokemonDetail";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data_pokemon: null
        };

    }

    getDataPokemon = (data) => {
        this.setState({
            data_pokemon: data
        })
    };

    render() {

        let pokemon;
        if (null != this.state.data_pokemon) {
            pokemon = <PokemonDetail pokemon={this.state.data_pokemon}/>
        }

        return (
            <div>
                <div style={{textAlign: "center"}}>
                    <PokemonList getDataPokemon={this.getDataPokemon}/>
                </div>
                {pokemon}
            </div>
        )
    }
}

export default App;
