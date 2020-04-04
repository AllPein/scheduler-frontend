import React, {useState } from 'react'
import { Menu } from 'antd';
import {withRouter } from 'react-router-dom';
import {
  FolderOutlined,
  MailOutlined,
  AreaChartOutlined,
  FileOutlined,
  SettingFilled
} from '@ant-design/icons';

const Navbar = props => {
    const menuItemStyle = {
        textAlign: "center", 
        height: '75px',
        marginTop: '10px'
    }
    const menuItemIcon = {
        fontSize: '25px', 
        paddingTop: '25px'
    }

    const path = window.location.pathname.split('/')[1];
    const [activeItem, setActiveItem] = useState(path);

    const handleClick = ({key}) => {
        setActiveItem(key);
        props.history.push(`/${key}`);

    }
    return (
        <Menu
          mode="inline"
          selectedKeys={[activeItem]}
          theme="light"
          onSelect={handleClick}
          style={{ width: 150, height: '100vh' }}
        >
          <div className='home-menu__top-logo'>

          </div>
          <Menu.Item key="schedule"  style={menuItemStyle}  >
            <FolderOutlined style={menuItemIcon}  />
          </Menu.Item>
          <Menu.Item key="deadlines" style={menuItemStyle}>
            <AreaChartOutlined style={menuItemIcon} />
          </Menu.Item>
          <Menu.Item key="mail" style={menuItemStyle}>
            <MailOutlined style={menuItemIcon} />
          </Menu.Item>
          <Menu.Item key="folders" style={menuItemStyle}>
            <FileOutlined style={menuItemIcon} />
          </Menu.Item>

          <Menu.Divider style={{ marginTop: '250px' }} />
          <Menu.Item key="settings" style={{ marginTop: '70px', textAlign: "center", height: '75px' }}>
            <SettingFilled style={menuItemIcon} />
          </Menu.Item>
        </Menu>
  )
}
 
export default withRouter(Navbar);
 