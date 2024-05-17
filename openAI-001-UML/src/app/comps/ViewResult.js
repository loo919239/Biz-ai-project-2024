"use client";

import { Fleur_De_Leah } from "next/font/google";
import { useCallback } from "react";
import Mermaid from "../modules/Mermaud";
import mermaid from "mermaid";

const ViewResultPage = ({ resultText }) => {
  // 문자열 결과를 보기 좋게 편집하기
  const textToHtml = useCallback((text) => {
    const textList = text.split("\n");
    let flag = false;
    const result = textList.map((t) => {
      if (!flag && t.trim().startsWith("```")) {
        flag = true;
        return `<pre class="mermaid_code">`;
      } else if (flag && t.trim().startsWith("```")) {
        flag = false;
        return "</pre>";
      } else if (flag) {
        return `${t}\n`;
      }
      return `${t}<br/>`;
    });
    return result.join("");
  });

  const getMermaid = useCallback((text) => {
    const textList = text.split("\n");
    let flag = false;
    const result = textList.map((t) => {
      if (t.trim().startsWith("```mermaide")) {
        flag = true;
        return "";
      } else if (flag && t.trim().startsWith("```")) {
        flag = false;
        return "\n\n";
      } else if (flag) {
        return `${t}\n`;
      } else {
        return "\n";
      }
    });
    return result.join("\n");
  });

  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: textToHtml(resultText) }}
      ></div>
      {resultText?.includes("```mermaid") && (
        <Mermaid chart={getMermaid(resultText)} />
      )}
    </>
  );
};

export default ViewResultPage;
