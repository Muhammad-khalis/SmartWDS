/*
Status badge used in dispatch / GRN screens

Example
Pending → Yellow
Delivered → Green
*/

const StatusBadge = ({ status }) => {

  const styles = {
    Pending: "bg-yellow-100 text-yellow-800",
    Delivered: "bg-green-100 text-green-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded text-sm font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;