import {Button, Card, List, message, Spin} from 'antd';
import axios from 'axios';

import InfiniteScroll from 'react-infinite-scroller';
import React, {Component} from "react";
import './index.css';
import 'antd/dist/antd.min.css';

let url = 'https://pokeapi.co/api/v2/pokemon/';

class PokemonList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: false,
            hasMore: true,
            dataDetail: {},
            isLoading: false
        };

    }


    componentDidMount() {
        this.fetchData(res => {
            this.setState({
                data: res.results,
            });
        });
    }

    fetchData = callback => {
        axios.get(url)
            .then(res => res.data)
            .then(res => {
                url = res.next;
                callback(res);
            })
    };

    handleInfiniteOnLoad = () => {
        let {data} = this.state;
        this.setState({
            loading: true,
        });
        if (url == null) {
            message.warning('Pokemon List loaded all');
            this.setState({
                hasMore: false,
                loading: false,
            });
            return;
        }
        this.fetchData(res => {
            data = data.concat(res.results);
            this.setState({
                data,
                loading: false,
            });
        });
    };

    sendDataViewDetail = (url) => {
        axios.get(url)
            .then(res => {
                this.setState({
                    dataDetail: res.data,
                    isLoading: false
                }, () => {
                    this.props.getDataPokemon(res.data)
                });
            })
            .catch(err => {
                this.setState({
                    dataDetail: err,
                    isLoading: false
                })
            });
    };

    render() {
        return (
            <div>
                <div className="container-list-pokemon">
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={this.handleInfiniteOnLoad}
                        hasMore={!this.state.loading && this.state.hasMore}
                        useWindow={false}
                    >
                        <List
                            grid={{
                                gutter: 16,
                                xs: 2,
                                sm: 3,
                                md: 4,
                                lg: 5,
                                xl: 6,
                                xxl: 8
                            }}
                            dataSource={this.state.data}
                            renderItem={item => (
                                <List.Item>
                                    <Card title={item.name}>
                                        <Button type={"dashed"} onClick={() => this.sendDataViewDetail(item.url)}>
                                            View
                                        </Button>
                                    </Card>
                                </List.Item>
                            )}
                        >
                            {this.state.loading && this.state.hasMore && (
                                <div className="loading-container">
                                    <Spin/>
                                </div>
                            )}
                        </List>
                    </InfiniteScroll>
                </div>
            </div>
        );
    }
}

export default PokemonList;