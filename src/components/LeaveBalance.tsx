type LeaveBalanceProps = {
  totalDays: number;
  usedDays: number;
};

export default function LeaveBalance({ totalDays, usedDays }: LeaveBalanceProps) {
  const remainingDays = totalDays - usedDays;

  return (
    <section className="card balance-card">
      <h2>Leave Balance</h2>

      <div className="balance-grid">
        <div>
          <span>Total Days</span>
          <strong>{totalDays}</strong>
        </div>

        <div>
          <span>Used Days</span>
          <strong>{usedDays}</strong>
        </div>

        <div>
          <span>Remaining</span>
          <strong>{remainingDays}</strong>
        </div>
      </div>
    </section>
  );
}