import {
  ExternalMeetingApiResponse,
  ExternalVenueApiResponse,
  Language,
  Meeting,
  SessionList,
  SessionOption,
  SessionRole,
  MeetingStatus,
  Tag,
  Session,
} from './types';

export function normalizeSessionsResponse(response: ExternalVenueApiResponse): SessionList {
  return {
    ...response,
    data: {
      lastModified: response.data.last_modified,
      meetings: response.data.meetings.map<Session>((meeting) => ({
        id: meeting.meeting_id,
        track: {
          id: meeting.track_id,
          name: meeting.track_name,
        },
        name: meeting.session_name,
        title: meeting.title,
        code: meeting.session_code,
        start: meeting.start,
        end: meeting.end,
        timezone: meeting.timezone,
        description: meeting.description,
        room: {
          id: meeting.room_id,
          name: meeting.room_name,
        },
        meetingType: meeting.meeting_type,
        subMeetingType: meeting.sub_meeting_type,
        deleted: meeting.deleted,

        tags: meeting.tags.map<Tag>((tag) => ({
          id: tag.id,
          name: tag.name,
          body: {
            id: tag.body_id,
            name: tag.body_name,
          },
        })),
        languages: meeting.languages.map<Language>((language) => ({
          code: language[0],
          name: language[1],
        })),

        broadcastRequired: meeting.broadcast_required,

        organizerType: {
          id: meeting.organizer_type_id,
          name: meeting.organizer_type,
        },

        lobby: meeting.lobby,
        moderatedChat: meeting.moderated_chat,
        documentUrl: meeting.document_url,

        meetingOptions: meeting.meeting_options.map<SessionOption>((option) => ({
          id: option.id,
          name: option.name,
          group: {
            id: option.group_id,
            name: option.group_name,
          },
        })),
        premiumWebcast: meeting.premium_webcast,
        publish: meeting.publish,
        areasOfInterest: meeting.areas_of_interest,
        roles: meeting.roles.map<SessionRole>((role) => ({
          classification: role.classification,
          exceptionList:
            role.exception_list_id !== null
              ? {
                  id: role.exception_list_id,
                  name: role.exception_list_name || '',
                  aadGroup: role.exception_list_aad_group || '',
                }
              : undefined,
          media: role.media,
          role: role.role,
          targetPlatform: role.target_platform,
          securityRule:
            role.security_rule_id !== null
              ? {
                  id: role.security_rule_id,
                  name: role.security_rule_name || '',
                  aadGroup: role.security_rule_aad_group || '',
                }
              : undefined,
        })),
      })),
    },
  };
}

export function mapStatusToEnum(status: string): MeetingStatus {
  switch (status) {
    case 'Confirmed':
      return MeetingStatus.Confirmed;
    case 'To be confirmed':
      return MeetingStatus.ToBeConfirmed;
    default:
      return MeetingStatus.Pending;
  }
}

export function normalizeMeetingsResponse(response: ExternalMeetingApiResponse): Meeting[] {
  return response.values.map((v) => ({
    id: v.unique_id,
    name: v.short_name,
    title: v.title,
    start: v.start,
    end: v.end,
    description: v.description,
    room: {
      code: v.room_code,
      name: v.room,
    },
    targetPlatform: v.target_platform,
    status: mapStatusToEnum(v.status),

    onDemandUrl: v.ondemand_url,
    joinUrl: v.join_url,
    announcementType: v.announcement_type,
    streamUploadUrls: v.stream_upload_urls.split('\n'),

    webex: v.webex_meeting_id
      ? {
          meetingId: v.webex_meeting_id,
          meetingNumber: v.webex_meeting_number,
          sipAddress: v.webex_sip_address,
          hostKey: v.webex_host_key,
          password: v.webex_password,
        }
      : undefined,

    organizer: v.organizer,

    languages: v.languages.map<Language>((language) => ({
      code: language[0],
      name: language[1],
    })),
    options: v.options.split(',').map((o) => o.trim()),

    documentUrl: v.document_url,
    streamIngestUrls: v.stream_ingest_urls.split('\n'),
    watchSecurityRule: v.watch_security_rule,
    timestamp: v.time_stamp,
    videoRecording: v.video_recording,
    type: v.type,
    youtubePublicUrl: v.youtube_public_url,
    interpretationRequired: v.interpretation_required,
    interpretationLanguages: v.interpretation_languages,
    startTime: v.start_time,
    endTime: v.end_time,

    publicBroadcastStandard: v.public_broadcast_standard_,
    publicBroadcastPremium: v.public_broadcast_premium_,
    audioRequired: v.audio_required,
    date: v.date,
    watchGroupAccess: v.watch_group_access,
    streamName: v.stream_name,
    joinGroupAccess: v.join_group_access,
    streamKeys: v.stream_key.split('\n'),

    notes: v.notes,
    joinSecurityRule: v.join_security_rule,
    hostEmail: v.host_email,
    watchUrl: v.watch_url,
    internalVenueBroadcast: v.internal_venue_broadcast,
  }));
}
