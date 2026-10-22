export type AvailableTutor = {
  name: string;
  className: string;
};

export function getAvailableTutors(): AvailableTutor[] {
  return [
    {
      name: "Maya Lovelace",
      className: "IS 6465",
    },
    {
      name: "Grace Hopper",
      className: "IS 6495",
    },
    {
      name: "Alan Turing",
      className: "IS 6570",
    },
  ];
}
