import { Pool } from "pg";

const pool = new Pool({
  user: "testuser",
  host: "localhost",
  database: "testdb",
  password: "testpass",
  port: 5432,
});

const tutors = [
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

async function seed() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tutors (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      class_name TEXT NOT NULL,
      sample_times TEXT[] NOT NULL DEFAULT '{}',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  for (const tutor of tutors) {
    await pool.query(
      `
        INSERT INTO tutors (name, class_name, sample_times)
        SELECT $1, $2, $3::text[]
        WHERE NOT EXISTS (
          SELECT 1
          FROM tutors
          WHERE name = $1 AND class_name = $2
        );
      `,
      [tutor.name, tutor.className, tutor.sampleTimes],
    );
  }

  const result = await pool.query(`
    SELECT
      id,
      name,
      class_name AS "className",
      sample_times AS "sampleTimes"
    FROM tutors
    ORDER BY id;
  `);

  console.table(result.rows);
}

seed()
  .catch(console.error)
  .finally(() => pool.end());

export default pool;
