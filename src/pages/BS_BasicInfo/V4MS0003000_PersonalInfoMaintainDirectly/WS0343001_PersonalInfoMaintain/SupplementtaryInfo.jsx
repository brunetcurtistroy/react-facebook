import React from 'react';

import { Input, Form, Row, Col, } from 'antd';
import * as wanakana from 'wanakana';

const styleInput = {
  backgroundColor: "#1C66B9",
  color: "white",
  cursor: "auto"
}

const SupplementtaryInfo = React.forwardRef((props, ref) => {
  let [data, setData] = React.useState([]);

  React.useEffect(() => {
    setData(props.personal.personal_supplements)
  }, [props]);

  return (
    <div className="supplementtary-info">
      <Form.List name={"personal_supplements"}
        children={(fields, operation, meta) => {
          if (!data?.length > 0) {
            let arrTemp = [];
            for (let index = 0; index < 20; index++) {
              arrTemp.push(index);
            }
            return arrTemp.map((index) => (
              <Row key={"personal_supplements" + index} >
                <Col span={6}>
                  <Form.Item name={[index, 'Expression_22']}>
                    <Input readOnly={true} style={styleInput} />
                  </Form.Item>
                </Col>
                <Col span={18}>
                  <Form.Item name={[index, 'personal_number_id']} hidden={true} >
                    <Input />
                  </Form.Item>
                  <Form.Item name={[index, 'id']} hidden={true} >
                    <Input />
                  </Form.Item>
                  <Form.Item name={[index, 'Content']} >
                    <Input readOnly={!props.personal.personal_number_id} />
                  </Form.Item>
                </Col>
              </Row>
            ))
          }
          return data.map((item, index) => (
            <Row key={"personal_supplements" + index} >
              <Col span={6}>
                <Form.Item name={[index, 'Expression_22']}>
                  <Input readOnly style={{ backgroundColor: "#1C66B9", color: "white", textAlign: 'center' }} />
                </Form.Item>
              </Col>
              <Col span={18}>
                <Form.Item name={[index, 'personal_number_id']} hidden={true} >
                  <Input />
                </Form.Item>
                <Form.Item name={[index, 'id']} hidden={true} >
                  <Input />
                </Form.Item>
                <Form.Item name={[index, 'Content']} >
                  <Input
                    maxLength={item?.condition_2 || 50}
                    // onChange={(e) =>
                    //   props.handleChangeValue(wanakana.toKatakana(e.target.value), 'Content', 'personal_supplements', item)
                    // } 
                    onBlur={(event)=>{
                      if(item.condition_1==="X")
                      props.handleChangeValue(wanakana.toRomaji(event.target.value), 'Content', 'personal_supplements', item)
                      if(item.condition_1==="J")
                      props.handleChangeValue(wanakana.toKatakana(event.target.value), 'Content', 'personal_supplements', item)
                      if(item.condition_1==="K")
                      props.handleChangeValue(wanakana.toHiragana(event.target.value), 'Content', 'personal_supplements', item)
                      }
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
          ))
        }}
      />
    </div>
  )
});

export default SupplementtaryInfo;
