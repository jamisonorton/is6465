export type AvailableTutor = {
  name: string;
  className: string;
  sampleTimes: string[];
};

export function getAvailableTutors(): AvailableTutor[] {
  return [
    {
      name: "Maya Lovelace",
      className: "IS 6465",
      sampleTimes: ["Wednesday 5:00 PM", "Saturday 10:00 AM"],
    },
    {
      name: "Grace Hopper",
      className: "IS 6465",
      sampleTimes: ["Monday 6:00 PM", "Thursday 4:30 PM"],
    },
    {
      name: "Alan Turing",
      className: "IS 6465",
      sampleTimes: ["Tuesday 5:30 PM", "Friday 3:00 PM"],
    },
  ];
}
