import { Language } from './language';

export enum MeetingStatus {
  Pending = 'Pending',
  ToBeConfirmed = 'ToBeConfirmed',
  Confirmed = 'Confirmed',
}

export interface MeetingRoom {
  code: string;
  name: string;
}

export interface Webex {
  meetingId: string;
  meetingNumber: string;
  sipAddress: string;
  password: string;
  hostKey: string;
}

export interface Meeting {
  id: number;
  name: string;
  title: string;
  start: string;
  end: string;
  description: string;
  room: MeetingRoom;
  targetPlatform: 'msteams' | 'jwt' | 't-systems' | 'youtube';
  status: MeetingStatus;

  onDemandUrl: string;
  joinUrl: string;
  announcementType: string;
  streamUploadUrls: string[];

  webex: Webex | null;

  organizer: string;

  languages: Language[];
  options: string[];

  documentUrl: string;
  streamIngestUrls: string[];
  watchSecurityRule: string;
  timestamp: string;
  videoRecording: boolean;
  type: string;
  youtubePublicUrl: string;
  interpretationRequired: boolean;
  interpretationLanguages: string;
  startTime: string;
  endTime: string;

  publicBroadcastStandard: boolean;
  publicBroadcastPremium: boolean;
  audioRequired: string;
  date: string;
  watchGroupAccess: string;
  streamName: string;
  joinGroupAccess: string;
  streamKeys: string[];

  notes: string;
  joinSecurityRule: string;
  hostEmail: string;
  watchUrl: string;
  internalVenueBroadcast: boolean;
}
