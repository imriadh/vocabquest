import { NextResponse } from "next/server";
import { sampleWords, type Difficulty, type Exam } from "@/lib/vocab/sample-data";

const VALID_DIFFICULTIES: Difficulty[] = ["beginner", "intermediate", "advanced"];
const VALID_EXAMS: Exam[] = ["IELTS", "TOEFL", "GRE", "SAT", "BCS", "Admission"];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim().toLowerCase();
  const difficulty = searchParams.get("difficulty");
  const exam = searchParams.get("exam");
  const category = searchParams.get("category");
  const limit = Number(searchParams.get("limit") ?? 0);

  let words = sampleWords;

  if (q) {
    words = words.filter(
      (w) =>
        w.word.toLowerCase().includes(q) ||
        w.bengali.includes(q) ||
        w.definition.toLowerCase().includes(q) ||
        w.synonyms.some((s) => s.toLowerCase().includes(q)) ||
        w.antonyms.some((s) => s.toLowerCase().includes(q))
    );
  }

  if (difficulty && VALID_DIFFICULTIES.includes(difficulty as Difficulty)) {
    words = words.filter((w) => w.difficulty === difficulty);
  }

  if (exam && VALID_EXAMS.includes(exam as Exam)) {
    words = words.filter((w) => w.exams.includes(exam as Exam));
  }

  if (category) {
    words = words.filter((w) => w.category.toLowerCase() === category.toLowerCase());
  }

  const limited = limit > 0 ? words.slice(0, limit) : words;

  return NextResponse.json({
    count: limited.length,
    total: sampleWords.length,
    words: limited,
  });
}
