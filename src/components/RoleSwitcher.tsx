type Role = "Employee" | "Manager";

type RoleSwitcherProps = {
  activeRole: Role;
  onRoleChange: (role: Role) => void;
};

export default function RoleSwitcher({
  activeRole,
  onRoleChange,
}: RoleSwitcherProps) {
  return (
    <div className="role-switcher">
      <button
        type="button"
        className={activeRole === "Employee" ? "active" : ""}
        onClick={() => onRoleChange("Employee")}
      >
        Employee View
      </button>

      <button
        type="button"
        className={activeRole === "Manager" ? "active" : ""}
        onClick={() => onRoleChange("Manager")}
      >
        Manager View
      </button>
    </div>
  );
}