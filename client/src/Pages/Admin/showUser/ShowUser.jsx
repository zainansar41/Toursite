import React, { useEffect, useState } from 'react';
import { fetchUsers, changeRole } from '../../../Hooks/customHook';
import { useNavigate } from 'react-router-dom';
import './styles.css';

export default function ShowUser() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [selectedRoles, setSelectedRoles] = useState({});
    const [initialRoles, setInitialRoles] = useState({});

    useEffect(() => {
        fetchUsers().then((result) => {
            const usersData = result.users;
            setUsers(usersData);
            const initialRolesData = {};
            for (const user of usersData) {
                initialRolesData[user._id] = user.role || ''; // Set the initial role value if available, or an empty string otherwise
            }
            setInitialRoles(initialRolesData);
            setSelectedRoles(initialRolesData);
        });
    }, []);

    // Function to handle role selection change
    const handleRoleChange = (userId, event) => {
        const selectedRole = event.target.value;
        setSelectedRoles((prevRoles) => ({
            ...prevRoles,
            [userId]: selectedRole,
        }));
    };

    // Function to check if the selected role is different from the initial role
    const isRoleChanged = (userId) => {
        return selectedRoles[userId] !== initialRoles[userId];
    };

    const changeRoleBTN = async (id) => {
        const role = selectedRoles[id];
        changeRole(id, role).then((result) => {
            alert("role changed");
            navigate('/admin/user');
        });
    };

    return (
        <div className="users">
            <h1>Users</h1>
            <div className="usersContainer">
                {users.map((user, index) => (
                    <div className="user-card" key={index}>
                        <h3>first name: {user.firstName}</h3>
                        <h3>last name: {user.lastName}</h3>
                        <h3>{user.email}</h3>
                        <p style={{ color: 'red' }}>current role: {user.role}</p>

                        {/* Add the role selection dropdown */}
                        <select
                            value={selectedRoles[user._id] || ''}
                            onChange={(e) => handleRoleChange(user._id, e)} // Use user._id here
                        >
                            <option value="">Select Role</option>
                            <option value="HM">HM</option>
                            <option value="admin">Admin</option>
                            <option value="visitor">Visitor</option>
                        </select>

                        <button
                            className='changeRoleBTN'
                            disabled={!isRoleChanged(user._id)}
                            onClick={() => { changeRoleBTN(user._id); }} // Use user._id here
                        >
                            change Role
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
