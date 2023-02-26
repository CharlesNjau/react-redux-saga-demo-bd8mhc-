import { call, put, takeEvery,delay, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { types } from '../actions';

const ROOT_URL = '//reduxblog.herokuapp.com/api';
const API_KEY = '?key=cseckler1234';

  // Return the mock data
  let mockData = [
    {
      "title": "The Evolution of Programming Languages",
      "categories": "Computer Science",
      "content": "From Fortran to Rust, languages change with the times."
    },
    {
      "title": "How Machine Learning is Changing Healthcare",
      "categories": "Technology, Healthcare",
      "content": "ML algorithms can analyze medical images for faster diagnoses."
    },
    {
      "title": "What is Blockchain and How Does It Work?",
      "categories": "Technology, Cryptography",
      "content": "A decentralized ledger system for secure and transparent transactions."
    },
    {
      "title": "The Future of Quantum Computing",
      "categories": "Technology, Physics",
      "content": "Quantum processors could revolutionize computing power and speed."
    },
    {
      "title": "The Ethics of Artificial Intelligence",
      "categories": "Technology, Philosophy",
      "content": "Should AI be designed to prioritize human values over efficiency?"
    },
    {
      "title": "How Web Development Has Changed Over Time",
      "categories": "Technology, Web Development",
      "content": "From HTML to React, the web has come a long way."
    },
    {
      "title": "Cybersecurity Threats and Best Practices",
      "categories": "Technology, Cybersecurity",
      "content": "Protect your data and devices from hackers and malware."
    },
    {
      "title": "The Benefits and Risks of Cloud Computing",
      "categories": "Technology, Cloud Computing",
      "content": "Scalable storage and processing, but at the risk of data breaches."
    },
    {
      "title": "The Impact of Social Media on Society",
      "categories": "Technology, Social Media",
      "content": "From fake news to online harassment, social media has both positive and negative effects."
    },
    {
      "title": "The Rise of DevOps and Continuous Delivery",
      "categories": "Technology, DevOps",
      "content": "Faster and more efficient software development and deployment."
    }
  ]

// Watcher sagas
// Listen for an action and run the appropriate Worker saga
export function* watchFetchPost() {
  yield takeEvery(types.FETCH_POST, workFetchPost);
}

export function* watchFetchPosts() {
  console.log(`watchFetchPosts`);
  yield takeEvery(types.FETCH_POSTS, workFetchPosts);
}

export function* watchCreatePost() {
  console.log(`watchCreatePost`);
  yield takeEvery(types.CREATE_POST, workCreatePost);
}

export function* watchDeletePost() {
  yield takeEvery(types.DELETE_POST, workDeletePost);
}

// Worker sagas
// Respond to the actions that are caught by the watcher sagas
export function* workFetchPosts() {
  try {
    // Simulate a delay of 1000ms
    //yield delay(1000);

  
    

    // Dispatch the action to the reducers with the mock data
    yield put({
      type: types.FETCH_POSTS_SUCCESS,
      payload: mockData,
    });
  } catch (error) {
    // Act on the error
    console.log('Request failed! Could not fetch posts.');
  }
}

export function* workFetchPost({ id }) {
  try {
    console.log(`>>>>>> workFetchPost with id = ${id}`)
    // Try to call the API
    //const uri = `${ROOT_URL}/posts/${id}${API_KEY}`;
    const response = mockData[id]// call(axios.get, uri);

    console.log(`>>>>>Vpost peftched ${JSON.stringify(response,null,0)}`)

    // Dispatch the action to the reducers
    yield put({
      type: types.FETCH_POST_SUCCESS,
      payload: response,
    });
  } catch (error) {
    // Act on the error
    console.log('Request failed! Could not fetch post.');
  }
}

export function* workCreatePost({ values, callback }) {
  try {

    console.log(`>>>>>>>>> workCreatePost with values ${JSON.stringify(values,null,2)}. \n Call back type ${callback}`)
    // Try to call the API
    const uri = `${ROOT_URL}/posts${API_KEY}`;
    const response = mockData.push(values)//yield call(axios.post, uri, values);

    callback();

    // Dispatch the action to the reducers
    yield put({
      type: types.CREATE_POST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    // Act on the error
    console.log('Request failed! Could not create post.');
  }
}

export function* workDeletePost({ id, callback }) {
  try {
    // Try to call the API
    const uri = `${ROOT_URL}/posts/${id}${API_KEY}`;
    const response = yield call(axios.delete, uri);

    callback();

    // Dispatch the action to the reducers
    yield put({
      type: types.DELETE_POST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    // Act on the error
    console.log('Request failed! Could not delete post.');
  }
}
