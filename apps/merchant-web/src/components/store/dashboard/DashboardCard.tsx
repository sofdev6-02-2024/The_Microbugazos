import "@/styles/store/dashboard/dashboard-card.css";
interface DashboardCardProps {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

export const DashboardCard = ({
  value,
  label,
  prefix,
  suffix = "K",
}: DashboardCardProps) => {
  return (
    <div className="card hover-effect">
      <div className="value-card-store-container">
        {prefix && (
          <span className="prefix-dashboard-card-value">{prefix}</span>
        )}
        <span className="dashboard-card-value">{value}</span>
        {suffix && (
          <span className="suffix-dashboard-card-value">{suffix}</span>
        )}
      </div>
      <p className="label-card-store-container">{label}</p>
    </div>
  );
};
