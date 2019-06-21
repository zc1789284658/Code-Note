
/**
 * @Author:zhoucheng
 * @Date:2019/6/21
 * @Description: ----
 */
import 'package:firebase_admob/firebase_admob.dart';

class LoadAds {
    //声明三种广告插件
  MobileAdTargetingInfo targetingInfo;
  BannerAd myBanner;
  InterstitialAd myInterstitial;

  LoadAds() {
    targetingInfo = MobileAdTargetingInfo(
      keywords: <String>['flutterio', 'beautiful apps'],
      contentUrl: 'https://flutter.io',
      birthday: DateTime.now(),
      childDirected: false,
      designedForFamilies: false,
      gender: MobileAdGender
          .male, // or MobileAdGender.female, MobileAdGender.unknown
      testDevices: <String>[], // Android emulators are considered test devices
    );

    myBanner = BannerAd(
      // Replace the testAdUnitId with an ad unit id from the AdMob dash.
      // https://developers.google.com/admob/android/test-ads
      // https://developers.google.com/admob/ios/test-ads
      adUnitId: BannerAd.testAdUnitId,
      size: AdSize.smartBanner,
      targetingInfo: targetingInfo,
      listener: (MobileAdEvent event) {
        print('hello');
//        this.myBanner.dispose();
      },
    );

    myInterstitial = InterstitialAd(
      // Replace the testAdUnitId with an ad unit id from the AdMob dash.
      // https://developers.google.com/admob/android/test-ads
      // https://developers.google.com/admob/ios/test-ads
      adUnitId: InterstitialAd.testAdUnitId,
      targetingInfo: targetingInfo,
      listener: (MobileAdEvent event) {
        print('hello ${event}');
//        this.myBanner.dispose();
      },
    );
  }


    //声明加载显示Banner广告的函数，initialize函数需要传入AppId
  void run() {
    FirebaseAdMob.instance
        .initialize(appId: 'ca-app-pub-xxxxxxxxxx~xxxxxxxxxxx');

    myBanner
      // typically this happens well before the ad is shown
      ..load()
      ..show(
        anchorOffset: 0.0,
        // Banner Position
        anchorType: AnchorType.bottom,
      );
  }
}
