import { useMemo, useState } from "react";
import React from "react";

export default function Admin({ students, setStudents }) {
  const [inputPoints, setInputPoints] = useState({});

  const ranked = useMemo(() => {
    if (!Array.isArray(students)) return [];

    const sorted = [...students].sort((a, b) => b.point - a.point);
    let rank = 1;

    return sorted.map((s, i) => {
      if (i > 0 && s.point < sorted[i - 1].point) {
        rank = i + 1;
      }
      return { ...s, rank };
    });
  }, [students]);

  const updatePoints = (rollNo) => {
    const value = Number(inputPoints[rollNo]);

    if (!value) return;

    const updated = students.map((s) =>
      s.rollNo === rollNo
        ? { ...s, point: s.point + value }
        : s
    );

    setStudents(updated);

    setInputPoints((prev) => ({
      ...prev,
      [rollNo]: "",
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,215,0,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.25) 1px, transparent 1px)",
          backgroundSize: "35px 35px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto py-16 px-6">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-purple-400">
          ADMIN PANEL
        </h1>

        <div className="space-y-6">
          {ranked.map((student) => (
            <div
              key={student.rollNo}
              className="bg-zinc-900 rounded-2xl p-6 border border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] transition"
            >
              <div className="text-xl font-semibold">
                {student.name}
              </div>

              <div className="text-sm text-gray-400 mb-2">
                {student.rollNo}
              </div>

              {/* Social Links */}
              <div className="flex gap-4 mb-3 text-sm">
                {student.github && (
                  <a
                    href={student.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    GitHub
                  </a>
                )}

                {student.linkedin && (
                  <a
                    href={student.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-300 hover:underline"
                  >
                    LinkedIn
                  </a>
                )}
              </div>

              <div className="mb-1 text-yellow-400 font-bold">
                Points: {student.point}
              </div>

              <div className="mb-3 text-purple-300 font-semibold">
                Rank: {student.rank}
              </div>

              <input
                type="number"
                placeholder="Add points"
                value={inputPoints[student.rollNo] || ""}
                onChange={(e) =>
                  setInputPoints({
                    ...inputPoints,
                    [student.rollNo]: e.target.value,
                  })
                }
                className="w-full p-2 bg-black border border-purple-500 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <button
                onClick={() => updatePoints(student.rollNo)}
                className="w-full bg-purple-600 hover:bg-purple-500 transition p-2 rounded-lg font-semibold"
              >
                Update Points
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
