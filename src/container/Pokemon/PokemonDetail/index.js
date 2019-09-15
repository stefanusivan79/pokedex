import React from 'react';
import {Card, Descriptions, List, Tabs} from 'antd';

import 'antd/dist/antd.min.css';
import './index.css';

const {TabPane} = Tabs;

const PokemonDetail = (props) => {

    let {types, sprites, abilities, name} = props.pokemon;
    const {moves} = props;

    let dataAbilities = abilities.map(obj => (obj.ability.name));

    return (
        <div style={{padding: 30}}>
            <Tabs defaultActiveKey="1" type="card">
                <TabPane tab="Basic Info" key="1">
                    <img alt={"pokemon"} src={sprites.front_default}/>
                    <Descriptions bordered column={1} style={{width: 500}}>
                        <Descriptions.Item label="Name">{name}</Descriptions.Item>
                        <Descriptions.Item label="Types">
                            {types.map(obj => (
                                <div key={obj.type.url}>
                                    <span>{obj.type.name}</span>
                                    <br/>
                                </div>
                            ))}
                        </Descriptions.Item>
                    </Descriptions>
                </TabPane>
                <TabPane tab="Abilities" key="2">
                    <div className="list-item">
                        <List
                            bordered
                            dataSource={dataAbilities}
                            renderItem={item => (
                                <List.Item>
                                    {item}
                                </List.Item>
                            )}
                        />
                    </div>
                </TabPane>
                <TabPane tab="Moves" key="3">
                    <div className="list-item">
                        <List
                            bordered
                            dataSource={moves}
                            renderItem={item => (
                                <List.Item key={item.id}>
                                    <Card title={item.name} style={{width: 300}}>
                                        <div>Target : {item.target.name}</div>
                                        <div>Type : {item.type.name}</div>
                                        <div>Accuracy : {null == item.accuracy ? "-" : item.accuracy}</div>
                                    </Card>
                                </List.Item>
                            )}
                        />
                    </div>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default PokemonDetail;