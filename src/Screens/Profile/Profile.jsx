import React from 'react'

const Profile = () => {
    function logout() {
        localStorage.removeItem('currentuser');
        window.location.href = '/';
    }
    return (
        <><div>Profile</div>
            <button onClick={logout}>Log Out</button></>

    )
}

export default Profile