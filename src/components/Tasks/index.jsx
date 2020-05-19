import React, { useState } from 'react';
import '../Collections/Collections.scss'; 
import './Tasks.scss'; 
import { withRouter } from 'react-router-dom';
import { Task, TasksTable } from '../index';
import { LoadingOutlined } from '@ant-design/icons';
import { Modal, Button, Input, DatePicker, TimePicker, Form  } from 'antd';
import { GET_TASKS, ADD_TASK, UPDATE_TASK } from '../../utils/graphql';
import { useQuery, useMutation } from '@apollo/react-hooks';
import moment from 'moment';

const format = 'HH:mm';
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

    const [updateTask] = useMutation(UPDATE_TASK, {
        refetchQueries: ["getTasks"]
    });  
    const updTask = (title, id, isFavourite, done) => {
        updateTask({variables: { title, id, favorite: isFavourite, done }});
    }
    const [addTask] = useMutation(ADD_TASK, {
        refetchQueries: ["getTasks"]
    });
    const addNewTask = (title, deadline, description) => {
        addTask({variables: { title, collection, description, deadline }});
        setIsVisible(false);
    }
    
    const onDateChange = (date) => {
        if (date != null) setDeadline(date._d);
    }

    let filteredTasks = [];
    if (data) filteredTasks = data.getTasks.filter((item) => item.title.toLowerCase().indexOf(searchValue.toLowerCase()) != -1).map((a, i) => Object.assign({key: i}, a));

    return (
        <div className='collections'>
            <div className="collections-head">
                <div className="collections-head__title">
                    <Button shape="round" onClick={() => {props.history.push("/")} }>Назад</Button>
                    <h1>{collection}</h1>
                </div>
                
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
                    { loading && networkStatus !== 4 ? (
                        <LoadingOutlined style={{ fontSize: 40 }} spin />
                    ) : (
                        <TasksTable updTask={updTask.bind(this)} data={filteredTasks} />
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
                        size="large"
                        placeholder="Описание"
                    
                        />
                    </Form.Item>
                    <Form.Item
                        hasFeedback
                    >
                        <DatePicker 
                        onChange={onDateChange} 
                        showTime={true} 
                        placeholder='Выберите дату окончания' 
                        style={{ width: '100%' }} 
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
 