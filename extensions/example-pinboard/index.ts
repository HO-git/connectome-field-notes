/**
 * example-pinboard: a minimal connectome-host extension.
 *
 * Registers one framework module ("pinboard") with one tool ("board") that
 * keeps a short list of pinned notes in the module's own persistent state.
 * The agent sees the tool as `pinboard--board`.
 *
 * It exists to show the mechanics (register, then module, then tool, then
 * state), not as a tested fix for any particular model. Copy it as a starting
 * point.
 *
 * Load it from a recipe:
 *
 *   "extensions": {
 *     "pinboard": {
 *       "kind": "module",
 *       "path": "./path/to/extensions/example-pinboard/index.ts",
 *       "config": { "maxPins": 10 }
 *     }
 *   }
 *
 * Only type imports from @animalabs/*: they are erased at runtime, so this
 * file has no runtime dependency on any framework version.
 */

import type {
  Module,
  ModuleContext,
  ProcessEvent,
  ProcessState,
  EventResponse,
  ToolDefinition,
  ToolCall,
  ToolResult,
} from '@animalabs/agent-framework';

// The host's side of the contract (connectome-host src/extensions.ts),
// declared here so this file needs nothing from the host package. Only the
// parts this extension uses are listed.
interface ModuleFactoryContext {
  timeZone: string;
  storePath: string;
  model: string;
  config: Record<string, unknown>;
}

interface ExtensionApi {
  registerModule(factory: (ctx: ModuleFactoryContext) => Module): void;
}

interface PinboardState {
  pins: string[];
}

const DEFAULT_MAX_PINS = 10;
const MAX_PIN_LENGTH = 500;

class PinboardModule implements Module {
  readonly name = 'pinboard';

  private ctx: ModuleContext | null = null;
  private pins: string[] = [];

  constructor(private readonly maxPins: number) {}

  async start(ctx: ModuleContext): Promise<void> {
    this.ctx = ctx;
    this.pins = ctx.getState<PinboardState>()?.pins ?? [];
  }

  async stop(): Promise<void> {
    this.ctx = null;
  }

  async onProcess(_event: ProcessEvent, _state: ProcessState): Promise<EventResponse> {
    return {};
  }

  getTools(): ToolDefinition[] {
    return [
      {
        name: 'board',
        description:
          `A small pinboard that persists across turns. ` +
          `action "list" shows the pins; "pin" adds one (text required); ` +
          `"unpin" removes one by its number from "list". Holds at most ${this.maxPins} pins.`,
        inputSchema: {
          type: 'object',
          properties: {
            action: { type: 'string', enum: ['list', 'pin', 'unpin'] },
            text: { type: 'string', description: 'For "pin": the note to pin.' },
            number: { type: 'integer', description: 'For "unpin": the pin number shown by "list".' },
          },
          required: ['action'],
        },
      },
    ];
  }

  async handleToolCall(call: ToolCall): Promise<ToolResult> {
    // call.name arrives without the module prefix.
    if (call.name !== 'board') {
      return { success: false, isError: true, error: `Unknown tool: ${call.name}` };
    }
    const input = (call.input ?? {}) as { action?: unknown; text?: unknown; number?: unknown };

    switch (input.action) {
      case 'list':
        return { success: true, data: this.listing() };

      case 'pin': {
        const text = typeof input.text === 'string' ? input.text.trim() : '';
        if (!text) return this.fail('"pin" needs non-empty text.');
        if (text.length > MAX_PIN_LENGTH) return this.fail(`Pins are limited to ${MAX_PIN_LENGTH} characters.`);
        if (this.pins.length >= this.maxPins) {
          return this.fail(`The board is full (${this.maxPins} pins). Unpin something first.`);
        }
        this.pins = [...this.pins, text];
        this.save();
        return { success: true, data: this.listing() };
      }

      case 'unpin': {
        const n = input.number;
        if (this.pins.length === 0) return this.fail('The board is empty; nothing to unpin.');
        if (typeof n !== 'number' || !Number.isInteger(n) || n < 1 || n > this.pins.length) {
          return this.fail(`"unpin" needs a pin number between 1 and ${this.pins.length}.`);
        }
        this.pins = this.pins.filter((_, i) => i !== n - 1);
        this.save();
        return { success: true, data: this.listing() };
      }

      default:
        return this.fail('action must be "list", "pin" or "unpin".');
    }
  }

  private listing(): string {
    if (this.pins.length === 0) return 'The board is empty.';
    return this.pins.map((p, i) => `${i + 1}. ${p}`).join('\n');
  }

  private save(): void {
    // Small, capped state, so a full setState per change is fine.
    this.ctx?.setState<PinboardState>({ pins: this.pins });
  }

  private fail(error: string): ToolResult {
    return { success: false, isError: true, error };
  }
}

export function register(api: ExtensionApi, config: Record<string, unknown>): void {
  const raw = config.maxPins;
  const maxPins =
    typeof raw === 'number' && Number.isInteger(raw) && raw > 0 ? raw : DEFAULT_MAX_PINS;
  api.registerModule(() => new PinboardModule(maxPins));
}
