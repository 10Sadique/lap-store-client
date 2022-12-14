import React from 'react';

const UserRow = ({ user, idx, setDeletingUser }) => {
    return (
        <tr className="w-full divide-x-[1px]">
            <td className="py-2 lg:py-3 text-sm lg:text-[16px] text-center">
                {idx + 1}
            </td>
            <td className="py-2 lg:py-3 text-sm lg:text-[16px] text-center">
                {user.name}
            </td>
            <td className="py-2 lg:py-3 text-sm lg:text-[16px] text-center">
                {user.email}
            </td>
            <td className="py-2 lg:py-3 text-sm lg:text-[16px] text-center">
                <label
                    htmlFor="confirmation-modal"
                    onClick={() => setDeletingUser(user)}
                    className="text-xs normal-case btn lg:btn-sm btn-primary"
                >
                    Delete
                </label>
            </td>
        </tr>
    );
};

export default UserRow;
