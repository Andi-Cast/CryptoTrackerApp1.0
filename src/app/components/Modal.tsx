import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-gray-950 bg-opacity-70 flex justify-center items-center rounded-xl shadow-xl shadow-gray-200" onClick={onClose}>
            <div className="bg-gray-950 p-5 rounded-lg relative" onClick={e => e.stopPropagation()}>
                <FontAwesomeIcon className="absolute top-2 right-2 text-xl text-white p-4 hover:text-red-600" icon={faX} onClick={onClose}/>
                {children}
            </div>
        </div>
    );
};

export default Modal;