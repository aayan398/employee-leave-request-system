import type { LeaveRequest } from "../types/LeaveRequest";

type RequestListProps = {
  requests: LeaveRequest[];
};

export default function RequestList({ requests }: RequestListProps) {
  return (
    <section className="card">
      <div className="section-heading">
        <div>
          <h2>My Requests</h2>
          <p>View submitted leave requests and their current status.</p>
        </div>
      </div>

      {requests.length === 0 ? (
        <p className="empty-state">No leave requests submitted yet.</p>
      ) : (
        <div className="request-list">
          {requests.map((request) => (
            <article key={request.id} className="request-item">
              <div className="request-main">
                <div className="request-title-row">
                  <h3>{request.employeeName}</h3>
                  <span
                    className={`status status-${request.status.toLowerCase()}`}
                  >
                    {request.status}
                  </span>
                </div>

                <p className="request-meta">
                  {request.leaveType} leave • {request.startDate} to{" "}
                  {request.endDate}
                </p>

                <p className="reason">{request.reason}</p>

                {request.managerComment && (
                  <p className="manager-comment">
                    Manager comment: {request.managerComment}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}