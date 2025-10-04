import * as React from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils.js";

export function Toast({ title, description, onClose, variant = "default" }) {
  return (
    <div
      className={cn(
        "relative flex w-full max-w-sm items-start rounded-lg border border-gray-200 bg-white p-4 shadow-lg transition-all",
        variant === "destructive" && "border-red-500 bg-red-50"
      )}
    >
      <div className="flex-1">
        {title && <p className="font-semibold">{title}</p>}
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </div>
      <button
        onClick={onClose}
        className="ml-3 text-gray-500 hover:text-gray-700"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}