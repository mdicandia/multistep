"use client";
import * as React from "react";
import styles from "./tab.module.css";
import { Button, ButtonGroup } from "@chakra-ui/react";
import Image from "next/image";

export const Footer = ({ footerData }: { footerData: any }) => {
  return (
    <footer className={styles.footer}>
      <ButtonGroup variant="link" spacing="2">
        {footerData.map((item: any) => {
          return (
            <Button
              key={item.id}
              leftIcon={
                <Image width="12" height="12" src={item.icon} alt={item.text} />
              }
              colorScheme="blue"
              size="xs"
            >
              {item.text}
            </Button>
          );
        })}
      </ButtonGroup>
    </footer>
  );
};
