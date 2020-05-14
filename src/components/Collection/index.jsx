import React, {useState} from 'react';
import './Collection.scss';
import {EllipsisOutlined, StarFilled, StarOutlined, CloseOutlined } from '@ant-design/icons';
import { Progress, Popover, Button, Input } from 'antd';
import classNames from 'classnames';


const Collection = ({ name, count, percentage, favorite, id, updCollection, rmvCollection }) => {
  const [isEditing, setIsEditing] = useState(false);
  const text = <span>Выберите действие</span>;
  const content = (
    <div>
      <Button onClick={(e) => { e.preventDefault(); setIsEditing(true); }}>Изменить название</Button><br/>
      <Button 
      style={{ marginTop: '15px' }} 
      onClick={(e) => { e.preventDefault(); rmvCollection(id); }} 
      danger
      >
        Удалить коллекцию
      </Button>
    </div>
  );
  const resetTitle = (e) => {
    e.preventDefault();
    updCollection(e.target.value, id, favorite);
    setIsEditing(false);
  }

  return (
    <div className="collection">
      <div className="collection-top">
      <Popover placement="right" title={text} content={content} trigger="click">
        <EllipsisOutlined  />
      </Popover>
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
          {!isEditing ? (
            <h1>{name}</h1>
          ) : (
            <Input 
            placeholder='Введите новое название' 
            onClick={(e) => {e.preventDefault()}} 
            onPressEnter={resetTitle} 
            addonAfter={<CloseOutlined onClick={(e) => { e.preventDefault(); setIsEditing(false); }} />}
            />
          )}
          <h3>{count} заданий</h3>
        </div>

      </div>
      <div className="collection-bottom">
        {!favorite ? (
          <StarOutlined onClick={(e) => {e.preventDefault(); updCollection(name, id, !favorite)}} />
        ) : (
          <StarFilled style={{ color: "#FFE600" }} onClick={(e) => {e.preventDefault(); updCollection(name, id, !favorite)}}  />
        )}
        
      </div>
    </div>
  )
}
 
export default Collection;
 