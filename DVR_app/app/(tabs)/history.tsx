import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";
import ParallaxScrollView from '@/components/parallax-scroll-view';

import axios from "axios";


const fetchHistory = async () => {
  let history = [];
  try {
    const response = await axios.get("https://api.example.com/history");
    history = response.data;
  } catch (error) {
    console.error("Error fetching history:", error);
    // throw error;
  }

  return history;
}


export default function HistoryScreen() {
  const [history, setHistory] = React.useState<any[]>([]);

  React.useEffect(() => {
    const loadHistory = async () => {
      const data = await fetchHistory();
      setHistory(data);
    };

    loadHistory();
  }, []);
    return (
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/mosgortrans_logo.png')}
            style={styles.reactLogo}
          />
        }>
        <View style={styles.container}>
          <Text style={styles.title}>History</Text>
          {history.length === 0 ? (
            <Text style={styles.loadingText}>Loading...</Text>
          ) : (
            history.map((item, index) => (
              <View key={index} style={styles.historyItem}>
                <Text style={styles.historyName}>{item.name}</Text>
                <Text style={styles.historyDate}>{item.date}</Text>
              </View>
            ))
          )}
        </View>
      </ParallaxScrollView>
    );
}


const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#888',
  },
  historyItem: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  historyName: {
    fontSize: 18,
    fontWeight: '600',
  },
  historyDate: {
    fontSize: 14,
    color: '#666',
  },
});
