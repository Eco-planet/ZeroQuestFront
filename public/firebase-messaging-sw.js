importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBnULIhMOeoGSDa66fD-g8-_nbCxqtCZmY",
  authDomain: "hello-notification-13973.firebaseapp.com",
  projectId: "hello-notification-13973",
  storageBucket: "hello-notification-13973.appspot.com",
  messagingSenderId: "176466236713",
  appId: "1:176466236713:web:a955f2caa78f5b8fc65338",
  measurementId: "G-N4H39NYW0B",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // icon: "/icon.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
