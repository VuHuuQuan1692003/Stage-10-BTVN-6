// ===== BÀI LÀM: tính tiến độ từ danh sách công việc =====
function calcProgress(tasks) {
  if (!tasks || tasks.length === 0) {
    return { total: 0, done: 0, percent: 0 };
  }

  const total = tasks.length;
  const done = tasks.filter((task) => task.status === "done").length;
  const percent = Math.round((done / total) * 100);

  return { total, done, percent };
}

export default calcProgress;
