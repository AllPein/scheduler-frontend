import React from 'react';
import './Collection.scss';
import {EllipsisOutlined, StarFilled, StarOutlined} from '@ant-design/icons';
import { Progress } from 'antd';
import classNames from 'classnames';

const Collection = ({name, count, percentage, isFav}) => {
  return (
    <div className="collection">
      <div className="collection-top">
        <EllipsisOutlined onClick={() => {}} />
      </div>
      <div className="collection-body">
        <div className="collection-body__progress">
          <Progress 
          className={classNames({
            'progress-text__color-red': percentage < 50,
            'progress-text__color-yellow': percentage >= 50 && percentage < 75,
            'progress-text__color-green': percentage >= 75,
          })}
          width={90} 
          strokeWidth={15} 
          strokeColor={percentage < 50 ? '#EF5350' : percentage >= 50 && percentage < 75 ? '#FBC02D' : '#4CAF50'} 
          type="circle" 
          percent={percentage} 
          />
        </div>
        <div className="collection-body__info">
          <h1>{name}</h1>
          <h3>{count} заданий</h3>
        </div>

      </div>
      <div className="collection-bottom">
        {!isFav ? (
          <StarOutlined />
        ) : (
          <StarFilled style={{ color: "#FFE600" }} onClick={() => {}} />
        )}
        
      </div>
    </div>
  )
}
 
export default Collection;
 