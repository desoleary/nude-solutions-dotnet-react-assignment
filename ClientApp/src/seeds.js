import Cookies from 'js-cookie';
import { nonProdConsoleError, setItem } from './helpers';
import { LOCAL_STORAGE_KEY_RENTERS_CONTENTS } from './constants';
import { nonProdConsoleLogger } from './helpers/debug-helper';

export const contents = [
  { id: 1, description: 'TV', value: 2000.0, category: 'Electronics' },
  {
    id: 2,
    description: 'Playstation',
    value: 400.0,
    category: 'Electronics'
  },
  { id: 3, description: 'Stereo', value: 1600.0, category: 'Electronics' },
  { id: 4, description: 'Shirts', value: 1100.0, category: 'Clothing' },
  { id: 5, description: 'Jeans', value: 1100.0, category: 'Clothing' },
  { id: 6, description: 'Pots and Pans', value: 3000.0, category: 'Kitchen' },
  { id: 7, description: 'Flatware', value: 500.0, category: 'Kitchen' },
  { id: 8, description: 'Knife Set', value: 500.0, category: 'Kitchen' },
  { id: 9, description: 'Misc', value: 1000.0, category: 'Kitchen' }
];

export async function seedDataInfo() {
  const isNotDevelopment = !window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (isNotDevelopment) return false;

  const currentTimestamp = Cookies.get(LOCAL_STORAGE_KEY_RENTERS_CONTENTS);
  const { lastRestartTimestamp } = await import('./.server-restart-version.js');

  const nextTimeStamp = lastRestartTimestamp();
  if (currentTimestamp === nextTimeStamp) return false;

  nonProdConsoleLogger(`Setting Last Restart timestamp to ${nextTimeStamp}`);
  Cookies.set(LOCAL_STORAGE_KEY_RENTERS_CONTENTS, nextTimeStamp);

  return true;
}

export const seedRentersContentIfServerRestarted = async () => {
  const shouldSeedData = await seedDataInfo();
  if (!shouldSeedData) return;

  nonProdConsoleLogger("Setting Renter's Contents Seed Data...");
  setItem(LOCAL_STORAGE_KEY_RENTERS_CONTENTS, contents).catch(
    nonProdConsoleError
  );
};
