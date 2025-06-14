"use client";
import { useEffect, useState } from "react";
import { ListNode, ListItemNode } from "@lexical/list";
import { ParagraphNode, TextNode, $getRoot, LexicalEditor } from "lexical";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { InitialConfigType, LexicalComposer } from "@lexical/react/LexicalComposer";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TooltipProvider } from "@/components/ui/tooltip";
import { editorTheme } from "@/components/editor/themes/editor-theme";
import { ContentEditable } from "@/components/editor/editor-ui/content-editable";
import { ToolbarPlugin } from "@/components/editor/plugins/toolbar/toolbar-plugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { HistoryToolbarPlugin } from "@/components/editor/plugins/toolbar/history-toolbar-plugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { BlockFormatDropDown } from "./editor/plugins/toolbar/block-format-toolbar-plugin";
import { FormatParagraph } from "@/components/editor/plugins/toolbar/block-format/format-paragraph";
import { FormatHeading } from "@/components/editor/plugins/toolbar/block-format/format-heading";
import { FormatBulletedList } from "./editor/plugins/toolbar/block-format/format-bulleted-list";
import { FormatNumberedList } from "@/components/editor/plugins/toolbar/block-format/format-numbered-list";
import { FormatCheckList } from "@/components/editor/plugins/toolbar/block-format/format-check-list";
import { FormatQuote } from "@/components/editor/plugins/toolbar/block-format/format-quote";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { FontFamilyToolbarPlugin } from "./editor/plugins/toolbar/font-family-toolbar-plugin";
import { FontFormatToolbarPlugin } from "./editor/plugins/toolbar/font-format-toolbar-plugin";
import { SubSuperToolbarPlugin } from "./editor/plugins/toolbar/subsuper-toolbar-plugin";
import { ElementFormatToolbarPlugin } from "./editor/plugins/toolbar/element-format-toolbar-plugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { InsertImage } from "./editor/plugins/toolbar/block-insert/insert-image";
import { ImagesPlugin } from "./editor/plugins/images-plugin";
import { ImageNode } from "./editor/nodes/image-node";
import { BlockInsertPlugin } from "./editor/plugins/toolbar/block-insert-plugin";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Control } from "react-hook-form";
import { InsertInlineImage } from "./editor/plugins/toolbar/block-insert/insert-inline-image";
import { InlineImageNode } from "@/components/editor/nodes/inline-image-node";
import { InlineImagePlugin } from "@/components/editor/plugins/inline-image-plugin";
import { LinkNode } from "@lexical/link";

export const HtmlPlugin = ({ onHtmlChanged }: { onHtmlChanged: (html: string) => void }) => {
  const [editor] = useLexicalComposerContext();

  return (
    <OnChangePlugin
      onChange={(editorState) => {
        editorState.read(() => {
          onHtmlChanged($generateHtmlFromNodes(editor));
        });
      }}
    />
  );
};

export default function LexicalDefaultValuePlugin({ value = "" }: { value?: string | null }) {
  const [editor] = useLexicalComposerContext();

  const updateHTML = (editor: LexicalEditor, value: string, clear: boolean) => {
    const root = $getRoot();
    const parser = new DOMParser();
    const dom = parser.parseFromString(value, "text/html");
    const nodes = $generateNodesFromDOM(editor, dom);
    if (clear) {
      root.clear();
    }
    root.append(...nodes);
  };

  useEffect(() => {
    if (editor && value) {
      editor.update(() => {
        updateHTML(editor, value, true);
      });
    }
  }, [value]);

  return null;
}

type TextEditorProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formControl?: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  value?: string | null;
};

export function TextEditor({ formControl, name, label, placeholder = "Isi konten disini...", value }: TextEditorProps) {
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);
  const editorConfig: InitialConfigType = {
    namespace: "Editor",
    theme: editorTheme,
    nodes: [
      HeadingNode,
      ParagraphNode,
      TextNode,
      QuoteNode,
      ListItemNode,
      ListNode,
      ImageNode,
      InlineImageNode,
      LinkNode,
    ],
    onError: (error: Error) => {
      console.error(error);
    },
  };

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem className="z-[1]">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="w-full overflow-hidden rounded-lg border bg-background shadow z-[1]">
              <LexicalComposer
                initialConfig={{
                  ...editorConfig,
                }}
              >
                <TooltipProvider>
                  <div className="relative">
                    {/* toolbar plugins */}
                    <ToolbarPlugin>
                      {({ blockType }) => (
                        <div className="vertical-align-middle sticky top-0 z-10 flex gap-2 overflow-auto border-b p-1">
                          <HistoryToolbarPlugin />
                          <BlockFormatDropDown>
                            <FormatParagraph />
                            <FormatHeading levels={["h1", "h2", "h3"]} />
                            <FormatBulletedList />
                            <FormatNumberedList />
                            {/* <FormatCheckList /> */}
                            {/* <FormatQuote /> */}
                          </BlockFormatDropDown>
                          {/* <FontFamilyToolbarPlugin /> */}
                          <FontFormatToolbarPlugin format="bold" />
                          <FontFormatToolbarPlugin format="italic" />
                          <FontFormatToolbarPlugin format="underline" />
                          <FontFormatToolbarPlugin format="strikethrough" />
                          <SubSuperToolbarPlugin />
                          <ElementFormatToolbarPlugin />
                          <BlockInsertPlugin>
                            <InsertImage />
                            <InsertInlineImage />
                          </BlockInsertPlugin>
                        </div>
                      )}
                    </ToolbarPlugin>

                    <div className="relative">
                      <RichTextPlugin
                        contentEditable={
                          <div>
                            <div ref={onRef}>
                              <ContentEditable
                                placeholder={placeholder}
                                className="ContentEditable__root relative block overflow-auto min-h-full px-8 py-4 focus:outline-none h-72"
                              />
                            </div>
                          </div>
                        }
                        ErrorBoundary={LexicalErrorBoundary}
                      />
                      <HistoryPlugin />
                      <ListPlugin />
                      <CheckListPlugin />
                      <TabIndentationPlugin />
                      <ImagesPlugin />
                      <InlineImagePlugin />
                      <LexicalDefaultValuePlugin value={value} />
                      <HtmlPlugin onHtmlChanged={(html) => field.onChange(html)} />
                      {/* rest of the plugins */}
                    </div>
                  </div>
                </TooltipProvider>
              </LexicalComposer>
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
