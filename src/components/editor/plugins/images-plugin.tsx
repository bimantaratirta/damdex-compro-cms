"use client";

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useEffect, useRef, useState, JSX } from "react";
import * as React from "react";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $wrapNodeInElement, mergeRegister } from "@lexical/utils";
import {
  $createParagraphNode,
  $getSelection,
  $insertNodes,
  $isNodeSelection,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_NORMAL,
  LexicalCommand,
  LexicalEditor,
  createCommand,
} from "lexical";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { $createImageNode, $isImageNode, ImageNode, ImagePayload } from "@/components/editor/nodes/image-node";
import { CAN_USE_DOM } from "@/components/editor/shared/can-use-dom";
import { uploadImage } from "@/repositories/storage";
import { toast } from "sonner";

export type InsertImagePayload = Readonly<ImagePayload>;

const getDOMSelection = (targetWindow: Window | null): Selection | null =>
  CAN_USE_DOM ? (targetWindow || window).getSelection() : null;

// export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> = createCommand("INSERT_IMAGE_COMMAND");
export const INSERT_IMAGE_COMMAND: LexicalCommand<{
  src: string;
  altText: string;
  width: number;
  height: number;
}> = createCommand("INSERT_IMAGE_COMMAND");

export function InsertImageUploadedDialogBody({ onClick }: { onClick: (src: FileList) => void }) {
  const [src, setSrc] = useState<FileList | undefined>(undefined);
  const [altText, setAltText] = useState("");

  const isDisabled = src === undefined;

  const loadImage = (files: FileList | null) => {
    if (files && files !== null) {
      setSrc(files);
    }
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="image-upload">Image Upload</Label>
        <Input
          id="image-upload"
          type="file"
          onChange={(e) => loadImage(e.target.files)}
          accept="image/*"
          data-test-id="image-modal-file-upload"
        />
      </div>
      <Button
        type="submit"
        disabled={isDisabled}
        onClick={() => {
          if (src !== undefined) onClick(src);
        }}
        data-test-id="image-modal-file-upload-btn"
      >
        Confirm
      </Button>
    </div>
  );
}

export function InsertImageDialog({
  activeEditor,
  onClose,
}: {
  activeEditor: LexicalEditor;
  onClose: () => void;
}): JSX.Element {
  const hasModifier = useRef(false);
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    hasModifier.current = false;
    const unregister = editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      (payload) => {
        const { src, altText, width, height } = payload;
        editor.update(() => {
          const imageNode = $createImageNode({ src: src, altText: altText, width: width, height: height });
          $insertNodes([imageNode]);
        });
        return true;
      },
      COMMAND_PRIORITY_NORMAL
    );

    return () => unregister();
  }, [activeEditor]);

  const handleFileChange = async (src: FileList) => {
    toast.success("proses upload gambar sedang berjalan, mohon tunggu");
    const files = src;
    if (files && files[0]) {
      const file = files[0];

      const imageData = new FormData();
      imageData.append("image", file);
      try {
        const data = await uploadImage(imageData);

        // Buat URL publik untuk gambar (sesuaikan dengan struktur S3 Anda)
        const imageUrl = data.data.publicUrl;

        // Sisipkan gambar ke editor
        editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
          src: imageUrl,
          altText: file.name,
          width: 500, // Sesuaikan dengan kebutuhan
          height: 300, // Sesuaikan dengan kebutuhan
        });

        toast.success("Gambar berhasil diupload");
        onClose();
      } catch (error) {
        toast.error("Gambar gagal diupload");
      }
    }
  };
  return (
    <Tabs defaultValue="file">
      <TabsList className="w-full">
        <TabsTrigger
          value="file"
          className="w-full"
        >
          File
        </TabsTrigger>
      </TabsList>
      <TabsContent value="file">
        <InsertImageUploadedDialogBody onClick={handleFileChange} />
      </TabsContent>
    </Tabs>
  );
}

export function ImagesPlugin({ captionsEnabled }: { captionsEnabled?: boolean }): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error("ImagesPlugin: ImageNode not registered on editor");
    }

    return mergeRegister(
      editor.registerCommand<InsertImagePayload>(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          const imageNode = $createImageNode(payload);
          $insertNodes([imageNode]);
          if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
          }

          return true;
        },
        COMMAND_PRIORITY_EDITOR
      )
    );
  }, [captionsEnabled, editor]);

  return null;
}

function $getImageNodeInSelection(): ImageNode | null {
  const selection = $getSelection();
  if (!$isNodeSelection(selection)) {
    return null;
  }
  const nodes = selection.getNodes();
  const node = nodes[0];
  return $isImageNode(node) ? node : null;
}

declare global {
  interface DragEvent {
    rangeOffset?: number;
    rangeParent?: Node;
  }
}
