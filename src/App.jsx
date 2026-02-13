import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import User from "./pages/User";
import Admin from "./pages/Admin";
import React from "react";

export default function App() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : [
      { rollNo: "101", name: "Aman", point: 120 },
      { rollNo: "102", name: "Riya", point: 110 },
      { rollNo: "103", name: "Rahul", point: 100 },
    ];
  });

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  return (
    <Routes>
      {/* User Page */}
      <Route path="/" element={<User students={students} />} />

      {/* Hidden Admin Page */}
      <Route
        path="/admin2026"
        element={
          <Admin
            students={students}
            setStudents={setStudents}
          />
        }
      />
    </Routes>
  );
}
