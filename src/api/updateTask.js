// ===== BÀI LÀM: gửi PUT để sửa một công việc =====
import http from "./http.js";

async function updateTask(task, changes, signal) {
  const updatedTask = { ...task, ...changes };
  const { _id, ...body } = updatedTask;

  await http.put(`/tasks/${task._id}`, body, { signal });

  return updatedTask;
}

export default updateTask;
