const Modal = ({ open, onClose, children }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-black"
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
