const BlockTooltip = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div className="BlockTooltip">
      <p className="font-semibold">{title}</p>
      {description && <p className="mt-2 text-sm">{description}</p>}
    </div>
  );
};

export default BlockTooltip;
