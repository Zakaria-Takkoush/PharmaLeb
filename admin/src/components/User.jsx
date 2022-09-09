import React from "react";

const User = ({ user }) => {
    // destructure user object
    const {
        _id,
        first_name,
        last_name,
        email,
        date_of_birth,
        user_type,
        phone_number,
    } = user;

    return (
        <tr>
            <td>{_id}</td>
            <td>{first_name}</td>
            <td>{last_name}</td>
            <td>{email}</td>
            <td>{phone_number}</td>
            <td>{date_of_birth.split("T")[0]}</td>
            <td>{user_type.toUpperCase()}</td>
        </tr>
    );
};

export default User;
