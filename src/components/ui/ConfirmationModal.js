const ConfirmationModal = ({
    title,
    message,
    product,
    closeModal,
    handleDelete,
}) => {
    return (
        <div>
            <input
                type="checkbox"
                id="confirmation-modal"
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <label
                            htmlFor="confirmation-modal"
                            className="btn btn-primary"
                            onClick={() => handleDelete(product._id)}
                        >
                            Delete
                        </label>
                        <label
                            onClick={closeModal}
                            htmlFor="confirmation-modal"
                            className="btn"
                        >
                            Cancel
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
