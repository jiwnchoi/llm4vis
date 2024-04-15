import { IMessageWithRef } from "@shared/types";
import { cloneDeep } from "lodash-es";
import { TopLevelUnitSpec } from "vega-lite/build/src/spec/unit";

export function parseVegaLite(
  content: string,
  size: number,
): TopLevelUnitSpec<string> {
  let spec;
  try {
    if (content.includes("```")) {
      spec = JSON.parse(content.split("```")[0]);
    } else {
      spec = JSON.parse(content);
    }
  } catch (e) {
    spec = {};
  }
  if (spec.data && spec.data.url) {
    spec.data = { name: spec.data.url };
  }
  spec.width = size;
  spec.height = size;
  spec.config = {
    background: "transparent",
    autosize: { type: "fit", contains: "padding" },
    legend: { orient: "bottom" },
  };
  return spec;
}

export function stringfyVegaLite(spec: TopLevelUnitSpec<string>) {
  const newSpec = cloneDeep(spec);
  if (newSpec.data && newSpec.data.name) {
    newSpec.data = { url: newSpec.data.name };
  }
  delete newSpec.width;
  delete newSpec.height;
  delete newSpec.config;
  return JSON.stringify(newSpec, null, 2);
}

export const isCodeVegaLite = (m: IMessageWithRef) =>
  m.type === "code" &&
  m.format === "json" &&
  m.content.trim().endsWith("}") &&
  m.content.includes("$schema");
