import { Descriptions } from 'antd';
import React from 'react';

const BasicInfo = (props) => {
  return (
    <>
      <img alt={"pokemon"} src={props.sprites.front_default} />
      <Descriptions column={1}>
        <Descriptions.Item label="name">{props.name}</Descriptions.Item>
        <Descriptions.Item label="base experience">{props.base_experience}</Descriptions.Item>
        <Descriptions.Item label="height">{props.height}</Descriptions.Item>
        <Descriptions.Item label="weight">{props.weight}</Descriptions.Item>
      </Descriptions>
    </>
  )
}

export default BasicInfo;
