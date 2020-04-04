import React from 'react';
import './Tasks.scss';
import {Button, Input } from 'antd';
const { Search } = Input;

const Tasks = props => {
  return (
    <div className='tasks'>
        <div className="tasks-head">
            <h1>Коллекции</h1>
            <Button shape="round" >Новая коллекция</Button>
        </div>
        <div className="tasks-body">
            <div className="tasks-body__top">
                <Search 
                placeholder="Поиск"
                style={{ width: 400 }} 
                />
            </div>
            
        </div>
    </div>
  )
}
 
export default Tasks;
 