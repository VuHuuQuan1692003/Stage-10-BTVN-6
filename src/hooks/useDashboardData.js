// ===== BÀI LÀM: tải nhân viên và công việc MỘT lần, dùng chung cho cả bảng điều khiển =====
import { useState, useEffect } from "react";
import axios from "axios";
import { getEmployees } from "../api/employees.js";
import { getTasks } from "../api/tasks.js";
import { getErrorMessage } from "../api/http.js";
import updateTask from "../api/updateTask.js";

function useDashboardData() {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  function reload() {
    setLoading(true);
    setError("");
    setReloadKey((prev) => prev + 1);
  }

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");

    Promise.all([getEmployees(controller.signal), getTasks(controller.signal)])
      .then(([fetchedEmployees, fetchedTasks]) => {
        setEmployees(fetchedEmployees);
        setTasks(fetchedTasks);
        setLoading(false);
        setError("");
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setEmployees([]);
        setTasks([]);
        setLoading(false);
        setError(getErrorMessage(err));
      });

    return () => {
      controller.abort();
    };
  }, [reloadKey]);

  async function changeStatus(task, status) {
    try {
      const updated = await updateTask(task, { status });
      setTasks((prev) => prev.map((t) => (t._id === task._id ? updated : t)));
      return updated;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  }

  return {
    employees,
    tasks,
    loading,
    error,
    reload,
    changeStatus,
  };
}

export default useDashboardData;
