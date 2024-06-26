import { eventBusService } from "../services/event-bus.service.js";
import { useState, useEffect, useRef } from "react";

export function UserMsg() {
  const [msg, setMsg] = useState(null);
  const timeoutIdRef = useRef();

  useEffect(() => {
    const unsubscribe = eventBusService.on("show-user-msg", (msg) => {
      setMsg(msg);
      if (timeoutIdRef.current) {
        timeoutIdRef.current = null;
        clearTimeout(timeoutIdRef.current);
      }
      timeoutIdRef.current = setTimeout(closeMsg, 3000);
    });
    return unsubscribe;
  }, []);

  function closeMsg() {
    setMsg(null);
  }

  if (!msg) return <span></span>;
  return (
    <section className={`user-msg ${msg.type}`}>
      {/* <button onClick={closeMsg}> */}
      <span onClick={closeMsg} className="material-symbols-outlined">
        close
      </span>
      {/* </button> */}
      {msg.txt}
    </section>
  );
}
