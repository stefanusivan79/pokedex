import React, { Component } from 'react';
import './App.css';
import PokemonList from "./container/Pokemon/PokemonList";
import 'antd/dist/antd.min.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data_pokemon: null,
            moves: null
        };

    }

    getDataPokemon = (data) => {
        this.setState({
            data_pokemon: data
        })
    };

    render() {
        return (
            <div>
                <div style={{ textAlign: "center" }}>
                    <PokemonList getDataPokemon={this.getDataPokemon} />
                </div>
            </div>
        )
    }
}

export default App;
