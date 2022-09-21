import { AdMob, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob'

export async function initializeAdmob() {
  await AdMob.initialize({
    requestTrackingAuthorization: false,
    initializeForTesting: false
  })
}

export async function initializeBannerAd() {
  const options = {
    adId: "ca-app-pub-9279201392924636/8264394713",
    adSize: BannerAdSize.LARGE_BANNER,
    position: BannerAdPosition.TOP_CENTER,
    margin: 10,
    isTesting: true
    // npa: true
  }

  AdMob.showBanner(options);
}
