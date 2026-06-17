import { useState } from "react";
import type { LeaveRequest, LeaveType } from "../types/LeaveRequest";

type LeaveRequestFormProps = {
  onAddRequest: (request: LeaveRequest) => void;
};

export default function LeaveRequestForm({ onAddRequest }: LeaveRequestFormProps) {
  const [employeeName, setEmployeeName] = useState("");
  const [leaveType, setLeaveType] = useState<LeaveType>("Annual");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!employeeName.trim() || !startDate || !endDate || !reason.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (endDate < startDate) {
      setError("End date cannot be before start date.");
      return;
    }

    const newRequest: LeaveRequest = {
      id: crypto.randomUUID(),
      employeeName: employeeName.trim(),
      leaveType,
      startDate,
      endDate,
      reason: reason.trim(),
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    onAddRequest(newRequest);

    setEmployeeName("");
    setLeaveType("Annual");
    setStartDate("");
    setEndDate("");
    setReason("");
    setError("");
  }

  return (
    <section className="card">
      <h2>Submit Leave Request</h2>

      <form className="leave-form" onSubmit={handleSubmit}>
        <label>
          Employee Name
          <input
            type="text"
            value={employeeName}
            onChange={(event) => setEmployeeName(event.target.value)}
            placeholder="Aayan Mohammad"
          />
        </label>

        <label>
          Leave Type
          <select
            value={leaveType}
            onChange={(event) => setLeaveType(event.target.value as LeaveType)}
          >
            <option value="Annual">Annual</option>
            <option value="Sick">Sick</option>
            <option value="Personal">Personal</option>
          </select>
        </label>

        <label>
          Start Date
          <input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
        </label>

        <label>
          End Date
          <input
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
          />
        </label>

        <label className="full-width">
          Reason
          <textarea
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder="Briefly explain the reason for leave"
          />
        </label>

        {error && <p className="error-message">{error}</p>}

        <button type="submit">Submit Request</button>
      </form>
    </section>
  );
}