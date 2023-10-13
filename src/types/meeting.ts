interface NamedRecord {
  id: number;
  name: string;
}

export interface MeetingTrack extends NamedRecord {}

export interface MeetingRoom extends NamedRecord {}

export interface SecurityRule extends NamedRecord {
  aadGroup: string;
}

export interface OrganizerType extends NamedRecord {}

export interface AreaOfInterest extends NamedRecord {}

export interface OptionGroup extends NamedRecord {}

export interface MeetingOption extends NamedRecord {
  group: OptionGroup;
}

export interface MeetingRole {
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

export interface Language {
  code: string;
  name: string;
}

export interface Meeting {
  id: number;
  track: MeetingTrack;
  name: string;
  title: string;
  code: string;
  start: string;
  end: string;
  timezone: string;
  description: string;
  room: MeetingRoom;
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

  meetingOptions: MeetingOption[];

  premiumWebcast: boolean;
  publish: boolean;
  areasOfInterest: AreaOfInterest[];
  roles: MeetingRole[];
}
