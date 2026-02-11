type UserPanelProps = {
  children: React.ReactNode;
  title: string;
  icon: React.ReactNode;
  className?: string;
  leftEl?: React.ReactNode;
  id: string;
};

const UserPanel = ({
  children,
  title,
  icon,
  className,
  leftEl,
  id,
}: UserPanelProps) => {
  return (
    <div
      className={`p-5 bg-white/5 border border-white/20 rounded-xl ${className}`}
      id={id}
    >
      <div className="flex pb-5 border-b border-white/10 items-center">
        {icon}
        <div className="ml-2.5 text-base">{title}</div>
        {leftEl}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default UserPanel;
