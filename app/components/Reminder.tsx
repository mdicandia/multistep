"use client";

import Image from "next/image";
import * as React from "react";
import clock from "@/assets/clock.svg";
import styles from "./tab.module.css";
import { Flex } from "@chakra-ui/react";

const name = "John Doe";
const text = "moves in on date 28th November (in 12 days time)";

export const Reminder = () => {
  return (
    <Flex className={styles.reminder} align="center">
      <Image alt="Clock" width={30} height={30} src={clock} />
      <p className={styles.name}>{name}</p>
      <p>{text}</p>
    </Flex>
  );
};
