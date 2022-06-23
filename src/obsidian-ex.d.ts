import "obsidian";
import { Plugin } from "obsidian";

declare module "obsidian" {
  export interface SearchComponent extends AbstractTextComponent<HTMLInputElement> {
    containerEl: HTMLElement;
  }

  interface Editor {
    cm: CodeMirror.Editor;
  }

  interface FileManager {
    createNewMarkdownFile: (folder: string, filename: string) => Promise<void>;
  }

  interface VaultSettings {
    foldHeading: boolean;
    foldIndent: boolean;
    legacyEditor: boolean;
    newFileLocation: string;
    readableLineLength: boolean;
    rightToLeft: boolean;
    showFrontmatter: boolean;
    tabSize: number;
  }

  interface Vault {
    config: Record<string, unknown>;
    getConfig<T extends keyof VaultSettings>(setting: T): VaultSettings[T];
  }

  export interface PluginInstance {
    id: string;
  }
  export interface ViewRegistry {
    viewByType: Record<string, (leaf: WorkspaceLeaf) => unknown>;
    isExtensionRegistered(extension: string): boolean;
  }

  export interface CommandRegistry {
    removeCommand(id: string): void;
  }

  export interface SettingRegistry {
    activeTab: SettingTab;
    openTabById(id: string): void;
  }

  export interface SettingTab {
    searchInputEl: HTMLInputElement;
    updateHotkeyVisibility(): void;
  }

  export interface PluginRegistry {
    getPlugin(id: string): Plugin | undefined;
    plugins: Record<string, Plugin>;
  }

  export interface App {
    commands: CommandRegistry;
    internalPlugins: InternalPlugins;

    plugins: PluginRegistry;

    setting: SettingRegistry;
    viewRegistry: ViewRegistry;
  }
  export interface InstalledPlugin {
    enabled: boolean;
    instance: PluginInstance;
  }

  export interface InternalPlugins {
    plugins: Record<string, InstalledPlugin>;
    getPluginById(id: string): InstalledPlugin;
  }
}
