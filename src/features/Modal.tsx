import React, { useRef, useState } from 'react';
import generate from "data-base64:../../assets/generate.png"
import insert from "data-base64:../../assets/insert.png"
import regenerate from "data-base64:../../assets/regenerate.png"

// Interface for Modal props
interface ModalProps {
    close: () => void;      // Function to close the modal
}

const Modal: React.FC<ModalProps> = ({ close }) => {
    const ref = useRef(null);
    const [prompt, setPrompt] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [response, setResponse] = useState<string>('');

    // Function to handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsGenerating(true);
        setPrompt('');
    }

    // Function to handle response generation
    const handleGenerate = () => {
        setPrompt(ref.current.value || '');     // Set prompt text from input field
        ref.current.value = '';                 // Clear input field after generating

        const dummyResponse = `Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.`;

        setIsGenerating(false);
        setResponse(dummyResponse);
    }

    // Function to handle response insertion into message input field
    const handleInsert = () => {
        const msgBox = document.querySelector('.msg-form__contenteditable > p') as HTMLTextAreaElement;
        msgBox.textContent = response;      // Set response as content of message input field

        const placeholder = document.querySelector('.msg-form__placeholder')
        placeholder?.classList.remove('msg-form__placeholder');     // Remove placeholder class

        close();        // Close the modal
    }

    return (
        <div className="fixed bg-black w-full h-screen top-0 right-0 left-0 bg-opacity-50" onClick={close}>
            <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen max-h-full p-8">
                <div className="p-6 w-full max-w-4xl max-h-full bg-gray-50 rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()}>

                    {/* Display prompt and response if available */}
                    {response ?
                        <div className='flex flex-col gap-6'>
                            <div className='bg-gray-100 max-w-lg w-full text-gray-500 self-end px-6 py-2 rounded-xl'>
                                <p>{prompt}</p>
                            </div>
                            <div className='bg-[#DBEAFE] max-w-2xl w-full text-gray-500 px-6 py-2 rounded-xl'>
                                <p>{response}</p>
                            </div>
                        </div>
                        : null}

                    {/* Form for user input */}
                    <form className="mt-6" onSubmit={handleSubmit}>
                        <input
                            type='text'
                            className='rounded-lg border border-gray-300 w-full px-6 py-2 mb-6 text-gray-800'
                            placeholder='Your Prompt'
                            ref={ref}
                            required
                        />

                        {/* Buttons for generating and inserting response */}
                        {response ?
                            <div className='flex gap-6 float-right'>

                                {/* Button to insert response into message input field */}
                                <button
                                    className='border border-gray-500 text-gray-600 float-right flex justify-between items-center px-6 py-2 gap-3 rounded-lg'
                                    type='button'
                                    onClick={handleInsert}
                                >
                                    <img src={insert} width='10' height='12' alt='insert' />
                                    <p>Insert</p>
                                </button>

                                {/* Button to regenerate response */}
                                <button
                                    className='bg-blue-500 text-white float-right flex justify-between items-center px-6 py-2 gap-3 rounded-lg'
                                    type='submit'
                                    disabled={isGenerating}
                                    onClick={handleGenerate}
                                >
                                    <img src={regenerate} width='14' height='14' alt='regenerate' />
                                    <p>Regenerate</p>
                                </button>
                            </div>
                            :
                            <button
                                className='bg-blue-500 text-white float-right flex justify-between items-center px-6 py-2 gap-3 rounded-lg'
                                type='submit'
                                disabled={isGenerating}
                                onClick={handleGenerate}
                            >
                                <img src={generate} width='14' height='14' alt='generate' />
                                <p>Generate</p>
                            </button>
                        }
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Modal;
