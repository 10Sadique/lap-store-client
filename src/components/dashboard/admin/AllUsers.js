import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loader from './../../ui/Loader';
import UserRow from './UserRow';
import ConfirmationModal from '../../ui/ConfirmationModal';
import { toast } from 'react-hot-toast';

const AllUsers = () => {
    const [deletingUser, setDeletingUser] = useState(null);
    const {
        data: users,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axios(
                'https://lap-store-server.vercel.app/users?role=user'
            );

            return res.data;
        },
    });

    const handleDelete = (id) => {
        fetch(`https://lap-store-server.vercel.app/users/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount > 0) {
                    console.log(data);
                    toast.success('User successfully deleted!');
                    refetch();
                }
            });
    };

    const closeModal = () => {
        setDeletingUser(null);
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="mx-2 my-8 lg:m-8">
            <h1 className="mb-5 text-2xl text-center lg:text-left">
                All Users
            </h1>
            {users.length ? (
                <div className="overflow-hidden shadow-md rounded-xl">
                    <table className="w-full table-auto lg:table-auto">
                        <thead className="bg-secondary/20">
                            <tr className="overflow-x-scroll divide-x-[1px]">
                                <th className="py-2 px-5">Sl.</th>
                                <th className="py-2 lg:px-5">Name</th>
                                <th className="py-2 lg:px-5">Email</th>
                                <th className="py-2 lg:px-5">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-[1px] bg-secondary/10">
                            {users.map((user, idx) => (
                                <UserRow
                                    key={user._id}
                                    idx={idx}
                                    user={user}
                                    setDeletingUser={setDeletingUser}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center">No users found.</p>
            )}
            {deletingUser && (
                <ConfirmationModal
                    title={`Are you sure you want to delete user?`}
                    message={`If you remove ${deletingUser.name}, it cannot be undone!!`}
                    handleDelete={handleDelete}
                    closeModal={closeModal}
                    product={deletingUser}
                />
            )}
        </div>
    );
};

export default AllUsers;
