"use client";
import * as React from "react";
import check from "@/assets/check.svg";
import menu from "@/assets/kebabMenu.svg";
import {
  useTab,
  Box,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Divider,
  Button,
  IconButton,
} from "@chakra-ui/react";
import Image from "next/image";
import styles from "./tab.module.css";
import { Form } from "./Form";
import { Invoice } from "./Invoice";

function CustomTab(props: any) {
  const tabProps = useTab(props);
  const isCompleted = !!tabProps["aria-selected"];

  return (
    <Box
      as="button"
      sx={{ display: "flex", padding: 5, width: "150px" }}
      {...tabProps}
    >
      <Box as="span" mr="2">
        {!isCompleted ? (
          <div className={styles.circle} />
        ) : (
          <Image alt="Check Icon" width={30} height={30} src={check} />
        )}
      </Box>
      {tabProps.children}
      {props.hasDivider && (
        <Divider sx={{ marginLeft: "35px" }} orientation="vertical" />
      )}
    </Box>
  );
}

function CustomTabs(props: any) {
  const [tabIndex, setTabIndex] = React.useState(0);

  const MAX_TAB_INDEX = 2;

  const handleTabsChange = () => {
    if (tabIndex !== MAX_TAB_INDEX) {
      setTabIndex(tabIndex + 1);
    }
  };
  return (
    <>
      <div className={styles.header}>
        <div>Process move-in</div>
        <IconButton
          aria-label="Menu"
          size="sm"
          icon={<Image alt="Menu" width={10} height={10} src={menu} />}
        />
      </div>
      <Tabs index={tabIndex}>
        <TabList
          sx={{
            borderColor: "dark-blue",
            borderStyle: "solid",
            borderWidth: "1px",
            width: "100%",
          }}
        >
          <CustomTab hasDivider>One</CustomTab>
          <CustomTab hasDivider>Two</CustomTab>
          <CustomTab hasDivider={false}>Three</CustomTab>
        </TabList>
        <TabPanels
          sx={{
            borderColor: "dark-blue",
            borderStyle: "solid",
            borderWidth: "1px",
          }}
        >
          <TabPanel>
            <Form />
          </TabPanel>
          <TabPanel>
            <Invoice />
          </TabPanel>
          <TabPanel>3</TabPanel>
          <Button
            sx={{ width: "75%" }}
            colorScheme="blue"
            onClick={handleTabsChange}
          >
            Next
          </Button>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default CustomTabs;
