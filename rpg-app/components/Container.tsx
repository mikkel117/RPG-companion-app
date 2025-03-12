import { SafeAreaView, StatusBar } from 'react-native';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <SafeAreaView className={`${styles.container} bg-background`}>{children}</SafeAreaView>;
};

const styles = {
  container: 'flex flex-1',
  paddingTop: StatusBar.currentHeight,
};
