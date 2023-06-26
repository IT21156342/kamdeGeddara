import React from 'react';
import Header from "./../components/admin/common/header/Header.jsx";
import Sidebar from "./../components/admin/common/sidebar/Sidebar.jsx";

function AdminLayout(props) {
    return (
        <div>
            <div className={props.class}>
                <Header/>
                <Sidebar/>
                {props.children}
            </div>
        </div>
    );
}

export default AdminLayout;