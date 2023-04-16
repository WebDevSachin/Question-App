import React, { useEffect } from 'react';
import QuestionModal from '@/components/modal/QuestionModal';
import MainForm from '@/components/form/MainForm';
import QuestionAnswerModal from '@/components/modal/AnswerModal';
import { useDispatch, useSelector } from 'react-redux';
import { questionModal } from '@/redux/store';
import FinalModal from '@/components/modal/FinalModal';
import { useRouter } from 'next/router';

export default function index() {
  const open = useSelector((state) => state.form.question);
  const askedQuestion = useSelector((state) => state.form.askedQuestion);
  const answerModal = useSelector((state) => state.form.answers);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
   answerModal && router.push('/form/answers')
  }, [answerModal]);

  return (
    <div className="flex align-middle justify-center h-screen">
      {!open && askedQuestion ? (
        <QuestionAnswerModal title={'Answer the question'} body={<p>Hey</p>} saveText={'Submit'} />
      ) : (
        <QuestionModal title={'Add a New Questions'} open={open} body={<MainForm />} saveText={'Submit'} />
      )}

      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={() => {
            dispatch(questionModal(true));
          }}
          className="rounded-full  bg-opacity-90 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 bg-blue-600"
        >
          Add Question
        </button>
      </div>
    </div>
  );
}
