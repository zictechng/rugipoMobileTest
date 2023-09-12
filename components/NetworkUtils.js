import NetInfo from "@react-native-community/netinfo";

export const checkNetworkConnectivity = async () => {
  try {
    const state = await NetInfo.fetch();
    return state.isConnected;
  } catch (error) {
    console.error("Error checking network connectivity:", error);
    return false;
  }
};