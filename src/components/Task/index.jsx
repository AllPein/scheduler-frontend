import React from 'react'
import {EllipsisOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

const Task = ({title, done, deadline, collection}) => {
  return (
    <div className="collection">
      <div className="collection-top">
        <EllipsisOutlined onClick={() => {}} />
      </div>
      <div className="collection-body">
        <div className="collection-body__info">
          <h1>{title}</h1>
          <p style={{opacity: 0.6}}>{moment(new Date(+deadline)).toNow()}</p>
        </div>

      </div>
      <div className="collection-bottom">
        {!true ? (
          <StarOutlined />
        ) : (
          <StarFilled style={{ color: "#FFE600" }} onClick={() => {}} />
        )}
        
      </div>
    </div>
  )
}
 
export default Task;
 