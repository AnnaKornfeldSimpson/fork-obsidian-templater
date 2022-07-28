import { Notice } from "obsidian";
import { TemplaterError } from "./Error";

export function log_update(msg: string): void {
    const notice = new Notice("", 15000);
    notice.setMessage(`Templater update:\n${msg}`);
}

export function log_error(e: Error | TemplaterError): void {
    const notice = new Notice("", 8000);
    if (e instanceof TemplaterError && e.console_msg) {
        notice.setMessage(
            `Templater error:\n${e.message}\nCheck the console for more information.`
        );
        console.error(`Templater Error:`, e.message, "\n", e.console_msg);
    } else {
        notice.setMessage(`Templater Error:\n${e.message}`);
    }
}
