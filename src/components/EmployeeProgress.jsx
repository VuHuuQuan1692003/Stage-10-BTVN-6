// ===== BÀI LÀM: tiến độ theo nhân viên =====
import calcProgress from "../utils/calcProgress.js";

function EmployeeProgress({ employees = [], tasks = [] }) {
  const eligibleEmployees = employees.filter(
    (emp) => emp.status === "active" || emp.status === "probation"
  );

  const list = eligibleEmployees.map((employee) => {
    const empTasks = tasks.filter((task) => task.assigneeCode === employee.code);
    const { total, done, percent } = calcProgress(empTasks);
    return {
      employee,
      total,
      done,
      percent,
    };
  });

  list.sort((a, b) => {
    if (b.percent !== a.percent) {
      return b.percent - a.percent;
    }
    return a.employee.name.localeCompare(b.employee.name);
  });

  return (
    <section className="mb-4">
      <h3 className="h5">Tiến độ theo nhân viên</h3>
      <ul className="list-group">
        {list.map(({ employee, total, done, percent }) => (
          <li key={employee._id} className="list-group-item">
            <div className="mb-1">
              {employee.name}: {done}/{total} ({percent}%)
            </div>
            <div className="progress">
              <div
                className="progress-bar bg-success"
                role="progressbar"
                aria-label={employee.name}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={percent}
                style={{ width: `${percent}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default EmployeeProgress;
