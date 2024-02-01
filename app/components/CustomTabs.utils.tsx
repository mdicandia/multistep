import previewContract from "@/assets/previewContract.svg";
import contract from "@/assets/contract.svg";
import creditCard from "@/assets/creditCard.svg";
import { Reminder } from "./Reminder";
import { Invoice } from "./Invoice";
import { Form } from "./Form";
import { mutate } from "swr";

export const nextStep = async ({ type }: { type: string }) => {
  const response = await fetch("/api/steps", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type }),
  });
  const data = await response.json();

  mutate("/api/steps", data, false);
};

const STEPS = {
  CONFIRM_BOOKING: "step1",
  REVIEW_ORDER: "step2",
  COMPLETE_MOVE_IN: "step3",
};

type ButtonType = "submit" | "button";
export type Config = {
  id: number;
  title: string;
  content: any;
  buttonText: string;
  buttonType: ButtonType;
  buttonColor: string;
  footer: { id: string; text: string; icon: string; modal: string }[] | null;
  onNextStep: () => void;
};
export type StepsConfig = {
  [key: string]: Config;
};

export const stepsConfig: StepsConfig = {
  [STEPS.CONFIRM_BOOKING]: {
    id: 0,
    title: "Confirm booking",
    content: <Form />,
    buttonText: "Continue",
    buttonType: "submit",
    buttonColor: "blue",
    footer: [
      {
        id: "invoice",
        text: "Preview invoice",
        icon: previewContract,
        modal: "",
      },
      { id: "contract", text: "View Contract", icon: contract, modal: "" },
    ],
    onNextStep: () => {
      console.log("next step"), nextStep({ type: STEPS.CONFIRM_BOOKING });
    },
  },
  [STEPS.REVIEW_ORDER]: {
    id: 1,
    title: "Review order",
    content: <Invoice />,
    buttonColor: "orange",
    buttonText: "Continue",
    buttonType: "button",
    footer: [
      { id: "contract", text: "View Contract", icon: contract, modal: "" },
      { id: "customer", text: "Charge customer", icon: creditCard, modal: "" },
    ],
    onNextStep: () => {
      console.log("next step"), nextStep({ type: STEPS.REVIEW_ORDER });
    },
  },
  [STEPS.COMPLETE_MOVE_IN]: {
    id: 2,
    title: "Complete move-in",
    content: <Reminder />,
    buttonColor: "blue",
    buttonText: "Complete move-in",
    buttonType: "button",
    footer: null,
    onNextStep: () => {
      console.log("next step"), nextStep({ type: STEPS.COMPLETE_MOVE_IN });
    },
  },
};
