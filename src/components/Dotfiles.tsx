import type { DotfilesConfig } from "@/lib/types";

interface DotfilesProps {
  config: DotfilesConfig;
}

export function Dotfiles({ config }: DotfilesProps) {
  if (!config.enabled) return null;

  return (
    <section>
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-semibold">Dotfiles</h2>
        <a
          href={config.repository}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-neutral-400 hover:text-neutral-100"
        >
          View Repository →
        </a>
      </div>

      <div className="mt-4 rounded border border-neutral-800 bg-neutral-900 p-4">
        <h3 className="text-sm font-medium text-neutral-400">Terminal Setup</h3>
        <div className="mt-2 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
          <div>
            <span className="text-neutral-500">Emulator:</span>{" "}
            <span>{config.terminal.emulator}</span>
          </div>
          <div>
            <span className="text-neutral-500">Shell:</span>{" "}
            <span>{config.terminal.shell}</span>
          </div>
          <div>
            <span className="text-neutral-500">Theme:</span>{" "}
            <span>{config.terminal.theme}</span>
          </div>
          <div>
            <span className="text-neutral-500">Font:</span>{" "}
            <span>{config.terminal.font}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {config.tools.map((tool) => (
          <div
            key={tool.name}
            className="flex items-start justify-between rounded border border-neutral-800 p-4"
          >
            <div>
              <h3 className="font-medium">{tool.name}</h3>
              <p className="mt-1 text-sm text-neutral-400">
                {tool.description}
              </p>
            </div>
            <code className="text-xs text-neutral-500">{tool.configPath}</code>
          </div>
        ))}
      </div>
    </section>
  );
}
