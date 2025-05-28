import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Eye } from "lucide-react";
import { HoverTip } from "./hoverTip";

export const ContentCard = ({
  withActions,
  onEditClick,
  onDeleteClick,
  title,
  description,
  onDetailClick,
}: {
  title: string;
  attendeesLimit?: number;
  description?: string;
  withActions?: boolean;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  onDetailClick?: () => void;
}) => {
  return (
    <Card className={`w-full border-[#000] bg-[#EFF7CF]/40`}>
      <CardContent className="flex flex-col space-y-2">
        <HoverTip content={title}>
          <p className="truncate text-xl font-semibold text-black">{title}</p>
        </HoverTip>
        <p className="line-clamp-2 text-left text-base text-[#787370]">{description}</p>
        {/* <div
          className="line-clamp-2 text-left text-base text-[#787370]"
          dangerouslySetInnerHTML={{ __html: description }}
        /> */}
      </CardContent>
      <CardFooter className="flex flex-row justify-between">
        {withActions && (
          <div className="flex flex-row space-x-1">
            {onDetailClick && (
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => {
                  onDetailClick();
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
                  onEditClick();
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
                  onDeleteClick();
                }}
              >
                <Trash color="#E5363D" />
              </Button>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
