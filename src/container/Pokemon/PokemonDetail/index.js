import { Tabs } from 'antd';
import React, { Component } from 'react';
import BasicInfo from './BasicInfo';
import './index.css';
import Ability from "./Ability";
import Move from "./Move";
import BasicStatus from "./BasicStatus";


const { TabPane } = Tabs;

class PokemonDetail extends Component {

  state = {
    defaultActiveKey: 1
  }

  componentWillUnmount() {
    this.setState({
      defaultActiveKey: 1
    })
  }

  render() {
    const { name, base_experience, height, weight, types, sprites, abilities, moves, stats } = this.props.pokemon;
    return (
      <div style={{ padding: 30 }}>
        <Tabs defaultActiveKey={this.state.defaultActiveKey} type="card">
          <TabPane tab="Basic Info" key="1">
            <BasicInfo name={name} base_experience={base_experience} weight={weight} height={height}
                       types={types} sprites={sprites} />
          </TabPane>
          <TabPane tab="Basic Status" key="2">
            <BasicStatus stats={stats} />
          </TabPane>
          <TabPane tab="Abilities" key="3">
            <Ability abilities={abilities} />
          </TabPane>
          <TabPane tab="Moves" key="4">
            <Move moves={moves} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default PokemonDetail;
