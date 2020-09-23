import React from 'react';
import { Descriptions } from "antd";

const BasicStatus = (props) => {
  return (
    <Descriptions
      bordered
      column={1}>
      {
        props.stats.map(x => (
          <Descriptions.Item label={x.stat.name}>{x.base_stat}</Descriptions.Item>
        ))
      }
    </Descriptions>
  );
}

export default BasicStatus;
