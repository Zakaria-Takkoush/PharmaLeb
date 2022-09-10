import React, { useEffect, useState } from "react";
import UsersTable from "../components/UsersTable";
import axiosAPI from "../api/axiosAPI";

const Users = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const res = await axiosAPI.get("/users");
            const users = await res.data;
            setUsers(users);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="users-table">
            <UsersTable users={users} />
        </div>
    );
};

export default Users;
