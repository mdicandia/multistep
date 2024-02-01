"use client";
import * as React from "react";
import styles from "./tab.module.css";
import { Button, ButtonGroup } from "@chakra-ui/react";

export const Footer = ({ footerData }: { footerData: any }) => {
  return (
    <footer className={styles.footer}>
      <ButtonGroup variant="link" spacing="2">
        {footerData.map((item: any) => {
          return (
            <Button key={item.id} leftIcon={item.icon} colorScheme="blue">
              {item.label}
            </Button>
          );
        })}
      </ButtonGroup>
    </footer>
  );
};
