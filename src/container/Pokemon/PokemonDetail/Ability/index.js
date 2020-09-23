import { List } from "antd";
import React from 'react';

const Ability = (props) => {
  return (
    <List
      bordered
      dataSource={props.abilities}
      renderItem={item => (
        <List.Item>
          {item.ability.name}
        </List.Item>
      )}
    />
  )
}

export default Ability;
