import "./BlockTooltip.css";

const BlockTooltip = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div className="BlockTooltip">
      <p className="BlockTooltip__Title">{title}</p>
      {description && <p className="BlockTooltip__Description">{description}</p>}
    </div>
  );
};

export default BlockTooltip;
