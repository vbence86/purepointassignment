import { Platform } from "react-native";
import { ScreenWidth } from "@freakycoder/react-native-helpers";

export const centerSubtitleStyle = item => ({
  fontSize: 12,
  marginLeft: 8,
  textAlign: "center",
  color: item.strokeColor
});

export default {
  safeAreaViewStyle: {
    flex: 1,
    backgroundColor: "#21283d"
  },
  flatListStyle: {
    marginTop: 12
  },
  cardStyle: {
    marginTop: 16,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    width: ScreenWidth * 0.9,
    alignItems: "flex-start",
    borderRadius: 20,
  },
  cardColors: ['rgb(80, 89, 113)', 'rgb(48, 58, 88)'],
  container: {
    ...Platform.select({
      android: {
        top: 24
      }
    }),
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#21283d"
  },
  cardTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "left"
  },
  cardSubtitle: {
    fontSize: 12,
    marginTop: 8,
    textAlign: "left",
    color: "#aaa",
  },  
};
