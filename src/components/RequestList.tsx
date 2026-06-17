import type { LeaveRequest } from "../types/LeaveRequest";

type RequestListProps = {
  requests: LeaveRequest[];
};

export default function RequestList({ requests }: RequestListProps) {
  return (
    <section className="card">
      <h2>My Requests</h2>

      {requests.length === 0 ? (
        <p className="empty-state">No leave requests submitted yet.</p>
      ) : (
        <div className="request-list">
          {requests.map((request) => (
            <article key={request.id} className="request-item">
              <div>
                <h3>{request.employeeName}</h3>
                <p>
                  {request.leaveType} leave from {request.startDate} to{" "}
                  {request.endDate}
                </p>
                <p className="reason">{request.reason}</p>
              </div>

              <span className={`status status-${request.status.toLowerCase()}`}>
                {request.status}
              </span>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}