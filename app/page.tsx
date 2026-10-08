import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peer Tutoring Hub",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 px-6 py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-12 md:flex-row">
        <div className="max-w-xl space-y-6 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Learn together. Grow together.
          </p>

          <h1 className="text-5xl font-bold tracking-tight text-slate-900 md:text-6xl">
            Peer Tutoring Hub
          </h1>

          <p className="text-lg leading-8 text-slate-600">
            Need help with a course? Submit a tutoring request and connect with
            a knowledgeable peer. You can also browse our available tutors.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            <a
              href="/request-form"
              className="rounded-lg bg-blue-600 px-5 py-3 text-center font-semibold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg"
            >
              Request Tutoring
            </a>

            <a
              href="/tutors"
              className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-center font-semibold text-slate-700 transition hover:border-blue-400 hover:text-blue-600"
            >
              View Tutors
            </a>
          </div>
        </div>

        <div className="w-full max-w-md rounded-3xl border border-white/70 bg-white/80 p-3 shadow-2xl backdrop-blur">
          <Image
            src="/images/tutoring.png"
            alt="Student meeting with a peer tutor"
            width={500}
            height={500}
            priority
            className="h-auto w-full rounded-2xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}
