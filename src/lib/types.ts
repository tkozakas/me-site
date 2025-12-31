export interface Social {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Project {
  name: string;
  description: string;
  url: string;
  tech: string[];
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  location?: string;
  email?: string;
  social: Social;
  skills: string[];
  experience: Experience[];
  projects: Project[];
}

export interface DotfileTool {
  name: string;
  icon: string;
  description: string;
  configPath: string;
}

export interface Terminal {
  emulator: string;
  shell: string;
  theme: string;
  font: string;
}

export interface DotfilesConfig {
  enabled: boolean;
  repository: string;
  tools: DotfileTool[];
  terminal: Terminal;
}
