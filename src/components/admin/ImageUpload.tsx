import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { uploadCmsFile } from "@/lib/cmsUpload";
import { toast } from "sonner";

interface Props {
  value?: string | null;
  onChange: (url: string | null) => void;
  folder?: string;
  label?: string;
}

const ImageUpload = ({ value, onChange, folder, label = "Image" }: Props) => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const url = await uploadCmsFile(file, folder, value);
      onChange(url);
    } catch (err: any) {
      toast.error(err.message ?? "Upload failed");
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <div className="text-xs font-medium text-secondary/70 mb-2">{label}</div>
      <div className="flex items-start gap-4">
        {value && (
          <div className="relative">
            <img src={value} alt="" className="w-28 h-28 object-cover rounded-md border" />
            <button
              type="button"
              onClick={() => onChange(null)}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border shadow grid place-items-center"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
        <label className="flex flex-col items-center justify-center w-28 h-28 border-2 border-dashed rounded-md cursor-pointer hover:bg-muted/50 text-secondary/60 text-xs gap-2">
          <Upload className="w-5 h-5" />
          {loading ? "Uploading…" : "Upload"}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
            disabled={loading}
          />
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
