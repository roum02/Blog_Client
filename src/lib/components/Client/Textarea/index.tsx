"use client";

import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";

import dynamic from "next/dynamic";
import { useState } from "react";

const FroalaEditor = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
});

export default function Textarea() {
  const [content, setContent] = useState("");

  const handleModelChange = (newContent: string) => {
    setContent(newContent); // 사용자가 입력한 HTML 저장
  };

  return (
    <>
      <FroalaEditor
        model={content}
        onModelChange={setContent}
        config={{
          placeholderText: "Write something amazing...",
        }}
      />
      {/* <div className="mt-6">
        <h2 className="font-bold mb-2">Preview:</h2>
        <div
          className="border p-4"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div> */}
    </>
  );
}
