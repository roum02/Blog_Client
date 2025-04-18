"use client";

import { Controller, useFormContext } from "react-hook-form";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";

import dynamic from "next/dynamic";

const FroalaEditor = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
});

interface TextareaProps {
  value: string;
  onChange: (val: string) => void;
}

export default function Textarea() {
  const { register, control } = useFormContext();

  return (
    <Controller
      name="content"
      control={control}
      render={({ field }) => (
        <FroalaEditor
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
