"use client";
import useSWR from "swr";
import styles from "./page.module.css";
import CustomTabs from "@/app/components/CustomTabs";
import { Button } from "@chakra-ui/react";
import { nextStep } from "./components/CustomTabs.utils";

type State = "ready" | "completed";

type Data = {
  type: string;
  state: State;
};

export type Steps = Data[];

const fetcher = (...args: Parameters<typeof fetch>): Promise<Steps> =>
  fetch(...args).then((res) => res.json());
export default function Home() {
  // fetch api/steps and pass it to CustomTabs
  const { data: steps, error } = useSWR<Steps, any>("/api/steps", fetcher);
  return (
    <main className={styles.main}>
      <div>
        <CustomTabs steps={steps} />
      </div>
      <Button
        size="md"
        sx={{ margin: "10px 0px" }}
        onClick={() => nextStep({ type: "reset" })}
      >
        Reset Steps
      </Button>
    </main>
  );
}
