type LeaveBalanceProps = {
  totalDays: number;
  usedDays: number;
};

export default function LeaveBalance({
  totalDays,
  usedDays,
}: LeaveBalanceProps) {
  const remainingDays = totalDays - usedDays;

  return (
    <section className="card balance-card">
      <div className="section-heading">
        <div>
          <h2>Leave Balance</h2>
          <p>Track approved leave usage and remaining allowance.</p>
        </div>
      </div>

      <div className="balance-grid">
        <div className="metric-card">
          <span>Total Days</span>
          <strong>{totalDays}</strong>
        </div>

        <div className="metric-card">
          <span>Used Days</span>
          <strong>{usedDays}</strong>
        </div>

        <div className="metric-card">
          <span>Remaining</span>
          <strong>{remainingDays}</strong>
        </div>
      </div>
    </section>
  );
}