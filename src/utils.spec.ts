/* eslint-disable @typescript-eslint/no-explicit-any */
import sessions from './__mocks__/sessions.json';
import { normalizeSessionsResponse } from './utils';

describe('utils.normalizeSessionsResponse', () => {
  it('transforms API response', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const normalized = normalizeSessionsResponse(sessions as any);

    expect(normalized.data.meetings.length).toEqual(sessions.data.meetings.length);
    expect(normalized.data.meetings[0].code).toEqual(sessions.data.meetings[0].session_code);
    expect(normalized.data.meetings[normalized.data.meetings.length - 1].roles.length).toEqual(
      sessions.data.meetings[sessions.data.meetings.length - 1].roles.length,
    );
  });
});
