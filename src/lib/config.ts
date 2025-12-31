import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import type { Profile, DotfilesConfig } from "./types";

const configDir = path.join(process.cwd(), "config");

export function getProfile(): Profile {
  const filePath = path.join(configDir, "profile.yaml");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return yaml.load(fileContents) as Profile;
}

export function getDotfilesConfig(): DotfilesConfig {
  const filePath = path.join(configDir, "dotfiles.yaml");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return yaml.load(fileContents) as DotfilesConfig;
}
