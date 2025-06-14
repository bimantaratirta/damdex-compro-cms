import { Edit, Trash, Eye } from "lucide-react";
import { Button } from "./ui/button";

export const DatagridActions = ({
  onDetailClick,
  onDeleteClick,
  onEditClick,
}: {
  onDetailClick?: () => void;
  onDeleteClick?: () => void;
  onEditClick?: () => void;
}) => {
  return (
    <div className="flex flex-row space-x-2">
      {onDetailClick && (
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => {
            if (onDetailClick) onDetailClick();
          }}
        >
          <Eye color="#35A2DB" />
        </Button>
      )}
      {onEditClick && (
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => {
            if (onEditClick) onEditClick();
          }}
        >
          <Edit color="#FFCC00" />
        </Button>
      )}
      {onDeleteClick && (
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => {
            if (onDeleteClick) onDeleteClick();
          }}
        >
          <Trash color="#E5363D" />
        </Button>
      )}
    </div>
  );
};
