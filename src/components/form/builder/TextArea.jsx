import { addQuestions, questionModal } from '@/redux/store';
import React, { useState, useEffect, useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function TextArea() {
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const id = useId();

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!inputValue.trim()) {
      setErrorMessage('Please enter a question.');
    } else {
      dispatch(addQuestions({ id, type: 'TextArea', title: inputValue, answers: null }));
      dispatch(questionModal(false));
      setErrorMessage('');
    }
  };

  return (
    <div>
      <div className="space-y-12">
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
              Type question here
            </label>

            <div className="mt-2">
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <input
                required={true}
                type="text"
                name="textArea-input"
                id="textArea-input"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="border-t border-gray-900/10 pt-5">
          <div className="ml-auto w-max">
            <button
              type="submit"
              className="inline-flex justify-center border border-transparent rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ml-auto w-max"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
