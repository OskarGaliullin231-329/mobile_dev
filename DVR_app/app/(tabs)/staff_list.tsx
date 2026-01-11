import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";
import ParallaxScrollView from '@/components/parallax-scroll-view';

import axios from "axios";

const fetchStaffList = async () => {
  let staffList = [];
  try {
    const response = await axios.get("https://api.example.com/staff");
    staffList = response.data;
  } catch (error) {
    console.error("Error fetching staff list:", error);
    // throw error;
  }

  return staffList
}

export default function StaffListScreen() {
  const [staffList, setStaffList] = React.useState<any[]>([]);

  React.useEffect(() => {
    const loadStaffList = async () => {
      const data = await fetchStaffList();
      setStaffList(data);
    };

    loadStaffList();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <View style={styles.container}>
        <Text style={styles.title}>Staff List</Text>
        {staffList.length === 0 ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          staffList.map((staff, index) => (
            <View key={index} style={styles.staffItem}>
              <Text style={styles.staffName}>{staff.name}</Text>
              <Text style={styles.staffRole}>{staff.role}</Text>
            </View>
          ))
        )}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#25292e',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  loadingText: {
    color: '#aaa',
  },
  staffItem: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#33383e',
    borderRadius: 8,
  },
  staffName: {
    fontSize: 18,
    color: '#fff',
  },
  staffRole: {
    fontSize: 14,
    color: '#bbb',
  },
  reactLogo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
