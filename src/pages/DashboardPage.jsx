// ===== BÀI LÀM: trang bảng điều khiển (tuyến "/") =====
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import useDashboardData from "../hooks/useDashboardData.js";
import WeatherWidget from "../components/WeatherWidget.jsx";
import GlobalSearch from "../components/GlobalSearch.jsx";
import StatCard from "../components/StatCard.jsx";
import EmployeeProgress from "../components/EmployeeProgress.jsx";
import OverdueList from "../components/OverdueList.jsx";

function DashboardPage() {
  const { user } = useAuth();
  const { employees, tasks, loading, error, reload, changeStatus } = useDashboardData();

  const [updateError, setUpdateError] = useState("");
  const [updatingTaskId, setUpdatingTaskId] = useState(null);

  async function handleDone(task) {
    if (updatingTaskId) return;
    setUpdatingTaskId(task._id);
    try {
      await changeStatus(task, "done");
      setUpdateError("");
    } catch (err) {
      setUpdateError(`Không cập nhật được: ${err.message}`);
    } finally {
      setUpdatingTaskId(null);
    }
  }

  const totalTasks = tasks.length;
  const doingTasks = tasks.filter((t) => t.status === "doing").length;
  const doneTasks = tasks.filter((t) => t.status === "done").length;

  return (
    <div>
      <h2 className="h4 mb-3">Bảng điều khiển</h2>

      <WeatherWidget city={user?.city} />

      {loading && (
        <div role="status" className="d-flex align-items-center gap-2 mb-3">
          <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
          <span>Đang tải bảng điều khiển...</span>
        </div>
      )}

      {!loading && error && (
        <div role="alert" className="alert alert-danger d-flex justify-content-between align-items-center">
          <span>Không tải được bảng điều khiển: {error}</span>
          <button type="button" className="btn btn-sm btn-outline-danger" onClick={reload}>
            Thử lại
          </button>
        </div>
      )}

      {!loading && !error && (
        <div>
          <GlobalSearch employees={employees} tasks={tasks} />

          <div className="row g-3 mb-4">
            <div className="col-12 col-md-4">
              <StatCard label="Tổng công việc" value={totalTasks} />
            </div>
            <div className="col-12 col-md-4">
              <StatCard label="Đang làm" value={doingTasks} />
            </div>
            <div className="col-12 col-md-4">
              <StatCard label="Hoàn thành" value={doneTasks} />
            </div>
          </div>

          <EmployeeProgress employees={employees} tasks={tasks} />

          {updateError && (
            <p role="alert" className="alert alert-danger">
              {updateError}
            </p>
          )}

          <OverdueList
            tasks={tasks}
            employees={employees}
            onDone={handleDone}
            updatingTaskId={updatingTaskId}
          />
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
