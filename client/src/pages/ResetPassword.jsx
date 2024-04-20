import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { server } from '../components/utils/serverUrl';
import axios from 'axios'

const ResetPassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const handleChangePassword = async () => {
        try {
            if (!token) {
                console.error('Token is missing');
                return;
            }
    
            const response = await axios.post(`${server}/api/user/resetpassword/${token}`, {
                newPassword: newPassword,
            });
    
            if (response.status === 200) {
                // Password changed successfully, redirect to login or any other page
                navigate('/');
            } else {
                console.error('Error:', response.data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    

    return (
        <div>
            <h2>Reset Password</h2>
            <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
            />
            <button onClick={handleChangePassword}>Change Password</button>
        </div>
    );
};

export default ResetPassword;
