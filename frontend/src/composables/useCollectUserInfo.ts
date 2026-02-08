import { generateAnonymousName } from '@/utils/generators';
import { useGeolocation, useLocalStorage, whenever } from '@vueuse/core';
import { onMounted, type UnwrapRef } from 'vue';

interface AnonymousUserInfo {
  id?: string;
  lastActive?: number;
  name?: string;
  geoLocation?: { latitude: number, longitude: number };
}

interface CollectUserInfoOptions {
  collectOnMounted?: boolean;
  watchCoords?: boolean;
}

type Coords = UnwrapRef<ReturnType<typeof useGeolocation>['coords']>;

export const useCollectUserInfo = (options?: CollectUserInfoOptions) => {
  const userInfo = useLocalStorage<AnonymousUserInfo>('user_data', {});

  const { coords } = useGeolocation();

  const collectInfo = () => {
    if (!userInfo.value.id) userInfo.value.id = crypto.randomUUID();
    if (!userInfo.value.name) userInfo.value.name = generateAnonymousName();
    userInfo.value.lastActive = Date.now();
  };

  const setUserCoords = (coords: Coords) => userInfo.value.geoLocation = {
    latitude: Number(coords.latitude.toFixed(2)),
    longitude: Number(coords.longitude.toFixed(2))
  };

  if (options?.collectOnMounted ?? true) {
    onMounted(() => collectInfo());
  }

  whenever(coords, (newCoords) => {
    if (newCoords && !userInfo.value.geoLocation)
      setUserCoords(newCoords);
  });

  return { userInfo, collectInfo };
};
