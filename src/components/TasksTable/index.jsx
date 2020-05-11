import React from 'react'
import { Table, Checkbox } from 'antd';
import { StarFilled, StarOutlined} from '@ant-design/icons';
import './TasksTable.scss';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');


const TasksTable = ({ data, updTask }) => {
    const columns = [
        { title: 'Избранное', dataIndex: 'favorite', key: 'favorite', sorter: (a) => { if (!a.favorite) { return -1; } if (a.favorite) { return 1; } return 0; }, render: (favorite, task) => (<div>{!favorite ? (<StarOutlined onClick={(e) => { e.stopPropagation(); updTask(task.title, task.id, !favorite, task.done)}} />)
         : (<StarFilled style={{ color: "#FFE600" }} onClick={(e) => { e.stopPropagation();  updTask(task.title, task.id, !task.favorite, task.done)}} />)} </div>)},
        { title: 'Задание', dataIndex: 'title', key: 'title' },
        { title: 'Срок выполнения', dataIndex: 'deadline', key: 'deadline', render: (deadline) => (<h3>{moment(+new Date(deadline)).fromNow()}</h3>),  sorter: (a, b) => +a.deadline - +b.deadline },
        { title: 'Выполнено', dataIndex: 'done', key: 'done', render: (done, task) => ( <Checkbox checked={done}  onChange={(e) => { updTask(task.title, task.id, task.favorite, !done)}} />), sorter: (a) => { if (!a.done) { return -1; } if (a.done) { return 1;}return 0;} },
      ];
      
  return (
    <Table
    columns={columns}
    dataSource={data}
    expandRowByClick={true}
    expandable={{ expandedRowRender: record => <p style={{ margin: 0, wordBreak: 'break-all' }}>{record.description}</p>}}
    pagination={false}
    />
  )
}
 
export default TasksTable;
 