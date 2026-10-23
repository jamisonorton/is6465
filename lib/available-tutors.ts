export type AvailableTutor = {
  name: string;
};

export function getAvailableTutors(): AvailableTutor[] {
  return [
    {
      name: "Maya Lovelace",
    },
    {
      name: "Grace Hopper",
    },
    {
      name: "Alan Turing",
    },
  ];
}
