import { Language } from './language';

interface NamedRecord {
  id: number;
  name: string;
}

export interface SessionTrack extends NamedRecord {}

export interface SessionRoom extends NamedRecord {
  localName: string;
}

export interface SecurityRule extends NamedRecord {
  aadGroup: string;
}

export interface OrganizerType extends NamedRecord {}

export interface AreaOfInterest extends NamedRecord {}

export interface OptionGroup extends NamedRecord {}

export interface SessionOption extends NamedRecord {
  group: OptionGroup;
}

export interface SessionRole {
  classification: 'live' | 'ondemand';
  exceptionList?: SecurityRule;
  targetPlatform: 'msteams' | 'jwt' | 't-systems' | 'youtube' | null;
  securityRule?: SecurityRule;
  media: string;
  role: 'join' | 'watch';
}

export interface Tag extends NamedRecord {
  body: NamedRecord;
}

export interface Session {
  id: number;
  track: SessionTrack;
  name: string;
  title: string;
  code: string;
  start: string;
  end: string;
  timezone: string;
  description: string;
  room: SessionRoom;
  meetingType: string;
  subMeetingType: string;
  deleted: boolean;

  tags: Tag[];
  languages: Language[];

  broadcastRequired: boolean;

  organizerType: OrganizerType;

  lobby: boolean;
  moderatedChat: boolean;
  documentUrl: string;

  meetingOptions: SessionOption[];

  premiumWebcast: boolean;
  publish: boolean;
  areasOfInterest: AreaOfInterest[];
  roles: SessionRole[];
  streamKeys: string[];
  streamIngestUrls: string[];
}

export interface SessionList {
  total: number;
  filtered: number;
  draw: number;
  data: {
    meetings: Session[];
    lastModified: string;
  };
}
