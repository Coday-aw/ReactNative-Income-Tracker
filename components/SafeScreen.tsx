import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const SafeScreen = ({ children }: { children: React.ReactNode }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{ paddingTop: insets.top, backgroundColor: "#f8fafc", flex: 1 }}
    >
      {children}
    </View>
  );
};

export default SafeScreen;
