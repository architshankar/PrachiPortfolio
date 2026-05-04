import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, Heading1, Heading2, Heading3, List, ListOrdered, Quote, Link as LinkIcon, Image as ImageIcon, Undo, Redo } from "lucide-react";
import { useEffect } from "react";

export function RichEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: "noreferrer", target: "_blank" } }),
      Image,
      Placeholder.configure({ placeholder: "Write your essay…" }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: { attributes: { class: "editor-content text-navy max-w-none" } },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) editor.commands.setContent(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  if (!editor) return null;

  const Btn = ({ onClick, active, children }: { onClick: () => void; active?: boolean; children: React.ReactNode }) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded transition ${active ? "bg-navy text-cream" : "hover:bg-navy/10 text-navy"}`}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-navy/20 bg-cream">
      <div className="flex flex-wrap gap-1 border-b border-navy/15 p-2 bg-cream-soft sticky top-0 z-10">
        <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}><Bold size={16} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}><Italic size={16} /></Btn>
        <span className="w-px bg-navy/15 mx-1" />
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })}><Heading1 size={16} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}><Heading2 size={16} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })}><Heading3 size={16} /></Btn>
        <span className="w-px bg-navy/15 mx-1" />
        <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}><List size={16} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}><ListOrdered size={16} /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}><Quote size={16} /></Btn>
        <span className="w-px bg-navy/15 mx-1" />
        <Btn
          onClick={() => {
            const url = window.prompt("Link URL");
            if (url) editor.chain().focus().setLink({ href: url }).run();
            else editor.chain().focus().unsetLink().run();
          }}
          active={editor.isActive("link")}
        ><LinkIcon size={16} /></Btn>
        <Btn
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = () => {
              const file = input.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => editor.chain().focus().setImage({ src: reader.result as string }).run();
              reader.readAsDataURL(file);
            };
            input.click();
          }}
        ><ImageIcon size={16} /></Btn>
        <span className="w-px bg-navy/15 mx-1" />
        <Btn onClick={() => editor.chain().focus().undo().run()}><Undo size={16} /></Btn>
        <Btn onClick={() => editor.chain().focus().redo().run()}><Redo size={16} /></Btn>
      </div>
      <div className="p-6 min-h-[400px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
