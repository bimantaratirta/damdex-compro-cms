import * as React from "react";
import { Suspense, useCallback, useEffect, useRef, useState, JSX } from "react";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { LexicalNestedComposer } from "@lexical/react/LexicalNestedComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { useLexicalEditable } from "@lexical/react/useLexicalEditable";
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection";
import { mergeRegister } from "@lexical/utils";
import type { BaseSelection, LexicalEditor, NodeKey } from "lexical";
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  $setSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  DRAGSTART_COMMAND,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  KEY_ENTER_COMMAND,
  KEY_ESCAPE_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEditorModal } from "../editor-hooks/use-modal";
import type { Position } from "../nodes/inline-image-node";
import { $isInlineImageNode, InlineImageNode } from "../nodes/inline-image-node";
import { LinkPlugin } from "../plugins/link-plugin";
import { ContentEditable } from "./content-editable";
import { $isImageNode } from "../nodes/image-node";
import { ImageResizer } from "./image-resizer";

const imageCache = new Set();

function useSuspenseImage(src: string) {
  if (!imageCache.has(src)) {
    throw new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imageCache.add(src);
        resolve(null);
      };
      img.onerror = () => {
        imageCache.add(src);
      };
    });
  }
}

function LazyImage({
  altText,
  className,
  imageRef,
  src,
  width,
  height,
  position,
  maxWidth,
  onError,
}: {
  altText: string;
  className: string | null;
  height: "inherit" | number;
  imageRef: { current: null | HTMLImageElement };
  src: string;
  width: "inherit" | number;
  position: Position;
  onError: () => void;
  maxWidth: number;
}): JSX.Element {
  useSuspenseImage(src);
  return (
    <img
      className={className || undefined}
      src={src}
      alt={altText}
      ref={imageRef}
      data-position={position}
      style={{
        display: "block",
        height,
        width,
        maxWidth,
      }}
      onError={onError}
      draggable="false"
    />
  );
}

function BrokenImage(): JSX.Element {
  return (
    <img
      src={""}
      style={{
        height: 200,
        opacity: 0.2,
        width: 200,
      }}
      draggable="false"
      alt="broken-image"
    />
  );
}

export function UpdateInlineImageDialog({
  activeEditor,
  nodeKey,
  onClose,
}: {
  activeEditor: LexicalEditor;
  nodeKey: NodeKey;
  onClose: () => void;
}): JSX.Element {
  const editorState = activeEditor.getEditorState();
  const node = editorState.read(() => $getNodeByKey(nodeKey) as InlineImageNode);
  const [altText, setAltText] = useState(node.getAltText());
  const [showCaption, setShowCaption] = useState(node.getShowCaption());
  const [position, setPosition] = useState<Position>(node.getPosition());

  // const handleShowCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setShowCaption(e.target.checked);
  // };

  // const handlePositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setPosition(e.target.value as Position);
  // };

  const handleOnConfirm = () => {
    const payload = { altText, position, showCaption };
    if (node) {
      activeEditor.update(() => {
        node.update(payload);
      });
    }
    onClose();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="alt-text">Alt Text</Label>
        <Input
          id="alt-text"
          placeholder="Descriptive alternative text"
          onChange={(e) => setAltText(e.target.value)}
          value={altText}
          data-test-id="image-modal-alt-text-input"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="position-select">Position</Label>
        <Select
          value={position}
          onValueChange={(value) => setPosition(value as Position)}
        >
          <SelectTrigger id="position-select">
            <SelectValue placeholder="Select position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* <div className="flex items-center space-x-2">
        <Checkbox
          id="caption"
          checked={showCaption}
          onCheckedChange={(checked) => setShowCaption(checked as boolean)}
        />
        <Label htmlFor="caption">Show Caption</Label>
      </div> */}

      <DialogFooter>
        <Button
          data-test-id="image-modal-file-upload-btn"
          onClick={handleOnConfirm}
        >
          Confirm
        </Button>
      </DialogFooter>
    </div>
  );
}

export default function InlineImageComponent({
  src,
  altText,
  nodeKey,
  width,
  height,
  showCaption,
  caption,
  position,
  resizable,
  maxWidth,
  captionsEnabled,
}: {
  altText: string;
  caption: LexicalEditor;
  height: "inherit" | number;
  nodeKey: NodeKey;
  showCaption: boolean;
  src: string;
  width: "inherit" | number;
  position: Position;
  resizable: boolean;
  maxWidth: number;
  captionsEnabled: boolean;
}): JSX.Element {
  const [modal, showModal] = useEditorModal();
  const imageRef = useRef<null | HTMLImageElement>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(nodeKey);
  const [editor] = useLexicalComposerContext();
  const [selection, setSelection] = useState<BaseSelection | null>(null);
  const activeEditorRef = useRef<LexicalEditor | null>(null);
  const isEditable = useLexicalEditable();
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [isLoadError, setIsLoadError] = useState<boolean>(false);

  const $onDelete = useCallback(
    (payload: KeyboardEvent) => {
      const deleteSelection = $getSelection();
      if (isSelected && $isNodeSelection(deleteSelection)) {
        const event: KeyboardEvent = payload;
        event.preventDefault();
        if (isSelected && $isNodeSelection(deleteSelection)) {
          editor.update(() => {
            deleteSelection.getNodes().forEach((node) => {
              if ($isInlineImageNode(node)) {
                node.remove();
              }
            });
          });
        }
      }
      return false;
    },
    [editor, isSelected]
  );

  const $onEnter = useCallback(
    (event: KeyboardEvent) => {
      const latestSelection = $getSelection();
      const buttonElem = buttonRef.current;
      if (isSelected && $isNodeSelection(latestSelection) && latestSelection.getNodes().length === 1) {
        if (showCaption) {
          // Move focus into nested editor
          $setSelection(null);
          event.preventDefault();
          caption.focus();
          return true;
        } else if (buttonElem !== null && buttonElem !== document.activeElement) {
          event.preventDefault();
          buttonElem.focus();
          return true;
        }
      }
      return false;
    },
    [caption, isSelected, showCaption]
  );

  const $onEscape = useCallback(
    (event: KeyboardEvent) => {
      if (activeEditorRef.current === caption || buttonRef.current === event.target) {
        $setSelection(null);
        editor.update(() => {
          setSelected(true);
          const parentRootElement = editor.getRootElement();
          if (parentRootElement !== null) {
            parentRootElement.focus();
          }
        });
        return true;
      }
      return false;
    },
    [caption, editor, setSelected]
  );

  const setShowCaption = () => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if ($isImageNode(node)) {
        node.setShowCaption(true);
      }
    });
  };

  const onResizeEnd = (nextWidth: "inherit" | number, nextHeight: "inherit" | number) => {
    // Delay hiding the resize bars for click case
    setTimeout(() => {
      setIsResizing(false);
    }, 200);

    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if ($isImageNode(node)) {
        node.setWidthAndHeight(nextWidth, nextHeight);
      }
    });
  };

  const onResizeStart = () => {
    setIsResizing(true);
  };

  useEffect(() => {
    let isMounted = true;
    const unregister = mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        if (isMounted) {
          setSelection(editorState.read(() => $getSelection()));
        }
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_, activeEditor) => {
          activeEditorRef.current = activeEditor;
          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand<MouseEvent>(
        CLICK_COMMAND,
        (payload) => {
          const event = payload;
          if (isResizing) {
            return true;
          }
          if (event.target === imageRef.current) {
            if (event.shiftKey) {
              setSelected(!isSelected);
            } else {
              clearSelection();
              setSelected(true);
            }
            return true;
          }

          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        DRAGSTART_COMMAND,
        (event) => {
          if (event.target === imageRef.current) {
            // TODO This is just a temporary workaround for FF to behave like other browsers.
            // Ideally, this handles drag & drop too (and all browsers).
            event.preventDefault();
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(KEY_DELETE_COMMAND, $onDelete, COMMAND_PRIORITY_LOW),
      editor.registerCommand(KEY_BACKSPACE_COMMAND, $onDelete, COMMAND_PRIORITY_LOW),
      editor.registerCommand(KEY_ENTER_COMMAND, $onEnter, COMMAND_PRIORITY_LOW),
      editor.registerCommand(KEY_ESCAPE_COMMAND, $onEscape, COMMAND_PRIORITY_LOW)
    );
    return () => {
      isMounted = false;
      unregister();
    };
  }, [clearSelection, editor, isSelected, nodeKey, $onDelete, $onEnter, $onEscape, setSelected, isResizing]);

  const draggable = isSelected && $isNodeSelection(selection) && !isResizing;
  const isFocused = (isSelected || isResizing) && isEditable;
  return (
    <Suspense fallback={null}>
      <>
        <div draggable={draggable}>
          {isLoadError ? (
            <BrokenImage />
          ) : (
            <>
              <LazyImage
                className={`max-w-full cursor-default ${
                  isFocused
                    ? `${
                        $isNodeSelection(selection) ? "draggable cursor-grab active:cursor-grabbing" : ""
                      } focused ring-2 ring-primary ring-offset-2`
                    : null
                }`}
                src={src}
                altText={altText}
                imageRef={imageRef}
                width={width}
                position={position}
                height={height}
                maxWidth={maxWidth}
                onError={() => setIsLoadError(true)}
              />
            </>
          )}
        </div>

        {showCaption && (
          <div className="image-caption-container absolute bottom-1 left-0 right-0 m-0 block min-w-[100px] overflow-hidden border-t bg-white/90 p-0">
            <LexicalNestedComposer initialEditor={caption}>
              <AutoFocusPlugin />
              <LinkPlugin />
              <RichTextPlugin
                contentEditable={
                  <ContentEditable
                    placeholder="Enter a caption..."
                    className="ImageNode__contentEditable user-select-text word-break-break-word relative block min-h-5 w-[calc(100%-20px)] cursor-text resize-none whitespace-pre-wrap border-0 p-2.5 text-sm caret-primary outline-none"
                    placeholderClassName="ImageNode__placeholder text-sm text-muted-foreground overflow-hidden absolute top-2.5 left-2.5 pointer-events-none text-ellipsis user-select-none whitespace-nowrap inline-block"
                  />
                }
                ErrorBoundary={LexicalErrorBoundary}
              />
            </LexicalNestedComposer>
          </div>
        )}
        {resizable && $isNodeSelection(selection) && isFocused && (
          <ImageResizer
            showCaption={showCaption}
            setShowCaption={setShowCaption}
            editor={editor}
            buttonRef={buttonRef}
            imageRef={imageRef}
            maxWidth={maxWidth}
            onResizeStart={onResizeStart}
            onResizeEnd={onResizeEnd}
            captionsEnabled={!isLoadError && captionsEnabled}
          />
        )}
      </>
      {modal}
    </Suspense>
  );
}
