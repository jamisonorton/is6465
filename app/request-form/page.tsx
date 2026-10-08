import type { Metadata } from "next";
import RequestForm from "./RequestForm";
import { getAvailableTutors } from "@/lib/available-tutors";

export const metadata: Metadata = {
  title: "Request a Tutoring Session",
  description: "Request a tutoring session with an available peer tutor.",
};

export default function Request() {
  const availableTutors = getAvailableTutors();

  return (
    <main>
      <RequestForm availableTutors={availableTutors} />
    </main>
  );
}
