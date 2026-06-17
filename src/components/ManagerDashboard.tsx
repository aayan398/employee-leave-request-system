import { useState } from "react";
import type { LeaveRequest, LeaveStatus } from "../types/LeaveRequest";
import RequestFilters from "./RequestFilters";

type StatusFilter = "All" | LeaveStatus;
type TypeFilter = "All" | "Annual" | "Sick" | "Personal";

type ManagerDashboardProps = {
  requests: LeaveRequest[];
  onUpdateStatus: (
    requestId: string,
    status: "Approved" | "Rejected",
    managerComment: string
  ) => void;
};

export default function ManagerDashboard({
  requests,
  onUpdateStatus,
}: ManagerDashboardProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All");
  const [comments, setComments] = useState<Record<string, string>>({});

  const filteredRequests = requests.filter((request) => {
    const matchesStatus =
      statusFilter === "All" || request.status === statusFilter;
    const matchesType = typeFilter === "All" || request.leaveType === typeFilter;

    return matchesStatus && matchesType;
  });

  const pendingCount = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  const approvedCount = requests.filter(
    (request) => request.status === "Approved"
  ).length;

  const rejectedCount = requests.filter(
    (request) => request.status === "Rejected"
  ).length;

  function handleCommentChange(requestId: string, value: string) {
    setComments((currentComments) => ({
      ...currentComments,
      [requestId]: value,
    }));
  }

  function handleDecision(requestId: string, status: "Approved" | "Rejected") {
    const comment = comments[requestId] || "";
    onUpdateStatus(requestId, status, comment);

    setComments((currentComments) => ({
      ...currentComments,
      [requestId]: "",
    }));
  }

  return (
    <section className="card">
      <div className="section-header">
        <div>
          <h2>Manager Dashboard</h2>
          <p>Review, approve, and reject employee leave requests.</p>
        </div>
      </div>

      <div className="manager-stats">
        <div>
          <span>Pending</span>
          <strong>{pendingCount}</strong>
        </div>

        <div>
          <span>Approved</span>
          <strong>{approvedCount}</strong>
        </div>

        <div>
          <span>Rejected</span>
          <strong>{rejectedCount}</strong>
        </div>
      </div>

      <RequestFilters
        statusFilter={statusFilter}
        typeFilter={typeFilter}
        onStatusChange={setStatusFilter}
        onTypeChange={setTypeFilter}
      />

      {filteredRequests.length === 0 ? (
        <p className="empty-state">No requests match the selected filters.</p>
      ) : (
        <div className="request-list">
          {filteredRequests.map((request) => (
            <article key={request.id} className="request-item manager-request">
              <div>
                <div className="request-title-row">
                  <h3>{request.employeeName}</h3>
                  <span
                    className={`status status-${request.status.toLowerCase()}`}
                  >
                    {request.status}
                  </span>
                </div>

                <p>
                  {request.leaveType} leave from {request.startDate} to{" "}
                  {request.endDate}
                </p>

                <p className="reason">{request.reason}</p>

                {request.managerComment && (
                  <p className="manager-comment">
                    Manager comment: {request.managerComment}
                  </p>
                )}

                {request.status === "Pending" && (
                  <div className="manager-actions">
                    <textarea
                      value={comments[request.id] || ""}
                      onChange={(event) =>
                        handleCommentChange(request.id, event.target.value)
                      }
                      placeholder="Optional manager comment"
                    />

                    <div className="action-buttons">
                      <button
                        type="button"
                        className="approve-button"
                        onClick={() => handleDecision(request.id, "Approved")}
                      >
                        Approve
                      </button>

                      <button
                        type="button"
                        className="reject-button"
                        onClick={() => handleDecision(request.id, "Rejected")}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}