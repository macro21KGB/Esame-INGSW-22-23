import { AppEvents } from './utils/constants';
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAbpOvUV45ivCeSdqk8jqgVS7LkWTO9dKo",
  authDomain: "ratatouille-app-2023.firebaseapp.com",
  projectId: "ratatouille-app-2023",
  storageBucket: "ratatouille-app-2023.appspot.com",
  messagingSenderId: "952281961279",
  appId: "1:952281961279:web:47b008684ef7876ce3f98a",
  measurementId: "G-X8TQZV1G38"
};

type AppEventsType = typeof AppEvents[keyof typeof AppEvents];

const logEventToFirebase = (eventType: AppEventsType, payload?: any) => {
  logEvent(analytics, eventType.toString(), payload);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {
  analytics,
  logEventToFirebase
}
