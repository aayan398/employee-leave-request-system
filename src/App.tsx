import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import LeaveBalance from "./components/LeaveBalance";
import LeaveRequestForm from "./components/LeaveRequestForm";
import RequestList from "./components/RequestList";
import type { LeaveRequest } from "./types/LeaveRequest";

const STORAGE_KEY = "leaveRequests";

function calculateLeaveDays(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const difference = end.getTime() - start.getTime();
  return Math.floor(difference / (1000 * 60 * 60 * 24)) + 1;
}

export default function App() {
  const [requests, setRequests] = useState<LeaveRequest[]>(() => {
    const savedRequests = localStorage.getItem(STORAGE_KEY);
    return savedRequests ? JSON.parse(savedRequests) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  }, [requests]);

  function handleAddRequest(request: LeaveRequest) {
    setRequests((currentRequests) => [request, ...currentRequests]);
  }

  const usedDays = requests
    .filter((request) => request.status === "Approved")
    .reduce(
      (total, request) =>
        total + calculateLeaveDays(request.startDate, request.endDate),
      0
    );

  return (
    <div className="app">
      <Header />

      <main className="container">
        <LeaveBalance totalDays={25} usedDays={usedDays} />

        <div className="content-grid">
          <LeaveRequestForm onAddRequest={handleAddRequest} />
          <RequestList requests={requests} />
        </div>
      </main>
    </div>
  );
}