import { addAnswers } from '@/redux/store';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function CheckBoxQuestions({ item: { title, options, id } }) {
  const answers = useSelector((state) => state.form.answers);
  const dispatch = useDispatch();
  const [text, setText] = useState([]);

  const payLoad = { id, text };

  useEffect(() => {
    answers && dispatch(addAnswers(payLoad));
  }, [answers]);


  return (
    <div>
      <div className="mt-10 space-y-10">
        <fieldset>
          <legend className="text-sm font-semibold leading-6 text-gray-900">{title}</legend>
          <div className="mt-6 space-y-6">
            {options?.map((item,index) => {
              return (
                <div key={index} className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      onChange={(e) => {
                        setText([...text, e.target.name]);
                      }}
                      name={item}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="comments" className="font-medium text-gray-900">
                      {item}
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </fieldset>
      </div>
    </div>
  );
}
