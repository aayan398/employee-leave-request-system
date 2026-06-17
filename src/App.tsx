import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import LeaveBalance from "./components/LeaveBalance";
import LeaveRequestForm from "./components/LeaveRequestForm";
import ManagerDashboard from "./components/ManagerDashboard";
import RequestList from "./components/RequestList";
import RoleSwitcher from "./components/RoleSwitcher";
import type { LeaveRequest } from "./types/LeaveRequest";

const STORAGE_KEY = "leaveRequests";

type Role = "Employee" | "Manager";

function calculateLeaveDays(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const difference = end.getTime() - start.getTime();

  return Math.floor(difference / (1000 * 60 * 60 * 24)) + 1;
}

export default function App() {
  const [activeRole, setActiveRole] = useState<Role>("Employee");

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

  function handleUpdateStatus(
    requestId: string,
    status: "Approved" | "Rejected",
    managerComment: string
  ) {
    setRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status,
              managerComment: managerComment.trim(),
            }
          : request
      )
    );
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
        <RoleSwitcher activeRole={activeRole} onRoleChange={setActiveRole} />

        {activeRole === "Employee" ? (
          <>
            <LeaveBalance totalDays={25} usedDays={usedDays} />

            <div className="content-grid">
              <LeaveRequestForm onAddRequest={handleAddRequest} />
              <RequestList requests={requests} />
            </div>
          </>
        ) : (
          <ManagerDashboard
            requests={requests}
            onUpdateStatus={handleUpdateStatus}
          />
        )}
      </main>
    </div>
  );
}