import { useMemo } from "react";
import { Crown, Medal, Award, Zap, Linkedin, Github } from "lucide-react";
import React from "react";

const students = [
  { rollNo: "0245CYBS019", name: "Prince", point: 20, linkedIn: "#", gitHub: "#" },
  { rollNo: "0255CDS020", name: "Nikhil Kumar", point: 20, linkedIn: "#", gitHub: "#" },
  { rollNo: "0245CSE005", name: "Shayef Kabir", point: 20, linkedIn: "#", gitHub: "#" },
  { rollNo: "0255CSE015", name: "Uma", point: 19, linkedIn: "#", gitHub: "#" },
  { rollNo: "0255CSE022", name: "Ikra", point: 16, linkedIn: "#", gitHub: "#" },
  { rollNo: "0245CSE031", name: "Anoop Kumar", point: 10, linkedIn: "#", gitHub: "#" },
];

export default function User() {

  const ranked = useMemo(() => {
    const sorted = [...students].sort((a, b) => b.point - a.point);
    let rank = 1;
    return sorted.map((s, i) => {
      if (i > 0 && s.point < sorted[i - 1].point) {
        rank = i + 1;
      }
      return { ...s, rank };
    });
  }, []);

  const rankGlow = (rank) => {
    if (rank === 1)
      return "border-yellow-400 shadow-[0_0_35px_rgba(250,204,21,0.9)]";
    if (rank === 2)
      return "border-slate-300 shadow-[0_0_30px_rgba(192,192,192,0.8)]";
    if (rank === 3)
      return "border-amber-700 shadow-[0_0_25px_rgba(180,83,9,0.8)]";
    return "border-purple-500";
  };

  const rankIcon = (rank) => {
    if (rank === 1) return <Crown className="text-yellow-400" />;
    if (rank === 2) return <Medal className="text-slate-300" />;
    if (rank === 3) return <Award className="text-amber-700" />;
    return <Zap className="text-purple-400" />;
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* Bolder Grid Background */}
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,215,0,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.25) 1px, transparent 1px)",
          backgroundSize: "35px 35px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto py-16 px-6">

        <h1 className="text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          LEADERBOARD
        </h1>

        <div className="space-y-6">
          {ranked.map((student) => (
            <div
              key={student.rollNo}
              className={`flex flex-col md:flex-row justify-between items-center bg-zinc-900 rounded-2xl p-6 border transition-all duration-300 hover:scale-[1.02] ${rankGlow(student.rank)}`}
            >

              {/* Left Section */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="flex items-center gap-2 text-2xl font-bold">
                  {rankIcon(student.rank)}
                  {student.rank}
                </div>

                <div>
                  <div className="text-xl font-semibold">
                    {student.name}
                  </div>
                  <div className="text-sm text-gray-400">
                    {student.rollNo}
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-6 mt-4 md:mt-0">

                <div className="text-xl font-bold text-yellow-400">
                  {student.point} pts
                </div>

                {/* Social Links */}
                <div className="flex gap-3">
                  <a
                    href={student.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition hover:scale-110"
                  >
                    <Linkedin size={18} className="text-white" />
                  </a>

                  <a
                    href={student.gitHub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition hover:scale-110"
                  >
                    <Github size={18} className="text-white" />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
