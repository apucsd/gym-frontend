'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Layout, Menu, Button, Avatar, Dropdown, Badge, theme, Typography } from 'antd';
import type { MenuProps } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  FileTextOutlined,
  LogoutOutlined,
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [userRole, setUserRole] = useState<string>('');
  const router = useRouter();
  const pathname = usePathname();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const {user} = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if(user){
      setUserRole(user.role);
    }
  }, [user]);

  // Get menu items based on user role
  const getMenuItems = (): MenuItem[] => {

    const adminItems: MenuItem[] = [
      getItem('User Management', '/admin/user-mangement', <TeamOutlined />),
      getItem('Class Management', '/admin/class-management', <FileTextOutlined />),
      getItem('Trainer Management', '/admin/trainer-management', <FileTextOutlined />),
      getItem('Booking Management', '/admin/booking-management', <FileTextOutlined />),
    ];

    const trainerItems: MenuItem[] = [
      getItem('My Classes', '/trainer/my-classes', <FileTextOutlined />),
      getItem('Booking Management', '/trainer/booking-management', <FileTextOutlined />),
    ];

    const traineeItems: MenuItem[] = [
      getItem('My Bookings', '/trainee/my-bookings', <FileTextOutlined />),
    ];

    switch (userRole) {
      case 'ADMIN':
      case 'SUPER_ADMIN':
        return adminItems;
      case 'TRAINER':
        return trainerItems;
      case 'TRAINEE':
        return traineeItems;
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Profile',
      icon: <UserOutlined />,
    },
    {
      key: '2',
      label: 'Settings',
      icon: <UserOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: '3',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: () => {
        // Handle logout
        router.push('/login');
      },
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 10,
        }}
      >
        <div className="flex items-center justify-center h-16 bg-blue-600">
          <h1 className="text-white text-xl font-bold">
            {collapsed ? 'GMS' : userRole.charAt(0) + userRole.slice(1).toLowerCase()}
          </h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[pathname]}
          selectedKeys={[pathname]}
          items={menuItems}
          onClick={({ key }) => router.push(key)}
          style={{ paddingTop: '16px' }}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 250, transition: 'all 0.2s' }}>
        <Header
          style={{
            padding: '0 24px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
            position: 'sticky',
            top: 0,
            zIndex: 9,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className="flex items-center gap-4">
            <Badge count={5} size="small">
              <Button type="text" icon={<BellOutlined style={{ fontSize: '18px' }} />} />
            </Badge>
            <Dropdown menu={{ items }} placement="bottomRight">
              <div className="flex items-center gap-2 cursor-pointer px-3 py-1 hover:bg-gray-100 rounded-lg">
                <Avatar
                  style={{ backgroundColor: '#1890ff' }}
                  icon={<UserOutlined />}
                />
                {!collapsed && (
                  <div className="flex flex-col">
                    <Text strong>John Doe</Text>
                    <Text type="secondary" className="text-xs">
                      {userRole.charAt(0) + userRole.slice(1).toLowerCase()}
                    </Text>
                  </div>
                )}
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 'calc(100vh - 112px)',
            background: colorBgContainer,
            borderRadius: 8,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;