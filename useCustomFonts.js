// useCustomFonts.js
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';

export function useCustomFonts() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        '_regular': require('./assets/fonts/Poppins-Regular.ttf'),
        '_bold': require('./assets/fonts/Poppins-Bold.ttf'),
        '_italic': require('./assets/fonts/Poppins-Italic.ttf'),
        '_black': require('./assets/fonts/Poppins-Black.ttf'),
        '_medium': require('./assets/fonts/Poppins-Medium.ttf'),
        '_semiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
        '_light': require('./assets/fonts/Poppins-Light.ttf'),
        '_think': require('./assets/fonts/Poppins-Thin.ttf'),
      });

      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  return fontsLoaded;
}
