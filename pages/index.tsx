import React, { useState } from "react";
import Head from "next/head";


const Home = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  const handleNotificationPermission = () => {
    if (Notification.permission === "granted") {
      setNotificationEnabled(true);
      return;
    }

    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        setNotificationEnabled(true);
      }
    });
  };

  const handleSendNotification = () => {
    if (!("Notification" in window)) {
      alert("브라우저에서 알림을 지원하지 않습니다.");
      return;
    }

    if (!notificationEnabled) {
      alert("알림 허용 권한이 없습니다.");
      return;
    }

    new Notification("알림 예제", {
      body: "알림을 받았습니다!",
      icon: "icons/icon-192x192.png",
    });
  };

  return (
    <div>
      <Head>
        <title>알림 예제</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <main>
        <h1>알림 예제</h1>

        <button onClick={handleNotificationPermission}>알림 허용</button>
        <button onClick={handleSendNotification}>알림 보내기</button>
      </main>
    </div>
  );
};

export default Home;