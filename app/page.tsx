"use client";
import useSWR from "swr";
import styles from "./page.module.css";
import CustomTabs from "@/app/components/CustomTabs/CustomTabs";
import { Button, Flex } from "@chakra-ui/react";
import { nextStep } from "./components/CustomTabs/CustomTabs.utils";

type State = "ready" | "completed";

type Data = {
  type: string;
  state: State;
};

export type Steps = Data[];

const fetcher = (...args: Parameters<typeof fetch>): Promise<Steps> =>
  fetch(...args).then((res) => res.json());
export default function Home() {
  const { data: steps } = useSWR<Steps, any>("/api/steps", fetcher);
  return (
    <main className={styles.main}>
      <Flex direction="column">
        <CustomTabs steps={steps} />
        <Button
          size="md"
          sx={{ margin: "10px 0px" }}
          onClick={() => nextStep({ type: "reset" })}
        >
          Reset Steps
        </Button>
      </Flex>
    </main>
  );
}
