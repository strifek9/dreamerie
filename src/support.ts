import { SUPPORT_EMAIL, reportTemplate, composeUrl } from './support-model.ts';
import './support.css';
export function installSupport(host: HTMLElement, version = ''): () => void {
 const entry = document.createElement('button'); entry.className = 'text-button text-action support-entry'; entry.textContent = 'Help & Support'; entry.setAttribute('aria-haspopup', 'dialog');
 const dialog = document.createElement('dialog'); dialog.className = 'support-dialog'; dialog.setAttribute('aria-labelledby', 'support-title');
 dialog.innerHTML = '<h2 id="support-title">Help &amp; Support</h2><p>LookNook Games</p><p>Report a problem or share feedback. Edit the template before opening your email app.</p><p>Do not include passwords or room invite links. No logs, screenshots or private room details are attached.</p><label for="support-report">Your report (optional fields)</label><textarea id="support-report" rows="12" spellcheck="true"></textarea><p class="support-address"></p><div class="support-actions"><a class="support-email">Report a problem</a><button class="support-copy" type="button">Copy template</button><button class="support-close" type="button">Close</button></div><p class="support-status" role="status" aria-live="polite"></p>';
 const report = dialog.querySelector<HTMLTextAreaElement>('textarea')!;
 const email = dialog.querySelector<HTMLAnchorElement>('.support-email')!;
 const status = dialog.querySelector<HTMLElement>('.support-status')!;
 report.value = reportTemplate(version);
 const update = () => { const url = composeUrl(SUPPORT_EMAIL, report.value); email.hidden = !url; if (url) email.href = url; };
 dialog.querySelector<HTMLElement>('.support-address')!.textContent = SUPPORT_EMAIL ? 'Email: ' + SUPPORT_EMAIL : 'Email support is being set up. You can edit and copy the template now.';
 report.addEventListener('input', update); update();
 email.onclick = () => { update(); status.textContent = 'Opening your email app. Review and send there. If it does not open, copy your template.'; };
 dialog.querySelector<HTMLButtonElement>('.support-copy')!.onclick = async () => { try { await navigator.clipboard.writeText(report.value); status.textContent = 'Template copied. No report was sent.'; } catch { report.focus(); report.select(); status.textContent = 'Select and copy the template above. No report was sent.'; } };
 dialog.querySelector<HTMLButtonElement>('.support-close')!.onclick = () => dialog.close();
 dialog.addEventListener('close', () => entry.focus());
 entry.onclick = () => { status.textContent = ''; dialog.showModal(); };
 host.append(entry); document.body.append(dialog);
 return () => { entry.remove(); dialog.remove(); };
}
