import "./BlockTooltip.css";

const BlockTooltip = ({
  title,
  description,
  image,
}: {
  title: string;
  description?: string;
  image?: string;
}) => {
  return (
    <div className="BlockTooltip">
      {image && (
        <div className="BlockTooltip__Image">
          <img src={image} alt="" />
        </div>
      )}
      <p className="BlockTooltip__Title">{title}</p>
      {description && (
        <p className="BlockTooltip__Description">{description}</p>
      )}
    </div>
  );
};

export default BlockTooltip;
