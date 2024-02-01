import previewContract from "@/assets/previewContract.svg";
import contract from "@/assets/contract.svg";
import creditCard from "@/assets/creditCard.svg";
import { Reminder } from "./Reminder";
import { Invoice } from "./Invoice";
import { Form } from "./Form";

export const data = [
  {
    id: 1,
    title: "Confirm booking",
    content: null,
    fetchContent: () =>
      Promise.resolve({ name: "Form", text: "This is a form" }),
    confirmButtonText: "Continue",
    footer: [
      {
        id: "invoice",
        text: "Preview invoice",
        icon: previewContract,
        modal: "",
      },
      { id: "contract", text: "View Contract", icon: contract, modal: "" },
    ],
    onNextStep: () => console.log("next step"),
  },
  {
    id: 2,
    title: "Review order",
    content: Invoice,
    fetchContent: () =>
      Promise.resolve({ name: "Invoice", text: "This is an invoice" }),
    confirmButtonText: "Continue",
    footer: [
      { id: "contract", text: "View Contract", icon: contract, modal: "" },
      { id: "customer", text: "Charge customer", icon: creditCard, modal: "" },
    ],
    onNextStep: () => console.log("next step"),
  },
  {
    id: 3,
    title: "Complete move-in",
    content: Reminder,
    fetchContent: () =>
      Promise.resolve({ name: "Reminder", text: "This is a reminder" }),
    confirmButtonText: "Complete move-in",
    footer: null,
    onNextStep: () => console.log("next step"),
  },
];
