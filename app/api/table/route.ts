const data = [
  {
    date: "2023-10-25",
    description: "Deposit",
    tax: "",
    price: "200",
    subtotal: "200",
  },
  {
    date: "2023-10-25",
    description: "Rent",
    tax: "5",
    price: "100",
    subtotal: "105",
  },
  {
    date: "2023-10-25",
    description: "Admin fee",
    tax: "",
    price: "10",
    subtotal: "10",
  },
  {
    date: "2021-01-04",
    description: "Cleaning fee",
    tax: "5",
    price: "5.9",
    subtotal: "10.90",
  },
];

export async function GET(request: Request) {
  return new Response(JSON.stringify(data));
}
