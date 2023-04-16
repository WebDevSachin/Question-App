import { addAnswers } from '@/redux/store';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function TextQuestions({ item: { title, id }, open }) {
  const answers = useSelector((state) => state.form.answers);
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const payLoad = { id, text };

  useEffect(() => {
    answers && dispatch(addAnswers(payLoad));
  }, [answers]);

  return (
    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <div className="col-span-full">
        <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
          {title}
        </label>
        <div className="mt-2">
          <textarea
            onChange={(e) => setText(e.target.value)}
            id="text"
            name="text"
            rows={3}
            value={text}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            // defaultValue={''}
          />
        </div>
      </div>
    </div>
  );
}
