"use client";
import * as React from "react";
import check from "@/assets/check.svg";
import arrow from "@/assets/arrow.svg";
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
  Flex,
} from "@chakra-ui/react";
import Image from "next/image";
import styles from "./tab.module.css";
import { Steps } from "../page";
import { Config, stepsConfig } from "./CustomTabs.utils";
import { Footer } from "./Footer";
import { FormProvider, useForm } from "react-hook-form";

type Fields = {
  unitType: string;
  unit: string;
  moveInDate: string;
  deposit: string;
  rent: string;
  prepayment: string;
  promocode: string;
  products: string;
};

function CustomTab({
  isCompleted,
  hasDivider,
  children,
  isSelected,
}: {
  isCompleted: boolean;
  hasDivider: boolean;
  children: React.ReactNode;
  isSelected: boolean;
}) {
  const tabProps = useTab({ children });

  return (
    <Box
      as="button"
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 5,
        color: isSelected ? "#007bff" : "black",
        pointerEvents: "none",
      }}
      {...tabProps}
    >
      <Flex as="span" sx={{ minWidth: "30px" }} mr="2">
        {!isCompleted ? (
          <div className={styles.circle} />
        ) : (
          <Image alt="Check Icon" width={30} height={30} src={check} />
        )}
      </Flex>
      {tabProps.children}
      {hasDivider && (
        <Divider sx={{ marginLeft: "35px" }} orientation="vertical" />
      )}
    </Box>
  );
}

function CustomTabs({ steps }: { steps: Steps | undefined }) {
  const [tabConfig, setTabConfig] = React.useState<Config | null>(null);

  const MAX_TAB_INDEX = steps?.length;
  const methods = useForm<Fields, any>();

  React.useEffect(() => {
    if (steps) {
      const step = steps?.find((step) => step.state === "ready");
      const currentStep = stepsConfig[step?.type!] || null;
      setTabConfig(currentStep);
    }
  }, [steps]);

  return (
    <>
      <div className={styles.header}>
        <div>Process move-in</div>
        <IconButton
          aria-label="Menu"
          size="sm"
          sx={{ backgroundColor: "white", border: "solid #6e7f80" }}
          icon={<Image alt="Menu" width={10} height={10} src={menu} />}
        />
      </div>
      <Tabs>
        <TabList
          sx={{
            border: "1px solid #6e7f80",
            width: "100%",
          }}
        >
          {steps?.map((step, index) => (
            <CustomTab
              key={step.type}
              hasDivider={index !== MAX_TAB_INDEX! - 1}
              isCompleted={step.state === "completed"}
              isSelected={stepsConfig[step.type].id === tabConfig?.id}
            >
              {stepsConfig[step.type].title}
            </CustomTab>
          ))}
        </TabList>
        <TabPanels
          sx={{
            border: "1px solid #6e7f80",
          }}
        >
          <TabPanel>
            {tabConfig && (
              <FormProvider {...methods}>
                <div>{tabConfig.content}</div>
                <div>
                  {tabConfig.footer && (
                    <Footer footerData={tabConfig.footer!} />
                  )}
                </div>
                <Button
                  sx={{ width: "75%" }}
                  colorScheme={tabConfig.buttonColor}
                  onClick={tabConfig.onNextStep}
                  type={tabConfig.buttonType}
                  rightIcon={
                    <Image
                      alt="Continue"
                      className={styles.arrow}
                      width={20}
                      height={20}
                      src={arrow}
                    />
                  }
                >
                  {tabConfig.buttonText}
                </Button>
              </FormProvider>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default CustomTabs;
