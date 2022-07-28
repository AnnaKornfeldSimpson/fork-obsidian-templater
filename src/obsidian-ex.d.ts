import "obsidian";
import { Plugin } from "obsidian";

declare module "obsidian" {
    interface Editor {
        cm: CodeMirror.Editor;
    }

    interface FileManager {
        createNewMarkdownFile: (
            folder: string,
            filename: string
        ) => Promise<void>;
    }

    interface Notice {
        noticeEl: HTMLElement;
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

    export interface App {
        commands: { removeCommand(id: string): void };
        internalPlugins: InternalPlugins;
        plugins: CommunityPlugins;
        setting: FullSettings;
        viewRegistry: ViewRegistry;
    }
    export interface InstalledPlugin {
        enabled: boolean;
        instance: PluginInstance;
        load(): void;
        unload(): void;
    }

    export interface InternalPlugins {
        plugins: Record<string, InstalledPlugin>;
        getPluginById(id: string): InstalledPlugin;
    }

    export interface CommunityPlugins {
        plugins: Record<string, Plugin>;
        getPlugin(name: string): Plugin;
    }

    export interface FullSettings {
        activeTab: SettingTab;
        openTabById(id: string): void;
    }

    export interface SearchComponent
        extends AbstractTextComponent<HTMLInputElement> {
        containerEl: HTMLElement;
    }

    export interface HotKeysSettingsTab extends SettingTab {
        searchInputEl: HTMLInputElement;
        updateHotkeyVisibility(): void;
    }
}
