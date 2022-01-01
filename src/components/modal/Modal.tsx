import React, { ReactElement, useEffect, useRef } from "react";

interface Props {
  children: ReactElement;
  show: boolean;
  onClose: () => void;
}

const useOutside = (ref: any, onClose: Props["onClose"]) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target)) {
        console.log("click outside");
        onClose();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, ref]);
};

const Modal = ({ children, show, onClose }: Props) => {
  const ref = useRef(null);
  useOutside(ref, onClose);
  if (!show) return null;
  return (
    <div
      className="fixed top-0 left-0 
                    h-screen w-screen
                    flex justify-center items-center"
      style={{ background: "rgba(0,0,0,0.8)" }}
      ref={ref}
    >
      <div className="">{children}</div>
    </div>
  );
};

export default Modal;
