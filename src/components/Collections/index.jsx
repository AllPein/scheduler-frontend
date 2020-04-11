import React, { useState } from 'react';
import './Collections.scss';
import {Collection} from '../index'
import {Button, Input, Row, Col  } from 'antd';
import { Link } from 'react-router-dom';
const { Search } = Input;

const Collections = ({collections}) => {
  const [searchValue, setSearchValue] = useState("");

  const filteredCollections = collections.filter((item) => item.title.toLowerCase().indexOf(searchValue.toLowerCase()) != -1);

  return (
    <div className='collections'>
        <div className="collections-head">
            <h1>Коллекции</h1>
            <Button shape="round" >Новая коллекция</Button>
        </div>
        <div className="collections-body">
            <div className="collections-body__top">
                <Search
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Поиск"
                style={{ width: 400 }} 
                />
            </div>

            <div className="collections-body__collections">
              <Row gutter={8} >
                {collections.map((collection, i) => (
                  <Col style={{marginTop: '30px'}} className="gutter-row" key={i} xs={24} sm={24} md={24} lg={24} xl={8}>
                    <Link to={`/collections/${collection.title}`}>
                      <Collection 
                      name={collection.title}
                      count={collection.count}
                      percentage={Math.ceil((collection.completed / collection.count) * 100)}
                      isFav={false}
                      />
                    </Link>
                    
                  </Col>
                ))}
                
              </Row>
              
            </div>
        </div>
    </div>
  )
}
 
export default Collections;
 