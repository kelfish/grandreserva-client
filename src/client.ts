import { ExternalMeetingApiResponse, ExternalVenueApiResponse } from './types';
import { normalizeMeetingsResponse, normalizeSessionsResponse } from './utils';

export interface GrandReservaCredentials {
  username: string;
  password: string;
}

export interface SessionsForConferenceFilter {
  startTime?: string;
  endTime?: string;
  modifiedSince?: string;
  meetingIds?: number[];
}

export interface MeetingsForConferenceFilter {
  startDate?: string;
  endDate?: string;
}

/**
 * Grand Reserva API client, used to perform API calls
 */
export class GrandReservaClient {
  private apiUrl: string;
  private credentials: GrandReservaCredentials;

  constructor(url: string, credentials: GrandReservaCredentials) {
    this.apiUrl = url;
    this.credentials = credentials;
  }

  private async performFetch<T>(endpoint: string, init?: RequestInit): Promise<T> {
    const url = `${this.apiUrl}${endpoint}`;

    const signedCreds = btoa(`${this.credentials.username}:${this.credentials.password}`);

    try {
      const response = await fetch(url, {
        ...init,
        headers: {
          ...init?.headers,
          'Content-Type': 'application/json',
          Authorization: `Basic ${signedCreds}`,
        },
      });
      const body = (await response.json()) as T;
      return body;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static buildSessionsEndpoint(
    conferenceId: number,
    filter: SessionsForConferenceFilter = {},
  ): string {
    let endpoint = `/rest/api/v1/virtual_venue/${conferenceId}/sessions`;

    const query: string[] = [];

    if (filter) {
      const { startTime, endTime, modifiedSince, meetingIds } = filter;
      if (startTime) {
        query.push(`start_time=${startTime}`);
      }

      if (endTime) {
        query.push(`end_time=${endTime}`);
      }

      if (modifiedSince) {
        query.push(`modified_since=${modifiedSince}`);
      }

      if (meetingIds && meetingIds.length) {
        query.push(`meeting_ids=${meetingIds.join(',')}`);
      }
    }

    if (query.length) {
      endpoint = `${endpoint}?${query.join('&')}`;
    }

    return endpoint;
  }

  public static buildMeetingsEndpoint(
    conferenceId: number,
    filter: MeetingsForConferenceFilter = {},
  ): string {
    let endpoint = `/rest/api/v1/virtual_meeting?format=json&conference_id=${conferenceId}`;

    const query: string[] = [];

    if (filter) {
      const { startDate, endDate } = filter;
      if (startDate) {
        query.push(`start_date=${startDate}`);
      }

      if (endDate) {
        query.push(`end_date=${endDate}`);
      }
    }

    if (query.length) {
      endpoint = `${endpoint}&${query.join('&')}`;
    }

    return endpoint;
  }

  public static buildMeetingByIdEndpoint(meetingId: number): string {
    return `/rest/api/v1/virtual_meeting/${meetingId}?format=json`;
  }

  /**
   * Gets a list of sessions based on a supplied conference identifier
   *
   * @see /rest/api/v1/virtual_venue/<conference_id>/sessions
   *
   * @param conferenceId - an integer ID supplied by UNFCCC, based on env
   * @returns a list of [Meeting] objects, normalizing the API JSON
   */
  public async getSessionsForConference(
    conferenceId: number,
    filter: SessionsForConferenceFilter = {},
  ) {
    const endpoint = GrandReservaClient.buildSessionsEndpoint(conferenceId, filter);
    const body = await this.performFetch<ExternalVenueApiResponse>(endpoint, {
      method: 'GET',
    });

    return normalizeSessionsResponse(body);
  }

  /**
   * Gets a list of meetings based on the supplied conference identifier
   *
   * @remarks - defaults to yesterday and today if no filter is supplied
   * @see /rest/api/v1/virtual_meeting?conference_id=<conference_id>&format=json
   *
   * @param conferenceId - an integer ID supplied by UNFCCC, based on env
   * @param filter - optional start and end date filtering
   * @returns a list of [Meeting] objects or Error if a non `ok` response is received
   */
  public async getMeetingsForConference(
    conferenceId: number,
    filter: MeetingsForConferenceFilter = {},
  ) {
    const endpoint = GrandReservaClient.buildMeetingsEndpoint(conferenceId, filter);
    const body = await this.performFetch<ExternalMeetingApiResponse>(endpoint, {
      method: 'GET',
    });

    if (body.status !== 'ok') {
      throw new Error(`Invalid data received from API: ${body}`);
    }

    return normalizeMeetingsResponse(body);
  }

  /**
   * Get a meeting based on provided ID
   *
   * @see /rest/api/v1/virtual_meeting/<meeting_id>?format=json
   *
   * @param meetingId - the unique ID for a meeting as returned from `getMeetingsForConference`
   * @returns a Meeting object containing details or Error if a non `ok` response is received
   */
  public async getMeetingById(meetingId: number) {
    const endpoint = GrandReservaClient.buildMeetingByIdEndpoint(meetingId);
    const body = await this.performFetch<ExternalMeetingApiResponse>(endpoint, {
      method: 'GET',
    });

    if (body.status !== 'ok') {
      throw new Error(`Invalid data received from API: ${body}`);
    }

    const normalized = normalizeMeetingsResponse(body);

    if (normalized.length > 0) {
      return normalized[0];
    }

    return undefined;
  }
}
