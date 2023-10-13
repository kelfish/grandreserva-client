import { ApiResponseSessionsData } from './types';
import { normalizeSessionsResponse } from './utils';

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
        query.push(`meeting_ids=[${meetingIds.join(',')}]`);
      }
    }

    if (query.length) {
      endpoint = `${endpoint}?${query.join('&')}`;
    }

    return endpoint;
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
    const body = await this.performFetch<ApiResponseSessionsData>(endpoint, {
      method: 'GET',
    });

    return normalizeSessionsResponse(body);
  }
}
