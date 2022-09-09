import React from "react";
import User from "./User";

const UsersTable = ({ users }) => {
    return (
        <table>
            <tbody>
                <tr>
                    <th>User ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Date of Birth</th>
                    <th>User Type</th>
                </tr>
                {users.map((user) => (
                    <User key={user._id} user={user} />
                ))}
            </tbody>
        </table>
    );
};

export default UsersTable;
