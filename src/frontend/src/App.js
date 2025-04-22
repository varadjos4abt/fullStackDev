
import './App.css';
import {useState, useEffect} from "react";
import {getAllStundents} from "./client";
import "./App.css";
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme ,Table} from 'antd';

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];
const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'email',
        dataIndex: 'email',
        key: 'email',
    },
];
function App() {

    const [students, setStudents] = useState([]);
    const[collapsed, setCollapsed] = useState(false);
    const renderStudents = () => {
        if(students.length <= 0)
        {
        return " no data available"

        }
         return <Table dataSource={students} columns={columns} />;

    }
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const fetchStudent = () =>  getAllStundents()
        .then(res => res.json())
        .then(data => {
            setStudents(data)
        })
    useEffect ( () => {
        console.log("componenet is mounted");
        fetchStudent();
        },[]);

  //getAllStundents().then(res => res.json()).then(console.log)
   // getAllStundents()
     //   .then(res => res.text())
       // .then(text => {
         //   console.log("Raw response:", text);  // Log raw response
           // return JSON.parse(text);
            // Try parsing manually
        //}).then(console.log)

if(students.length <= 0)
{
    return "no data"

}

//return students.map((student, index) => {

//return <p key={index}>{student.id} {student.name} {student.email}</p>

//})

return  <Layout
    style={{
        minHeight: '100vh',
    }}
>
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
    </Sider>
    <Layout>
        <Header
            style={{
                padding: 0,
                background: colorBgContainer,
            }}
        />
        <Content
            style={{
                margin: '0 16px',
            }}
        >
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                {renderStudents()}
            </div>
        </Content>
        <Footer
            style={{
                textAlign: 'center',
            }}
        >
            VJ ©{new Date().getFullYear()} Created by VJ
        </Footer>
    </Layout>
</Layout>


    //return <p>{students.length}</p>
}

export default App;