import { Trash2, Edit, Eye } from "lucide-react";

interface ActionPanelProps {
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}

const UserActionsPanel: React.FC<ActionPanelProps> = ({
  onEdit,
  onDelete,
  onView,
}) => {
  const buttonClasses =
    "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 hover:bg-gray-100 hover:scale-105";

  return (
    <div className="absolute right-0 top-10 w-36 bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col z-50 overflow-hidden animate-fade-in">
      <button className={buttonClasses} onClick={onView}>
        <Eye className="w-4 h-4 text-gray-600" />
        View
      </button>
      <button className={buttonClasses} onClick={onEdit}>
        <Edit className="w-4 h-4 text-gray-600" />
        Edit
      </button>
      <button
        className={`${buttonClasses} text-red-600 hover:bg-red-50`}
        onClick={onDelete}
      >
        <Trash2 className="w-4 h-4" />
        Delete
      </button>
    </div>
  );
};

export default UserActionsPanel;
