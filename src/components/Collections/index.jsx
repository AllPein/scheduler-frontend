import React from 'react';
import './Collections.scss';
import {Collection} from '../index'
import {Button, Input, Row, Col  } from 'antd';
const { Search } = Input;

const Collections = props => {
  const collections = [
    {
      name: 'Матеша',
      count: 15,
      percentage: 75,
      isFav: false
    },
    {
      name: 'Руссиш',
      count: 15,
      percentage: 50,
      isFav: true
    },
    {
      name: 'Englando',
      count: 15,
      percentage: 25,
      isFav: false
    },
    {
      name: 'Матеша',
      count: 15,
      percentage: 75,
      isFav: false
    },
    {
      name: 'Руссиш',
      count: 15,
      percentage: 50,
      isFav: true
    },
    {
      name: 'Englando',
      count: 15,
      percentage: 25,
      isFav: false
    },
    {
      name: 'Матеша',
      count: 15,
      percentage: 75,
      isFav: false
    },
    {
      name: 'Руссиш',
      count: 15,
      percentage: 50,
      isFav: true
    },
    {
      name: 'Englando',
      count: 15,
      percentage: 25,
      isFav: false
    },
    {
      name: 'Матеша',
      count: 15,
      percentage: 75,
      isFav: false
    },
    {
      name: 'Руссиш',
      count: 15,
      percentage: 50,
      isFav: true
    },
    {
      name: 'Englando',
      count: 15,
      percentage: 25,
      isFav: false
    },
    {
      name: 'Матеша',
      count: 15,
      percentage: 75,
      isFav: false
    },
    {
      name: 'Руссиш',
      count: 15,
      percentage: 50,
      isFav: true
    },
    {
      name: 'Englando',
      count: 15,
      percentage: 25,
      isFav: false
    },
    {
      name: 'Матеша',
      count: 15,
      percentage: 75,
      isFav: false
    },
    {
      name: 'Руссиш',
      count: 15,
      percentage: 50,
      isFav: true
    },
    {
      name: 'Englando',
      count: 15,
      percentage: 25,
      isFav: false
    }
  ]

  return (
    <div className='collections'>
        <div className="collections-head">
            <h1>Коллекции</h1>
            <Button shape="round" >Новая коллекция</Button>
        </div>
        <div className="collections-body">
            <div className="collections-body__top">
                <Search 
                placeholder="Поиск"
                style={{ width: 400 }} 
                />
            </div>

            <div className="collections-body__collections">
              <Row gutter={8} >
                {collections.map((collection, i) => (
                  <Col style={{marginTop: '30px'}} className="gutter-row" key={i} xs={24} sm={24} md={24} lg={24} xl={8}>
                    <Collection 
                    name={collection.name}
                    count={collection.count}
                    percentage={collection.percentage}
                    isFav={collection.isFav}
                    />
                  </Col>
                ))}
                
              </Row>
              
            </div>
        </div>
    </div>
  )
}
 
export default Collections;
 