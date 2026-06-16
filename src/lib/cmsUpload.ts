import { supabase } from "@/integrations/supabase/client";
import { storagePathFromPublicUrl } from "@/lib/versionedImage";

export async function uploadCmsFile(file: File, folder = "uploads", _previousUrl?: string | null): Promise<string> {
  const ext = file.name.split(".").pop() ?? "bin";
  const name = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from("cms-media").upload(name, file, {
    cacheControl: "60",
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("cms-media").getPublicUrl(name);
  return data.publicUrl;
}

export async function deleteCmsFile(url?: string | null) {
  const path = storagePathFromPublicUrl(url);
  if (!path) return;
  await supabase.storage.from("cms-media").remove([path]);
}
