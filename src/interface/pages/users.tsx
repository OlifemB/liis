import React from 'react';
import {useAppDispatch, useAppSelector} from "@/libs/hooks";
import {fetchUsers, IUser} from "@/store/users";
import {Button} from "antd";
import Spinner from "@/interface/ui/spinner";


const Users = () => {
    const {users, isLoading, message} = useAppSelector(state => state.usersReducer);
    const dispatch = useAppDispatch();
    
    const renderUser = () => {
        return (
            <section className="users">
                {isLoading && <Spinner/>}
                {message && message}
                {users.length
                    ? users.map((user: IUser) => <div key={user.id}><b>{user.name}</b> <br/>{user.email}</div>)
                    : null}
            </section>
        );
    };
    
    return (
        <div>
            <Button onClick={() => dispatch(fetchUsers())}>get users</Button>
            {renderUser()}
        </div>
    );
};

export default Users;