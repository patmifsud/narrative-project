import React from 'react'

import firebase from 'firebase/app';
import 'firebase/firestore';

import 'firebase/auth';
import {userAuthState} from 'react-firebase-hooks/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAiCtqO51t7aHNQnuyjDCpkmE5ZQzBGXnY",
  authDomain: "narrative-project-ga.firebaseapp.com",
  projectId: "narrative-project-ga",
  storageBucket: "narrative-project-ga.appspot.com",
  messagingSenderId: "65713869023",
  appId: "1:65713869023:web:bb8260cfe93a2f5a48996a",
  measurementId: "G-K7F0H8GX21"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const db = firebase.firestore();