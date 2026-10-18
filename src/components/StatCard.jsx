function StatCard({ label, value, hint, tone }) {
  return (
    <div className={`card stat ${tone}`}>
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
      <p className="stat-hint">{hint}</p>
    </div>
  );
}

export default StatCard;