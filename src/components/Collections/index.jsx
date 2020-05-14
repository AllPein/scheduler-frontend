import React, { useState } from 'react';
import './Collections.scss';
import {Collection} from '../index'
import { Button, Input, Row, Col, Popover, Form } from 'antd';
import { FireFilled } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';
import { ADD_COLLECTION, GET_COLLECTIONS, UPDATE_COLLECTION, REMOVE_COLLECTION } from '../../utils/graphql';
import { useMutation, useQuery } from '@apollo/react-hooks';

const { Search } = Input;

const Collections = props => {
  const {data, loading, error, refetch, networkStatus } = useQuery(GET_COLLECTIONS, 
    {
        notifyOnNetworkStatusChange: true
    });

  const [searchValue, setSearchValue] = useState("");
  const [collectionName, setCollectionName] = useState("");

  const [addCollection] = useMutation(ADD_COLLECTION, {
    update(_, data){
      refetch()
      .then(() => {
        props.history.push(`/collections/${collectionName}`);
      })
    }
  });
  const [removeCollection] = useMutation(REMOVE_COLLECTION, {
    update(_, data){
      refetch()
    }
  });
  const [updateCollection] = useMutation(UPDATE_COLLECTION, {
    update(_, data){
      refetch();
    }
  });  
  const updCollection = (title, id, favorite) => {
    updateCollection({variables: { title, id, favorite }});
  }
  const rmvCollection = (id) => {
    removeCollection({variables:  { id }});
  }

  const text = <span>Добавить коллекцию</span>;
  const content = (
    <Form className="auth-form">
      <Form.Item
          hasFeedback
      >
          <Input
          id="title"
          onChange={({target: { value}}) => setCollectionName(value)}
          prefix={<FireFilled style={{ color: "rgba(0,0,0,.25)" }} />}
          size="large"
          placeholder="Название"
      
          />
      </Form.Item>
      <Form.Item
          hasFeedback
      >
          <Button
          onClick={() => addCollection({variables: { title: collectionName }})}
          className='button'
          size="large"
          >
          Добавить
          </Button>
      </Form.Item>
      </Form>
  );

  let filteredCollections = [];
  if (data) filteredCollections = data.getCollections.filter((item) => item.title.toLowerCase().indexOf(searchValue.toLowerCase()) != -1);
  

  return (
    <div className='collections'>
        <div className="collections-head">
            <h1>Коллекции</h1>
            <Popover placement="bottomLeft" title={text} content={content} trigger="click">
              <Button shape="round" >Новая коллекция</Button>
            </Popover>
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
                {filteredCollections.map((collection, i) => (
                  <Col style={{marginTop: '30px'}} className="gutter-row" key={i} xs={24} sm={24} md={24} lg={24} xl={8}>
                    <Link to={`/collections/${collection.title}`}>
                      <Collection 
                      updCollection={updCollection.bind(this)}
                      rmvCollection={rmvCollection.bind(this)}
                      name={collection.title}
                      id={collection.id}
                      count={collection.count}
                      percentage={Math.ceil((collection.completed / collection.count) * 100)}
                      favorite={collection.favorite}
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
 
export default withRouter(Collections);
 