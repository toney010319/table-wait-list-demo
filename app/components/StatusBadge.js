export default function StatusBadge({ status }) {
  const colors = {
    WAITING: "bg-blue-100 text-blue-800",
    CALLED: "bg-yellow-100 text-yellow-800",
    SEATED: "bg-green-100 text-green-800",
    REMOVED: "bg-red-100 text-red-800",
  };
  return <span className={`px-2 py-1 rounded text-sm ${colors[status]}`}>{status}</span>;
}
