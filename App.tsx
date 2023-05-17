import { StatusBar } from "expo-status-bar";
import { Text, ImageBackground, View, TouchableOpacity } from "react-native";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { BaiJamjuree_700Bold } from "@expo-google-fonts/bai-jamjuree";
import blurPng from "./src/assets/luz.png";
import Logo from "./src/assets/spacetime-logo.svg";
import Stripes from "./src/assets/stripes.svg";
import { styled } from "nativewind";

const StyledStripes = styled(Stripes);

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  });
  if (!hasLoadedFonts) {
    return null;
  }
  return (
    <ImageBackground
      source={blurPng}
      className="bg-gray-900 flex-1 items-center relative px-8"
      imageStyle={{
        position: "absolute",
        left: "-110%",
      }}
    >
      <StyledStripes className="absolute left-2" />
      <View className="flex-1 items-center justify-center gap-6">
        <Logo />
        <View className="space-y-2">
          <Text className="text-center font-title text-2xl text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base text-gray-50">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-3"
        >
          <Text className="font-alt">COMEÇAR A CADASTRAR</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="light" />
      <Text className="text-gray-50 mb-3 text-sm">Feito durante a NLW </Text>
    </ImageBackground>
  );
}
