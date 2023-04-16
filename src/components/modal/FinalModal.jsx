import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { answerModal, questionModal } from '@/redux/store';
import { useRouter } from 'next/router';

export default function FinalModal() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.questions);
  const open = useSelector((state) => state.form.answers);
  const router = useRouter();

  function closeModal() {
    dispatch(answerModal(false));
  }

  useEffect(() => {
    dispatch(answerModal(true));
  }, []);

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
                  <div className="border-b border-gray-900/10 pb-12 flex gap-6 flex-col">
                    {data?.map((item, index) => {
                      return (
                        <div key={index} className="border-b pb-3">
                          <h4 className="strong">{item.title}</h4>
                          {item.type == 'TextArea' ? (
                            <p>{item?.answers}</p>
                          ) : (
                            item?.answers?.map((title) => {
                              return <p key={title}>{title}</p>;
                            })
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <button type="button" onClick={() => (dispatch(answerModal(false)), dispatch(questionModal(true)), router.push('/form/builder'))} className="my-2  underline">
                    Back to Forms Builder
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
