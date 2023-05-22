import { Text, ImageBackground, View, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { styled } from "nativewind";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { BaiJamjuree_700Bold } from "@expo-google-fonts/bai-jamjuree";

import * as AuthSession from "expo-auth-session";
import { useEffect } from "react";

import blurPng from "./src/assets/luz.png";
import Logo from "./src/assets/spacetime-logo.svg";
import Stripes from "./src/assets/stripes.svg";
import React from "react";
import { api } from "./lib/api";

const StyledStripes = styled(Stripes);

const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint:
    "https://github.com/settings/connections/applications/56142c1aeb27a24191cc",
};

export default function App() {
  const [request, response, loginWithGithub] = AuthSession.useAuthRequest(
    {
      clientId: "56142c1aeb27a24191cc",
      scopes: ["identity"],
      redirectUri: AuthSession.makeRedirectUri({
        scheme: "spacetime",
      }),
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      api
        .post("/register", {
          code,
        })
        .then((response) => {
          const { token } = response.data;
          console.log(token);
        });
    }
  }, [response]);

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
          onPress={() => loginWithGithub()}
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
