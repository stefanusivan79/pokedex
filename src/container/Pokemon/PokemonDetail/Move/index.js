import React from 'react';
import { List } from 'antd';

const Move = (props) => {
  return (
    <List
      bordered
      dataSource={props.moves}
      renderItem={item => (
        <List.Item>
          {item.move.name}
        </List.Item>
      )}
    />
  )
}

export default Move;
