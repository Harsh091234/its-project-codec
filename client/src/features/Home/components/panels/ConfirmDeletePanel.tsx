

interface ConfirmDeletePanelProps {

  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeletePanel = ({
  onConfirm,
  onCancel,
}: ConfirmDeletePanelProps) => {
    return (
      // Backdrop
      <div
        className="fixed inset-0 bg-black/40 bg-opacity-40 flex items-center justify-center z-50"
        onClick={onCancel} // Close modal when clicking outside
      >
        {/* Modal Content */}
        <div
          className="bg-white  rounded-xl shadow-lg p-6 max-w-sm w-full"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          <p className="text-gray-700 mb-18 text-base">
            Are you sure you want to delete this item?
          </p>
          <div className="flex justify-end gap-3 text-sm">
            <button
              onClick={onCancel}
              className="px-4 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
};

export default ConfirmDeletePanel;
