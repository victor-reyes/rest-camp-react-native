import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MapScreen, RestAreaScreen } from "@/screens";

// type HomeTabsParamList = {
//   Map: undefined;
//   Home: undefined;
//   Updates: undefined;
// };

type RootStackParamList = {
  // HomeTabs: NavigatorScreenParams<HomeTabsParamList> | undefined;
  // Profile: { user: string };
  // Settings: undefined;
  // NotFound: undefined;
  Map: undefined;
  RestAreaModal: { id: string };
};

// const HomeTabs = createBottomTabNavigator<HomeTabsParamList>({
//   screens: {
//     Map: {
//       screen: MapScreen,
//       options: {
//         headerShown: false,
//         tabBarIcon: ({ color, size }) => <FontAwesome name="map" size={size} color={color} />,
//       },
//     },
//     Home: {
//       screen: Home,
//       options: {
//         title: "Feed",
//         tabBarIcon: ({ color, size }) => (
//           <Image
//             source={newspaper}
//             tintColor={color}
//             style={{
//               width: size,
//               height: size,
//             }}
//           />
//         ),
//       },
//     },
//     Updates: {
//       screen: Updates,
//       options: {
//         tabBarIcon: ({ color, size }) => (
//           <Image
//             source={bell}
//             tintColor={color}
//             style={{
//               width: size,
//               height: size,
//             }}
//           />
//         ),
//       },
//     },
//   },
// });

const RootStack = createNativeStackNavigator<RootStackParamList>({
  screens: {
    // HomeTabs: {
    //   screen: HomeTabs,
    //   options: {
    //     title: "Home",
    //     headerShown: false,
    //   },
    // },
    // Profile: {
    //   screen: Profile,
    //   linking: {
    //     path: ":user(@[a-zA-Z0-9-_]+)",
    //     parse: {
    //       user: value => value.replace(/^@/, ""),
    //     },
    //     stringify: {
    //       user: value => `@${value}`,
    //     },
    //   },
    // },
    // Settings: {
    //   screen: Settings,
    //   options: ({ navigation }) => ({
    //     presentation: "modal",
    //     headerRight: () => (
    //       <HeaderButton onPress={navigation.goBack}>
    //         <Text>Close</Text>
    //       </HeaderButton>
    //     ),
    //   }),
    // },
    // NotFound: {
    //   screen: NotFound,
    //   options: {
    //     title: "404",
    //   },
    //   linking: {
    //     path: "*",
    //   },
    // },
    Map: {
      screen: MapScreen,
      options: {
        title: "Map",
        headerShown: false,
      },
    },
    RestAreaModal: {
      screen: RestAreaScreen,
      options: {
        presentation: "formSheet",
        headerShown: false,
        sheetCornerRadius: 25,
        sheetAllowedDetents: [0.5, 0.75, 1],
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootStackParamList {}
  }
}
