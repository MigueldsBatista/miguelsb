import { computed, ref, toValue, type MaybeRefOrGetter } from 'vue';

export const useIndex = (
  numberOfItemsSource: MaybeRefOrGetter<number>,
  initialIndexSource?: MaybeRefOrGetter<number>
) => {
  const currentIndex = ref(toValue(initialIndexSource) ?? 0);
  const numberOfItems = computed(() => toValue(numberOfItemsSource));

  // Navigation
  const goNext = () => {
    if (currentIndex.value < numberOfItems.value - 1) {
      currentIndex.value++;
    } else {
      currentIndex.value = 0; // Loop back
    }
  };

  const goPrev = () => {
    if (currentIndex.value > 0) {
      currentIndex.value--;
    } else {
      currentIndex.value = numberOfItems.value - 1; // Loop back
    }
  };

  const goToIndex = (idx: number) => {
    currentIndex.value = idx;
  };

  return {
    currentIndex,
    hasMultiple: computed(() => numberOfItems.value > 1),
    goNext,
    goPrev,
    goToIndex
  };
};
