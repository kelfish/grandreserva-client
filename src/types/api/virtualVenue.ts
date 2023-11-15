export interface ExternalVenueApiResponseList {
  filtered: number;
  draw: number;
  total: number;
}

export interface ExternalVenueApiResponse extends ExternalVenueApiResponseList {
  data: {
    last_modified: string;
    meetings: {
      meeting_id: number;
      track_name: string;
      track_id: number;
      session_name: string;
      title: string;
      session_code: string;
      roles: {
        classification: 'live' | 'ondemand';
        exception_list_id: number | null;
        target_platform: 'msteams' | 'jwt' | 't-systems' | 'youtube' | null;
        security_rule_name: string;
        security_rule_id: number;
        exception_list_name: string | null;
        media: string;
        security_rule_aad_group: string | null;
        role: 'join' | 'watch';
        security_group: string;
        exception_list_aad_group: string | null;
      }[];

      start: string;
      end: string;
      actual_start: string;
      actual_end: string;
      timezone: string;
      description: string;
      publish: boolean;
      areas_of_interest: {
        id: number;
        name: string;
      }[];
      room_name: string;
      room_id: number;
      room_local_name: string;
      meeting_type: string;
      sub_meeting_type: string;
      deleted: boolean;
      tags: {
        body_name: string;
        body_id: number;
        id: number;
        name: string;
      }[];
      languages: string[][]; // [["fl", "Floor"]];
      broadcast_required: boolean;
      organizer_type: string;
      organizer_type_id: number;
      lobby: boolean;
      moderated_chat: boolean;
      document_url: string;
      meeting_options: {
        group_name: string;
        group_id: number;
        id: number;
        name: string;
      }[];
      premium_webcast: boolean;
      stream_ingest_urls: string[];
      stream_keys: string[];
    }[];
  };
}
