import React, { useState } from 'react';
import '../Collections/Collections.scss'; 
import { withRouter } from 'react-router-dom';
import { Task } from '../index';
import { LoadingOutlined } from '@ant-design/icons';
import { Modal, Button, Input, Row, Col, Icon, Form  } from 'antd';
import { GET_TASKS, ADD_TASK } from '../../utils/graphql';
import { useQuery, useMutation } from '@apollo/react-hooks';
const { Search } = Input;



const Tasks = props => {
    const [searchValue, setSearchValue] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");

    let collection = props.location.pathname.split('/collections/')[1];
    const {data, loading, error, refetch, networkStatus } = useQuery(GET_TASKS, 
        {
            variables: { collection: collection },
            notifyOnNetworkStatusChange: true
        });

    const [addTask] = useMutation(ADD_TASK);

    const addNewTask = (title, deadline, description) => {
        addTask({variables: { title, collection, description, deadline }});
        refetch();
        setIsVisible(false);

    }
    
    let filteredTasks = [];
    if (data) filteredTasks = data.getTasks.filter((item) => item.title.toLowerCase().indexOf(searchValue.toLowerCase()) != -1);


    return (
        <div className='collections'>
            <div className="collections-head">
                <h1>{collection}</h1>
                <Button shape="round" onClick={() => setIsVisible(true)}>Новое задание</Button>
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
                    {loading || networkStatus == 4 ? (
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

            <Modal
            title="Добавить задание" 
            visible={isVisible} 
            footer={null}
            onCancel={() => setIsVisible(false)}
            >
                <Form className="auth-form">
                    <Form.Item
                        hasFeedback
                    >
                        <Input
                        id="title"
                        onChange={({target: { value}}) => setTitle(value)}
                        prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
                        size="large"
                        placeholder="Название"
                    
                        />
                    </Form.Item>
                    <Form.Item
                        hasFeedback
                    >
                        <Input
                        id="description"
                        onChange={({target: { value}}) => setDescription(value)}
                        prefix={<Icon type="team" style={{ color: "rgba(0,0,0,.25)" }} />}
                        size="large"
                        placeholder="Описание"
                    
                        />
                    </Form.Item>
                    <Form.Item
                        hasFeedback
                    >
                        <Input
                        id="deadline"
                        onChange={({target: { value}}) => setDeadline(value)}
                        prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                        size="large"
                        placeholder="Дедлайн"
                    
                        />
                    </Form.Item>
                    
                    <Form.Item>
                        <Button
                        className='button'
                        size="large"
                        onClick={() => addNewTask(title, deadline,  description)}
                        >
                        Добавить
                        </Button>
                    </Form.Item>
                </Form>
                            
            </Modal>

        </div>
    )
}
 
export default withRouter(Tasks);
 