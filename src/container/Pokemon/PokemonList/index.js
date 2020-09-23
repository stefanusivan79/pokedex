import { Button, Modal, Pagination, Table } from 'antd';
import axios from 'axios';
import React, { Component } from "react";
import PokemonDetail from '../PokemonDetail';
import './index.css';

let url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10';

class PokemonList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      count: null,
      data: [],
      visibleModal: false,
      urlPokemon: '',
      dataPokemon: {}
    };

  }

  componentDidMount() {
    this.setState({
      isLoading: true
    })

    axios.get(url).then(response => {
      const { count, results } = response.data;
      results.forEach(x => {
        x.key = x.name
      });
      this.setState({
        count: count,
        data: results,
        isLoading: false
      })
    }).catch(error => {
      console.error(`error : ${error}`)
      this.setState({
        isLoading: false
      })
    })
  }

  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Action',
      render: (record) => {
        return <Button onClick={() => this.showDetailPokemon(record.url)}>View</Button>
      }
    }
  ]

  showDetailPokemon = (urlDetail) => {
    axios.get(urlDetail).then(response => {
      const { data } = response;
      this.setState({
        dataPokemon: data,
        urlPokemon: urlDetail,
        visibleModal: true
      })
    });
  }

  fetchData = (page, limit) => {
    this.setState({
      isLoading: true
    })
    const offset = (page * limit) - limit;
    const urlApi = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    axios.get(urlApi).then(response => {
      const { count, results } = response.data;
      results.forEach(x => {
        x.key = x.name
      });
      this.setState({
        count: count,
        data: results,
        isLoading: false
      })
    }).catch(error => {
      this.setState({
        isLoading: false
      })
    })

  }

  displayTable = (data, isLoading) => {
    return (
      <Table
        dataSource={data}
        columns={this.columns}
        pagination={false}
        loading={isLoading}
      />
    );
  }

  displayPagination = (count) => {
    return (
      <Pagination
        style={{ float: "right" }}
        total={count}
        showSizeChanger
        defaultCurrent={1}
        onChange={(page, pageSize) => this.fetchData(page, pageSize)}
        onShowSizeChange={(current, size) => {
          if (current === 0) current = 1;
          this.fetchData(current, size);
        }}
      />
    )
  }

  handleOk = e => {
    this.setState({
      visibleModal: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visibleModal: false,
      urlPokemon: ''
    });
  };

  render() {
    const { count, data, isLoading, dataPokemon } = this.state;

    return (
      <>
        <div style={{ width: '50%', margin: 'auto' }}>
          <h2>Pokédex</h2>

          {this.displayTable(data, isLoading)}

          <br />

          {this.displayPagination(count)}

          <br />
        </div>
        <Modal
          title="Pokemon Detail"
          visible={this.state.visibleModal}
          onCancel={this.handleCancel}
          footer={null}
        >
          <PokemonDetail pokemon={dataPokemon} />
        </Modal>
      </>
    );
  }
}

export default PokemonList;
