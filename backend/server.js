import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import pl from "tau-prolog";
import lists from "tau-prolog/modules/lists.js";

lists(pl);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

const session = pl.create(1000);

const logicFile = path.resolve("./logic.pl");
const logic = fs.readFileSync(logicFile, "utf8");
session.consult(logic);

const canCompleteRule = `
  can_complete(Course, Completed) :-
    findall(Prereq, prerequisite(Prereq, Course), PrereqList),
    (   PrereqList == [] -> true
    ;   forall(member(P, PrereqList), member(P, Completed))
    ).
`;
session.consult(canCompleteRule);

function formatAtom(str) {
  return str.toLowerCase().replace(/\s+/g, "").replace(/-/g, "").replace(/\//g, "");
}

async function queryProlog(query) {
  return new Promise((resolve, reject) => {
    session.query(query, {
      success: () => {
        session.answer({
          success: (ans) => {
            resolve(true);
          },
          fail: () => {
            resolve(false);
          },
          error: (err) => {
            console.error("Prolog error:", err);
            resolve(false);
          },
        });
      },
      error: (err) => {
        console.error("Query error:", err);
        resolve(false);
      },
    });
  });
}

app.post("/check", async (req, res) => {
  const { course, completed } = req.body;
  if (!course || !Array.isArray(completed)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const formattedCourse = formatAtom(course);
  const formattedCompleted = completed.map(c => formatAtom(c));
  
  const completedList = '[' + formattedCompleted.join(',') + ']';
  const query = `can_complete(${formattedCourse}, ${completedList}).`;

  try {
    const result = await queryProlog(query);
    res.json({ canComplete: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Prolog error" });
  }
});

app.get("/curriculum", (req, res) => {
  const textFile = path.resolve("./CurriculumTemplate.txt");
  const text = fs.readFileSync(textFile, "utf8");

  const courses = text
    .split("\n")
    .filter((line) => line.trim() && !line.startsWith("%"))
    .map((line) => {

      const parts = line.split("/");
      const code = parts[0]?.trim() || "";
      const description = parts[1]?.trim() || "";
      const units = parseInt(parts[2]) || 0;
      const year = parseInt(parts[3]) || 0;
      const sem = parseInt(parts[4]) || 0;
      
      let prerequisites = [];
      if (parts.length > 7) {
        prerequisites = parts.slice(7).filter(p => p.trim() !== '').map(p => p.trim());
      }
      
      return {
        code,
        description,
        units,
        year,
        sem,
        prerequisites
      };
    });

  res.json(courses);
});

app.listen(PORT, () =>
  console.log(`Backend running at http://localhost:${PORT}`)
);