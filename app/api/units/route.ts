const units = [
  {
    id: 1,
    label: "5 x 5 (25 sq. ft.)",
  },
  {
    id: 2,
    label: "5 x 10 (50 sq. ft.)",
  },
  {
    id: 3,
    label: "10 x 10 (100 sq. ft.)",
  },
  {
    id: 4,
    label: "10 x 15 (150 sq. ft.)",
  },
];

export async function GET(request: Request) {
  return new Response(JSON.stringify(units));
}
