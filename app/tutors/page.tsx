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
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Tutors",
};

const availableTutors = [
  { name: "Maya Jones", courses: ["IS 6465", "IS 6495"] },
  { name: "John Doe", courses: ["IS 6570"] },
  { name: "Ava Sangria", courses: ["IS 6465", "IS 6570"] },
];

export default async function tutors() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle>Available Tutors</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Courses</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {availableTutors.map((tutor) => (
                  <TableRow key={tutor.name}>
                    <TableCell className="font-medium">{tutor.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        {tutor.courses.map((course) => (
                          <Badge key={course} variant="secondary">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
