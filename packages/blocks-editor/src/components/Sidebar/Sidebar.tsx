import { nanoid } from "nanoid";
import { useState } from "react";
import { useBlocksContext } from "../../hooks/useBlockContext";
import { usePlugins } from "../../hooks/usePlugins";

const Sidebar = () => {
  const { addBlock } = useBlocksContext();
  const [isOpen, setIsOpen] = useState(false);

  const plugins = usePlugins();

  return (
    <div className="Sidebar flex flex-col">
      <div className="Sidebar-header bg-slate-900 text-white px-5 py-4">
        <button onClick={() => setIsOpen(!isOpen)}>
          <i className="fa fa-arrow-circle-right"></i>
        </button>
        <span className="font-semibold ml-6">Contenus</span>
      </div>

      <div className="Sidebar-content p-3 bg-white">
        <ol className="flex flex-col gap-2">
          {plugins.map((plugin) => {
            return (
              <button
                className="BlocksEditor-btn bg-gray-200 p-2 border hover:bg-gray-300 rounded-md text-left"
                onClick={() =>
                  addBlock({
                    id: nanoid(),
                    data: plugin.initialData,
                    parent: null,
                    type: { id: plugin.type.id },
                  })
                }
                key={plugin.id}
              >
                <i className="fa fa-video"></i>
                {plugin.title.fr_FR}
              </button>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Sidebar;
