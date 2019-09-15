import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import PokemonList from "./container/Pokemon/PokemonList";
import PokemonDetail from "./container/Pokemon/PokemonDetail";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data_pokemon: null,
            moves: null
        };

    }

    fetchDataMoves = (data) => {

        let urls = data.map(obj => axios.get(obj.move.url));

        axios.all(urls)
            .then(res => res.map(value => value.data))
            .then(res => {
                const data = res.map(value => {
                    return {
                        id: value.id,
                        name: value.name,
                        accuracy: value.accuracy,
                        target: value.target,
                        type: value.type
                    };
                });

                this.setState({
                    moves: data
                }, () => console.log(this.state.moves))
            })
            .catch(err => console.log(err));
    };

    getDataPokemon = (data) => {
        this.fetchDataMoves(data.moves);

        this.setState({
            data_pokemon: data
        })
    };

    render() {

        let pokemon;
        if (null != this.state.data_pokemon) {
            pokemon = <PokemonDetail pokemon={this.state.data_pokemon} moves={this.state.moves}/>
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
