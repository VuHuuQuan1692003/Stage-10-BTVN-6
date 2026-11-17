// ===== BÀI LÀM: danh sách công việc quá hạn =====
import isOverdue from "../utils/isOverdue.js";
import formatDate from "../utils/formatDate.js";
import { TODAY } from "../config.js";

function OverdueList({ tasks = [], employees = [], onDone, updatingTaskId }) {
  const overdueTasks = tasks.filter((task) => isOverdue(task, TODAY));

  // Sắp xếp hạn cũ nhất trước; cùng hạn giữ nguyên thứ tự ban đầu
  const sorted = [...overdueTasks].sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  const topOverdue = sorted.slice(0, 5);

  return (
    <section className="mb-4">
      <h3 className="h5">Công việc quá hạn</h3>
      {topOverdue.length === 0 ? (
        <p className="text-muted">Không có công việc quá hạn.</p>
      ) : (
        <ul className="list-group">
          {topOverdue.map((task) => {
            const assignee = employees.find((emp) => emp.code === task.assigneeCode);
            const assigneeText = assignee ? `Người nhận: ${assignee.name}` : "Chưa giao";

            return (
              <li
                key={task._id}
                className="list-group-item list-group-item-danger d-flex justify-content-between align-items-center"
              >
                <span>
                  {task.title} - {assigneeText} - Hạn: {formatDate(task.dueDate)}
                </span>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-success"
                  aria-label={`Hoàn thành ${task.title}`}
                  disabled={updatingTaskId === task._id}
                  onClick={() => onDone(task)}
                >
                  Xong
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default OverdueList;
