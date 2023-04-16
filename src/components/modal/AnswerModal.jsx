import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import TextQuestions from '../form/questions/TextQuestions';
import CheckBoxQuestions from '../form/questions/CheckBoxQuestions';
import { useDispatch, useSelector } from 'react-redux';
import { answerModal, askedQuestionModal, questionModal } from '@/redux/store';

export default function QuestionAnswerModal({ title, body, saveText }) {
  const open = useSelector((state) => state.form.askedQuestion);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.questions);

  function closeModal() {
    dispatch(answerModal(true));
    setTimeout(() => {
      dispatch(askedQuestionModal(false));
    }, 500);
  }

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {title ? title : 'Payment successful'}
                  </Dialog.Title>

                  <div className="border-b border-gray-900/10 pb-12 flex gap-6 flex-col">
                    {data?.map((item, index) => {
                      return <div key={index}>{item.type == 'TextArea' ? <TextQuestions item={item} open={open} /> : <CheckBoxQuestions item={item} open={open} />}</div>;
                    })}
                  </div>

                  <button type="button" onClick={() => (dispatch(askedQuestionModal(false)), dispatch(questionModal(true)))} className="my-2  underline">
                    Add New Question
                  </button>

                  <div className="mt-4 ml-auto w-max">
                    <button
                      type="submit"
                      className="inline-flex justify-center border border-transparent rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Review My Answers
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
