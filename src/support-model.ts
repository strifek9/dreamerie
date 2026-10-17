// Public support inbox confirmed by the owner on 2026-10-17.
export const SUPPORT_EMAIL: string = 'looknookgames@gmail.com';
export const GAME_NAME = 'Dreamerie';
export function reportTemplate(version = ''): string {
 return [GAME_NAME + (version ? ' - Build ' + version : ''), '', 'What happened:', '', 'Expected behavior (optional):', '', 'Steps to reproduce (optional):', '1. ', '', 'Browser / device (optional):', '', 'Dream / day (optional):', '', 'Please leave out passwords and room invite links.'].join('\n');
}
export function composeUrl(address: string, body: string): string | null {
 if (!/^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(address)) return null;
 return 'mailto:' + address + '?subject=' + encodeURIComponent(GAME_NAME + ' - Report a problem') + '&body=' + encodeURIComponent(body);
}
