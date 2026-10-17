import test from 'node:test';
import assert from 'node:assert/strict';
import { SUPPORT_EMAIL, GAME_NAME, reportTemplate, composeUrl } from '../src/support-model.ts';
test('confirmed inbox is exact and malformed recipients are rejected', () => { assert.equal(SUPPORT_EMAIL, 'looknookgames@gmail.com'); for (const address of ['', 'x@y.test?bcc=other', 'x@y.test\r\nBcc:bad']) assert.equal(composeUrl(address, 'body'), null); });
test('compose keeps edited text encoded and game specific', () => { const body = 'Edited & expected? #details\nNo automatic data'; const url = composeUrl('support@example.test', body)!; assert.equal(decodeURIComponent(url.split('&body=')[1]), body); assert.ok(url.includes(encodeURIComponent(GAME_NAME + ' - Report a problem'))); });
test('template includes optional prompts without collecting browser or room data', () => { const template = reportTemplate('test-build'); assert.ok(template.includes('test-build')); assert.ok(template.includes('What happened:')); assert.ok(template.includes('passwords and room invite links')); assert.ok(!template.includes('http')); });
