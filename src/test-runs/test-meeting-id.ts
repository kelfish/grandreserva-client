import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { GrandReservaClient } from '../client';
import { Meeting } from '../types';

async function saveDataToTempFile(data: Meeting) {
  const dir = path.resolve(__dirname, '../../tmp');
  const filePath = path.resolve(dir, 'api-meeting-id-data.json');
  try {
    await fs.promises.mkdir(dir);
  } catch (error) {
    // ignore
  }
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  await fs.promises.writeFile(filePath, JSON.stringify(data, undefined, 2));
}

async function main() {
  if (!process.env['API_URL']) {
    console.error('Please supply API_URL in env');
    return;
  }

  if (!process.env['CREDENTIAL_USERNAME']) {
    console.error('Please supply CREDENTIAL_USERNAME in env');
    return;
  }

  if (!process.env['CREDENTIAL_PASSWORD']) {
    console.error('Please supply CREDENTIAL_PASSWORD in env');
    return;
  }

  console.info('Running test client');
  console.info(`Calling URL ${process.env['API_URL']}`);
  console.info(`Logging in as user ${process.env['CREDENTIAL_USERNAME']}`);

  const client = new GrandReservaClient(process.env['API_URL'], {
    username: process.env['CREDENTIAL_USERNAME'],
    password: process.env['CREDENTIAL_PASSWORD'],
  });

  const meetingId = 69796;
  const data = await client.getMeetingById(meetingId);

  if (!data) {
    console.error(`Meeting with ID ${meetingId} NOT found`);
    return;
  }

  console.info(`Retrieved meeting with ID ${data.id} (${data.title}) from API`);

  await saveDataToTempFile(data);
}

main()
  .then(() => {
    console.info('Test complete');
  })
  .catch((error) => console.error(error));
