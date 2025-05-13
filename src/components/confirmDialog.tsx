import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React from "react";
import { Button } from "./ui/button";

type ConfirmDialogProps = {
  title: string;
  description?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onConfirmClick?: () => void;
  triggerClassName?: string;
  loading?: boolean;
  open: boolean;
  setOpen: () => void;
};

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  description,
  cancelLabel,
  confirmLabel,
  onConfirmClick,
  open,
  setOpen,
}) => {
  return (
    <AlertDialog
      open={open}
      onOpenChange={setOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
          <Button
            onClick={() => {
              if (onConfirmClick) onConfirmClick();
            }}
            variant={"destructive"}
          >
            {confirmLabel}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
