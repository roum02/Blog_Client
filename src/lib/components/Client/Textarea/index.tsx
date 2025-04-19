"use client";

import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";

import { Controller, useFormContext } from "react-hook-form";

import dynamic from "next/dynamic";

const FroalaEditorNoSSR = dynamic(
  async () => {
    if (typeof window !== "undefined") {
      await import("froala-editor/js/plugins.pkgd.min.js");
    }
    const mod = await import("react-froala-wysiwyg");
    return mod.default;
  },
  { ssr: false }
);

export default function Textarea() {
  const { register, control } = useFormContext();

  return (
    <Controller
      name="content"
      control={control}
      render={({ field }) => (
        <FroalaEditorNoSSR
          {...register("content")}
          model={field.value}
          onModelChange={field.onChange}
          config={{
            placeholderText: "Write something amazing...",
          }}
        />
      )}
    />
  );
}

{
  /* <div className="mt-6">
        <h2 className="font-bold mb-2">Preview:</h2>
        <div
          className="border p-4"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div> */
}
