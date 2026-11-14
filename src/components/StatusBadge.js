const styles = {
  Pending: "badge-warning",
  Confirmed: "badge-success",
  Completed: "badge-info",
  Cancelled: "badge-error",
};

export default function StatusBadge({ status }) {
  return <span className={`badge ${styles[status] || "badge-ghost"} badge-soft font-semibold`}>{status}</span>;
}