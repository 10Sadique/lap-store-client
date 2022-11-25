import React from 'react';

const ProductModal = ({ product, user }) => {
    const {
        name,
        category,
        condition,
        desc,
        image,
        location,
        price,
        originalPrice,
        phone,
        purchaseYear,
        sellerName,
        postedAt,
    } = product;
    return (
        <>
            <input
                type="checkbox"
                id="product-modal"
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box">
                    <form></form>
                    <div className="modal-action">
                        <label htmlFor="product-modal" className="btn">
                            close
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductModal;
