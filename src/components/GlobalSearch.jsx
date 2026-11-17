// ===== BÀI LÀM: ô tìm kiếm toàn cục (nhân viên và công việc) =====
import { useState } from "react";
import { Link } from "react-router-dom";

function GlobalSearch({ employees = [], tasks = [] }) {
  const [query, setQuery] = useState("");

  const trimmed = query.trim();
  const lower = trimmed.toLowerCase();

  let matchedEmployees = [];
  let matchedTasks = [];

  if (trimmed) {
    matchedEmployees = employees.filter((emp) => {
      const nameMatch = emp.name && emp.name.toLowerCase().includes(lower);
      const posMatch = emp.position && emp.position.toLowerCase().includes(lower);
      const deptMatch = emp.department && emp.department.toLowerCase().includes(lower);
      return nameMatch || posMatch || deptMatch;
    });

    matchedTasks = tasks.filter((task) => {
      return task.title && task.title.toLowerCase().includes(lower);
    });
  }

  return (
    <section className="mb-3">
      <label htmlFor="global-search" className="form-label">
        Tìm trong Task Hub
      </label>
      <input
        id="global-search"
        type="text"
        className="form-control"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {trimmed && (
        matchedEmployees.length === 0 && matchedTasks.length === 0 ? (
          <p className="text-muted mt-2">Không có kết quả cho "{trimmed}".</p>
        ) : (
          <div className="mt-2">
            <h3 className="h6">Nhân viên ({matchedEmployees.length})</h3>
            <ul className="list-group mb-2">
              {matchedEmployees.map((emp) => (
                <li key={emp._id} className="list-group-item">
                  <Link to={`/employees/${emp._id}`}>{emp.name}</Link>
                </li>
              ))}
            </ul>
            <h3 className="h6">Công việc ({matchedTasks.length})</h3>
            <ul className="list-group">
              {matchedTasks.map((task) => (
                <li key={task._id} className="list-group-item">
                  <Link to={`/tasks/${task._id}`}>{task.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </section>
  );
}

export default GlobalSearch;
