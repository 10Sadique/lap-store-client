import React from 'react';

const SellerRow = ({ user, idx, setDeletingSeller, handleVarify }) => {
    return (
        <tr className="w-full">
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
                {user.isVerified ? (
                    <span className="font-semibold text-success">Verified</span>
                ) : (
                    <span className="font-semibold text-error">
                        Not Verified
                    </span>
                )}
            </td>
            <td className="py-2 lg:py-3 text-sm lg:text-[16px] text-center flex lg:items-center justify-center gap-3 lg:flex-row flex-col">
                <button
                    onClick={() => handleVarify(user._id)}
                    disabled={user.isVerified}
                    className="text-xs normal-case btn btn-sm"
                >
                    Verify Seller
                </button>
                <label
                    htmlFor="confirmation-modal"
                    onClick={() => setDeletingSeller(user)}
                    className="text-xs normal-case btn btn-sm btn-primary"
                >
                    Delete User
                </label>
            </td>
        </tr>
    );
};

export default SellerRow;
