import { addQuestions, questionModal } from '@/redux/store';
import React, { useId, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function LoopComponent(props) {
  const num = props.num;
  const elements = [];
  for (let i = 0; i < num; i++) {
    elements.push(
      <div key={i} className="mt-2">
        <input
          required={true}
          type="text"
          name={`option-${i}`}
          id={`option-${i}`}
          autoComplete="given-name"
          placeholder="Add Answer Option"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    );
  }
  return <>{elements}</>;
}

export default function CheckBoxes() {
  const saved = useSelector((state) => state.form.submitted);
  const [title, setTitle] = useState('');
  const [option, setOption] = useState(1);
  const id = useId();
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const questionData = useSelector((state) => state.questions);

  const handleSubmit = () => {
    const options = [];

    for (let i = 0; i < option; i++) {
      const optionValue = formRef.current.elements[`option-${i}`].value;
      if (optionValue !== '') {
        options.push(optionValue);
      }
    }

    let error = false;

    options.forEach((item) => {
      if (item == '') {
        error = true;
      }
    });

    if (title === '' || options.size === 0 || options.length == 0 || error) {
      alert('Please fill in all fields.');
      return;
    }
    const payload = (questionData) => {
      const existingQuestion = questionData.find((question) => question.type === 'Checkbox' && question.title === title);
      if (existingQuestion) {
        return questionData.map((question) => {
          if (question.type === 'Checkbox' && question.title === title) {
            return {
              ...question,
              options: [...question.options, ...options],
            };
          }
          return question;
        });
      }
      return {
        id,
        type: 'Checkbox',
        title: title,
        options: options,
        answers: null,
      };
    };
    dispatch(addQuestions(payload(questionData)));
    dispatch(questionModal(false));
  };

  return (
    <div>
      <div className="mt-10 space-y-10">
        <fieldset>
          <legend className="text-sm font-semibold leading-6 text-gray-900">Type question here</legend>
          <form ref={formRef}>
            <input
              type="text"
              name="checkbox-title"
              id="checkbox-title"
              autoComplete="checkbox-title"
              placeholder="Checkbox list"
              className="block w-full my-3 mb-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={title}
              required={true}
              onChange={(e) => setTitle(e.target.value)}
            />
            <LoopComponent num={option} />

            <button type="button" onClick={() => setOption(option + 1)} className="my-2 text-blue-600">
              + Add Another Answer
            </button>
          </form>
        </fieldset>

        <div className="border-t border-gray-900/10 pt-5">
          <div className="ml-auto w-max">
            <button
              onClick={handleSubmit}
              type="submit"
              className="inline-flex justify-center border border-transparent rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ml-auto w-max"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
