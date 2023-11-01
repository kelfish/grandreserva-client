export interface ExternalMeetingApiResponse {
  status: string; // 'ok'
  values: ExternalMeetingApiMeeting[];
}

export interface ExternalMeetingApiMeeting {
  ondemand_url: string;
  webex_meeting_number: string;
  webex_sip_address: string;
  organizer: string;
  join_url: string;
  announcement_type: string;
  room_code: string;
  stream_upload_urls: string;
  end: string; // '10:00'
  title: string;
  webex_password: string;
  languages: string[][]; // [['fl', 'Floor'], ['as', 'Assamese'], ['ik', 'Inupiak']]
  start: string; // '09:00'
  options: string;
  document_url: string;
  stream_ingest_urls: string; // 'rtmp://un-stream.trafficmanager.net/live/COP28_69798-c0b240e45b-fl\nrtmp://un-stream.trafficmanager.net/live/COP28_69798-c0b240e45b-as\nrtmp://un-stream.trafficmanager.net/live/COP28_69798-c0b240e45b-ik';
  watch_security_rule: string;
  time_stamp: string; // '2023-10-31 18:08:05+04:00';
  video_recording: boolean;
  type: string;
  youtube_public_url: string;
  interpretation_languages: string;
  status: 'Pending' | 'To be confirmed' | 'Confirmed';
  description: string;
  short_name: string;
  start_time: string; // '2023-10-31T09:00:00+04:00';
  public_broadcast_standard_: boolean;
  audio_required: string;
  date: string; // '2023-10-31';
  watch_group_access: string;
  target_platform: 'msteams';
  stream_name: string;
  join_group_access: string;
  room: string;
  stream_key: string; // 'COP28_69798-c0b240e45b-fl\nCOP28_69798-c0b240e45b-as\nCOP28_69798-c0b240e45b-ik';
  webex_meeting_id: string;
  notes: string;
  join_security_rule: string;
  host_email: string;
  watch_url: string; // 'https://unfccc-func-cons-bmcufehze5g2fsh4.z01.azurefd.net/api/playlongterm?jwt=eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb25ndGVybSI6dHJ1ZSwiaWF0IjoxNjk4NzYxMjYyLCJzdHJlYW0iOiJDT1AyOF82OTc5OCIsImlzcyI6InVuZmNjYyIsInRyYWNrcyI6W1siZmwiLCJGbG9vciJdLFsiYXMiLCJBc3NhbWVzZSJdLFsiaWsiLCJJbnVwaWFrIl1dLCJhdWQiOiJsaXZlcGxheWVyIn0._cSQ1Sq-z_9MPp9c39M-9XB-A8NEA1u1xLwwIQI_YmSGs5HR0vhFfhZ76iG3RhhCJ4YZ2384mZw7-h_zgSxnXQ';
  internal_venue_broadcast: boolean;
  end_time: string; //'2023-10-31T10:00:00+04:00';
  public_broadcast_premium_: boolean;
  webex_host_key: string;
  interpretation_required: boolean;
  unique_id: number;
}
