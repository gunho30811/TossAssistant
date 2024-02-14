import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface MenuItem {
  id: number;
  code_name: string;
  title: string;
  order_number: number;
  parent_id: number | null;
  target: string | null;
  tenant_id: number;
}

const Sidebar: React.FC = () => {
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

  return (
    <div className="sidebar">
      <ul>
        {menuItems.map((item: MenuItem) => (
          <li key={item.id}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
