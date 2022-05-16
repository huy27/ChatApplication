const ConnectedUsers = ({ users }) => {
    return (
        <div className='user-list'>
            <h4>Users in room</h4>
            {users.map((u, idx) => (
                <div key={idx}>
                    <h6 key={idx}>{u}</h6>
                </div>
            ))}
        </div>
    )
}

export default ConnectedUsers;
