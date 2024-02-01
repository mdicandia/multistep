"use client";
import useSWR, { Fetcher } from "swr";
import { data } from "./components/CustomTabs.utils";
import styles from "./page.module.css";
import CustomTabs from "@/app/components/CustomTabs";

type Data = {
  id: number;
  name: string;
};

const fetcher = (...args: Parameters<typeof fetch>): Promise<Data> =>
  fetch(...args).then((res) => res.json());
export default function Home() {
  // fetch api/steps and pass it to CustomTabs
  const { data, error } = useSWR("/api/steps", fetcher);
  console.log({ data });
  return (
    <main className={styles.main}>
      <div>
        <CustomTabs data={data} />
      </div>
    </main>
  );
}
