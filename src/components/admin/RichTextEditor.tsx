import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Bold, Italic, List, ListOrdered, Heading2, Quote, Link as LinkIcon, Image as ImgIcon, Undo, Redo } from "lucide-react";
import { uploadCmsFile } from "@/lib/cmsUpload";
import { toast } from "sonner";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

const RichTextEditor = ({ value, onChange }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-primary underline" } }),
      Image,
    ],
    content: value || "<p></p>",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none min-h-[300px] p-4 focus:outline-none",
      },
    },
  });

  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt("URL");
    if (!url) return;
    editor.chain().focus().setLink({ href: url }).run();
  };
  const addImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const url = await uploadCmsFile(file, "content");
        editor.chain().focus().setImage({ src: url }).run();
      } catch (e: any) {
        toast.error(e.message ?? "Upload failed");
      }
    };
    input.click();
  };

  const Btn = ({ onClick, active, children }: any) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-1.5 rounded hover:bg-muted ${active ? "bg-muted text-primary" : "text-secondary/70"}`}
    >
      {children}
    </button>
  );

  return (
    <div className="border rounded-md bg-background">
      <div className="flex items-center gap-1 border-b p-2 flex-wrap">
        <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}><Bold className="w-4 h-4" /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}><Italic className="w-4 h-4" /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}><Heading2 className="w-4 h-4" /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}><List className="w-4 h-4" /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}><ListOrdered className="w-4 h-4" /></Btn>
        <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}><Quote className="w-4 h-4" /></Btn>
        <Btn onClick={addLink} active={editor.isActive("link")}><LinkIcon className="w-4 h-4" /></Btn>
        <Btn onClick={addImage}><ImgIcon className="w-4 h-4" /></Btn>
        <div className="w-px h-5 bg-border mx-1" />
        <Btn onClick={() => editor.chain().focus().undo().run()}><Undo className="w-4 h-4" /></Btn>
        <Btn onClick={() => editor.chain().focus().redo().run()}><Redo className="w-4 h-4" /></Btn>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
