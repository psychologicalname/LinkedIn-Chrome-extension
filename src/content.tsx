import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import React, { useEffect, useState } from "react"
import aiIcon from "data-base64:../assets/aiIcon.png"
import Modal from "~features/Modal"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"],
  world: "MAIN"
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

// Function to get inline anchor element for message input field
export const getInlineAnchor: PlasmoGetInlineAnchor = async () =>
  document.querySelector('.msg-form__contenteditable');

const PlasmoOverlay = () => {

  const [isFocused, setIsFocused] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  // Effect to add event listeners for focus and blur events
  useEffect(() => {
    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    // Add event listeners when component mounts
    const contentEditable = document.querySelector('.msg-form__contenteditable[contenteditable="true"]');
    contentEditable?.addEventListener("focus", handleFocus);
    contentEditable?.addEventListener("blur", handleBlur);

    // Clean up event listeners when component unmount
    return () => {
      contentEditable?.removeEventListener("focus", handleFocus);
      contentEditable?.removeEventListener("blur", handleBlur);
    };
  }, []);


  return (
    <div className="">
      {/* Icon for opening the modal */}
      <div className="absolute right-20 bottom-2 z-50" onClick={() => setModalOpened(!modalOpened)}>
        <img src={aiIcon} alt="text Generator Icon" width="32" height="32" className={isFocused ? 'cursor-pointer' : 'opacity-0'} />
      </div>

      {/* Render the modal if modalOpened state is true */}
      {modalOpened ?
        <Modal
          close={() => setModalOpened(false)}
        />
        : null}
    </div>
  )
}

export default PlasmoOverlay
