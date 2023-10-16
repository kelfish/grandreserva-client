<a name="readme-top"></a>

![Tests](https://github.com/kelfish/grandreserva-client/actions/workflows/tests.yml/badge.svg?branch=main)

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
   npm install grandreserva-client@BlueElephantDigital/gr-api-js#v0.0.1
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

   ```js
   const data = await client.getSessionsForConference(78);
   ```

5. API data will be returned in a `MeetingList` object

   ```js
   interface MeetingList {
     total: number;
     filtered: number;
     draw: number;
     data: {
       meetings: Meeting[];
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
