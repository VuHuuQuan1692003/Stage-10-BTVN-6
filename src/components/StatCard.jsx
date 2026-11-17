// ===== BÀI LÀM: thẻ số liệu thống kê =====
function StatCard({ label, value }) {
  return (
    <div className="card text-center" role="group" aria-label={label}>
      <div className="card-body">
        <div className="text-muted">{label}</div>
        <strong className="fs-3">{value}</strong>
      </div>
    </div>
  );
}

export default StatCard;
