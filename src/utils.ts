import {
  ApiResponseSessionsData,
  Language,
  Meeting,
  MeetingOption,
  MeetingRole,
  Tag,
} from './types';

export function normalizeSessionsResponse(response: ApiResponseSessionsData): {
  total: number;
  filtered: number;
  draw: number;
  data: {
    meetings: Meeting[];
    lastModified: string;
  };
} {
  return {
    ...response,
    data: {
      lastModified: response.data.last_modified,
      meetings: response.data.meetings.map<Meeting>((meeting) => ({
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

        meetingOptions: meeting.meeting_options.map<MeetingOption>((option) => ({
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
        roles: meeting.roles.map<MeetingRole>((role) => ({
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
