<a name="readme-top"></a>

![Tests](https://github.com/BlueElephantDigital/gr-api-js/actions/workflows/tests.yml/badge.svg?branch=main)

# GrandReserva Client SDK

## Overview

Provides a Typescript library for integration with the GrandReserva API for
COP projects.

## Usage

The library provides a single client class for making API calls.

```js
class GrandReservaClient(url: string, credentials: GrandReservaCredentials)
```

This class provides methods for API calls to the GrandReserva HTTP API.
Currently supported calls:

- `getSessionsForConference(conferenceId, filter)` - wraps the API call to `/rest/api/v1/virtual_venue/<conference_id>/sessions`

## Getting Started

1. To use the library, install as a `git` dependency using `npm`.

   ```sh
   npm install grandreserva-client@BlueElephantDigital/gr-api-js#v0.0.3
   ```

2. Import the `GrandReservaClient` class

   ```js
   import { GrandReservaClient } from 'grandreserva-client`;
   ```

3. Create a client object, passing the base URL and credentials

   ```js
   const client = new GrandReservaClient('https://grandreserva.uat.unfccc.int', {
     username: 'testuser',
     password: 'secret'
   });
   ```

4. Make a call to the `client`

   __Get Meetings for a conference (`/virtual_meeting`):__

   ```js
   const data = await client.getMeetingsForConference(78);
   ```

   __Get Meeting by ID (`/virtual_meeting`):__

   ```js
   const data = await client.getMeetingById(...);
   ```

   _This previous method does not return Stream Keys or Ingest URLs_
   __Get Sessions for a conference (`/virtual_venues`):__

   ```js
   const data = await client.getSessionsForConference(78);
   ```

5. API data will be returned in two possible objects:

   __getMeetingsForConference__ & __getMeetingById__

   ```js
   interface Meeting {
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
     webex?: Webex;
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
   ```

   __getSessionsForConference__

   ```js
   interface SessionList {
     total: number;
     filtered: number;
     draw: number;
     data: {
       meetings: Session[];
       lastModified: string;
     };
   }
   ```

## Local Development
### Pre-requisites

- [NodeJS v18](https://nodejs.org/en)

### Local Setup

1. Install dependencies
   ```sh
   npm install
   ```

### Running Tests

1. Run `jest` unit tests
   ```sh
   npm run test
   ```
### Packaging the Library

1. Run build
   ```sh
   npm run build
   ```
