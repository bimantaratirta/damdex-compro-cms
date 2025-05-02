import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ReactNode } from "react";

export const HoverTip = ({ children, content }: { children: ReactNode; content: string }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent className="text-pretty break-words">
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  );
};
