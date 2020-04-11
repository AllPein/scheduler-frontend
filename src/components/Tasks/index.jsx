import React, { useState } from 'react';
import '../Collections/Collections.scss'; 
import { withRouter } from 'react-router-dom';
import { Task } from '../index';
import { LoadingOutlined } from '@ant-design/icons';
import {Button, Input, Row, Col  } from 'antd';
import {GET_TASKS} from '../../utils/graphql';
import {useQuery} from '@apollo/react-hooks';
const { Search } = Input;


const Tasks = props => {
    let collection = props.location.pathname.split('/collections/')[1];
    const {data, loading, error} = useQuery(GET_TASKS, 
        {variables: {collection: collection}});

    const [searchValue, setSearchValue] = useState("");
    let filteredTasks;
    if (data)
    filteredTasks = data.getTasks.filter((item) => item.title.toLowerCase().indexOf(searchValue.toLowerCase()) != -1);
    return (
        <div className='collections'>
            <div className="collections-head">
                <h1>{collection}</h1>
                <Button shape="round" >Новое задание</Button>
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
                    {loading ? (
                        <LoadingOutlined style={{ fontSize: 40 }} spin />
                    ) : (
                        <Row gutter={8} >
                            {filteredTasks.map((task, i) => (
                            <Col style={{marginTop: '30px'}} className="gutter-row" key={i} xs={24} sm={24} md={24} lg={24} xl={8}>
                                <Task 
                                title={task.title}
                                done={task.done}
                                deadline={task.deadline}
                                collection={collection}
                                />
                                
                            </Col>
                            ))}
                        </Row>
                    )}
                </div>
            </div>
        </div>
    )
}
 
export default withRouter(Tasks);
 