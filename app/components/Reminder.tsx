"use client";

import Image from "next/image";
import * as React from "react";
import clock from "@/assets/clock.svg";
import styles from "./tab.module.css";

export const Reminder = ({ name, text }: { name: string; text: string }) => {
  return (
    <div className={styles.reminder}>
      <Image alt="Clock" width={30} height={30} src={clock} />
      <p className={styles.name}>{name}</p>
      <p>{text}</p>
    </div>
  );
};
