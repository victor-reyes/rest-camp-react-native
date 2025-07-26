export type RootStackParamList = {
  // HomeTabs: NavigatorScreenParams<HomeTabsParamList> | undefined;
  // Profile: { user: string };
  // Settings: undefined;
  // NotFound: undefined;
  Map: undefined;
  Profile: undefined;
  UploadPhotos: { restAreaId: string };
  AddReview: { restAreaId: string };
};

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootStackParamList {}
  }
}
