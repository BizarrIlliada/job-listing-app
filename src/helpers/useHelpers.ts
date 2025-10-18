import { useRouter } from 'vue-router';

export function useHelpers() {
  const router = useRouter();

  function safeRouterBack(name = 'home-page') {
    const state = (router.options.history.state) || {};

    if (state.back) {
      router.back();
    } else {
      router.push({ name });
    }
  }

  return {
    safeRouterBack,
  }
}
