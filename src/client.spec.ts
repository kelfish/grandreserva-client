import { GrandReservaClient } from './client';

const CONFERENCE_ID = 78;
const ENDPOINT_SESSIONS = `/rest/api/v1/virtual_venue/${CONFERENCE_ID}/sessions`;

describe('client.GrandReservaClient', () => {
  it('buildSessionsEndpoint with no filter', () => {
    const endpoint = GrandReservaClient.buildSessionsEndpoint(CONFERENCE_ID);

    expect(endpoint).toEqual(ENDPOINT_SESSIONS);
  });

  it('buildSessionsEndpoint with last modified since', () => {
    const modifiedSince = new Date().toISOString();
    const endpoint = GrandReservaClient.buildSessionsEndpoint(CONFERENCE_ID, { modifiedSince });

    expect(endpoint).toEqual(`${ENDPOINT_SESSIONS}?modified_since=${modifiedSince}`);
  });

  it('buildSessionsEndpoint with meeting IDs', () => {
    const meetingIds = [1234, 9860];
    const endpoint = GrandReservaClient.buildSessionsEndpoint(CONFERENCE_ID, { meetingIds });

    expect(endpoint).toEqual(`${ENDPOINT_SESSIONS}?meeting_ids=[${meetingIds.join(',')}]`);
  });

  it('buildSessionsEndpoint with start and end', () => {
    const startTime = new Date().toISOString();
    const endTime = new Date().toISOString();
    const endpoint = GrandReservaClient.buildSessionsEndpoint(CONFERENCE_ID, {
      startTime,
      endTime,
    });

    expect(endpoint).toEqual(`${ENDPOINT_SESSIONS}?start_time=${startTime}&end_time=${endTime}`);
  });
});
