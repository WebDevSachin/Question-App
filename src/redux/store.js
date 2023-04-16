import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

// create a slice
export const questionSlice = createSlice({
  name: 'questions',
  initialState: [],
  reducers: {
    addQuestions: (state, action) => {
      state.push(action.payload);
    },
    addAnswers: (state, action) => {
      var index = state.findIndex((p) => p.id == action.payload.id);
      state[index].answers = action.payload.text;
    },
  },
});

export const { addQuestions, addAnswers } = questionSlice.actions;

export const answersSlice = createSlice({
  name: 'answers',
  initialState: [],
  reducers: {
    addAnswerss: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addAnswerss } = answersSlice.actions;

export const formSlice = createSlice({
  name: 'form',
  initialState: { question: false, askedQuestion: false, answers: false, submitted: false, questionType: { name: 'TextArea' } },
  reducers: {
    handleQuestionType: (state, action) => {
      state.questionType = action.payload;
    },
    handleFormSubmit: (state, action) => {
      state.submitted = action.payload;
    },
    questionModal: (state, action) => {
      state.question = action.payload;
      if (!action.payload) {
        state.askedQuestion = true;
      }
    },
    askedQuestionModal: (state, action) => {
      state.askedQuestion = action.payload;
    },
    answerModal: (state, action) => {
      state.answers = action.payload;
    },
  },
});

export const { questionModal, askedQuestionModal, answerModal, handleFormSubmit, handleQuestionType } = formSlice.actions;

const persistConfig = {
  key: 'root',
  storage,
};

export const rootReducer = combineReducers({
  questions: questionSlice.reducer,
  answers: answersSlice.reducer,
  form: formSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

// export the action
export const persistor = persistStore(store);
