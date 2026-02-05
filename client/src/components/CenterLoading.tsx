
import { Loader2 } from "lucide-react";

interface LoaderProps {
  size?: number; // size in pixels
  color?: string; // Tailwind color class, e.g., "text-blue-500"
}

const CenterLoading = ({ size = 40, color = "text-blue-500" }: LoaderProps) => {
  return (
    <div className="flex items-center justify-center h-full w-full min-h-screen">
      <Loader2 className={`animate-spin ${color}`} size={size} />
    </div>
  );
};

export default CenterLoading;
