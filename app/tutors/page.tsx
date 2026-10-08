import type { Metadata } from "next";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAvailableTutors } from "@/lib/available-tutors";

export const metadata: Metadata = {
  title: "Tutors",
};

export default async function tutors() {
  const availableTutors = getAvailableTutors();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 px-4 py-12">
      <Card className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border-slate-200 bg-white shadow-xl">
        <CardHeader className="border-b bg-slate-50 px-6 py-5">
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
            Available Tutors
          </CardTitle>

          <CardDescription className="text-slate-600">
            Browse the tutors currently available for peer assistance.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableCaption className="px-6 py-4 text-left text-slate-500">
              Currently available peer tutors
            </TableCaption>

            <TableHeader className="bg-slate-100">
              <TableRow className="border-slate-200 hover:bg-slate-100">
                <TableHead className="px-6 py-4 font-semibold text-slate-700">
                  Name
                </TableHead>
                <TableHead className="px-6 py-4 font-semibold text-slate-700">
                  Course
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {availableTutors.map((tutor) => (
                <TableRow
                  key={tutor.name}
                  className="border-slate-200 transition-colors hover:bg-blue-50"
                >
                  <TableCell className="px-6 py-4 font-medium text-slate-900">
                    {tutor.name}
                  </TableCell>

                  <TableCell className="px-6 py-4 text-slate-600">
                    {tutor.className}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
