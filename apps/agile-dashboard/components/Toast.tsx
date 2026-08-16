"use client";
import { useEffect, useState } from "react";
import styles from "./Toast.module.css";

let toastFn: ((msg: string) => void) | null = null;
export const showToast = (msg: string) => toastFn?.(msg);

export default function Toast() {
  const [msg, setMsg] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    toastFn = (m: string) => {
      setMsg(m); setVisible(true);
      setTimeout(() => setVisible(false), 2800);
    };
    return () => { toastFn = null; };
  }, []);

  return (
    <div className={`${styles.toast} ${visible ? styles.show : ""}`} aria-live="polite">
      {msg}
    </div>
  );
}
