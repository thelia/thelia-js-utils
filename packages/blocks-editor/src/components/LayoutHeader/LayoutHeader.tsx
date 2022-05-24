const LayoutHeader = ({
  title,
  open,
  setOpen,
}: {
  title: string;
  open: boolean;
  setOpen: Function;
}) => {
  return (
    <div
      className={`py-2 md:py-4 px-4 md:px-8 bg-mediumCharbon text-white rounded-tr-md ${
        !open && "rounded-br-md"
      } flex justify-between items-center`}
    >
      <div className="flex items-center">
        <span className="md:text-xl font-bold">{title}</span>
      </div>
      <button onClick={() => setOpen(!open)} className="flex">
        <div className="bg-lightVermillon px-2 py-1 rounded-l-md">
          {open ? (
            <i className="fa fa-chevron-down"></i>
          ) : (
            <i className="fa fa-chevron-right"></i>
          )}
        </div>
        <div className="bg-vermillon px-2 py-1 rounded-r-md">
          {open ? "Replier" : "Déplier"}
        </div>
      </button>
    </div>
  );
};

export default LayoutHeader;
