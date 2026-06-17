import type { LeaveStatus, LeaveType } from "../types/LeaveRequest";

type StatusFilter = "All" | LeaveStatus;
type TypeFilter = "All" | LeaveType;

type RequestFiltersProps = {
  statusFilter: StatusFilter;
  typeFilter: TypeFilter;
  onStatusChange: (status: StatusFilter) => void;
  onTypeChange: (type: TypeFilter) => void;
};

export default function RequestFilters({
  statusFilter,
  typeFilter,
  onStatusChange,
  onTypeChange,
}: RequestFiltersProps) {
  return (
    <div className="filters">
      <label>
        Status
        <select
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value as StatusFilter)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </label>

      <label>
        Leave Type
        <select
          value={typeFilter}
          onChange={(event) => onTypeChange(event.target.value as TypeFilter)}
        >
          <option value="All">All</option>
          <option value="Annual">Annual</option>
          <option value="Sick">Sick</option>
          <option value="Personal">Personal</option>
        </select>
      </label>
    </div>
  );
}