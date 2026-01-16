import { onMounted } from 'vue';

interface AnonymousUserInfo {
  id?: string;
  lastActive?: number;
  name?: string;
  geoLocation?: { latitude: number; longitude: number };
}

interface CollectUserInfoOptions {
  collectOnMounted?: boolean;
  watchCoords?: boolean;
}

export const useCollectUserInfo = (options?: CollectUserInfoOptions) => {
  const userInfo = useLocalStorage<AnonymousUserInfo>('user_data', {});

  const { coords } = useGeolocation();

  const collectInfo = () => {
    if (!userInfo.value.id) userInfo.value.id = crypto.randomUUID();
    if (!userInfo.value.name) userInfo.value.name = generateAnonymousName();
    userInfo.value.lastActive = Date.now();
  };

  if (options?.collectOnMounted ?? true) {
    onMounted(() => collectInfo());
  }

  whenever(coords, (c) => {
    if (!c) return;
    if (userInfo.value.geoLocation) return;

    userInfo.value.geoLocation = {
      latitude: Number(c.latitude.toFixed(2)),
      longitude: Number(c.longitude.toFixed(2))
    };
  });

  return { userInfo, collectInfo };
};
