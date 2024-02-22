/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../Toss_Logo_Secondary_Gray.png';
import { useNavigate } from 'react-router-dom';

interface MenuItem {
  id: number;
  code_name: string;
  title: string;
  order_number: number;
  parent_id: number | null;
  target: string | null;
  tenant_id: number;
}

const SidebarContainer = styled.div`
  background: #f4f7fa;
  min-width: 250px;
  max-width: 250px;
  height: 100vh;
  padding: 20px;
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  max-width: 40%;
  height: auto;
`;

const AdminText = styled.div`
  font-size: 16px;
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SidebarItem = styled.li`
  color: #333;
  text-align: left;
  padding-left:20px;
  font-size:14px;
`;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    axios.get('/api/sidebar-menu/')
      .then(response => {
        setMenuItems(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the menu items', error);
      });
  }, []);

  const handleMenuItemClick = (code_name: string) => {
    navigate(`/container/${code_name}`);
  };

  return (
      <SidebarContainer>
        <TopSection>
          <Logo src={logo} alt="Toss Logo" />
          <AdminText>product admin</AdminText>
        </TopSection>
        <SidebarList>
          {menuItems.map((item: MenuItem) => (
            <SidebarItem key={item.id} onClick={() => handleMenuItemClick(item.code_name)}>
              {item.title}
            </SidebarItem>
          ))}
        </SidebarList>
      </SidebarContainer>
    );
};

export default Sidebar;
