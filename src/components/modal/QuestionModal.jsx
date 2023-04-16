import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import TextArea from '../form/builder/TextArea';
import CheckBoxes from '../form/builder/CheckBoxes';
import { useDispatch, useSelector } from 'react-redux';
import { handleFormSubmit, questionModal } from '@/redux/store';

export default function QuestionModal({ title, body, saveText, open }) {
  const questionType = useSelector((state) => state.form.questionType);
  const saved = useSelector((state) => state.form.submitted);
  const dispatch = useDispatch();

  function closeModal() {
    dispatch(questionModal(!open));
    dispatch(handleFormSubmit(!saved));
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
                  <div className="mt-2">
                    <div className="text-sm text-gray-500  relative h-32">
                      {body ? body : 'Your payment has been successfully submitted. We’ve sent you an email with all of the details of your order.'}
                    </div>
                  </div>
                  {questionType?.name == 'TextArea' ? <TextArea /> : <CheckBoxes />}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
