import { Image } from 'expo-image';
import { StyleSheet, TouchableOpacity, Text, View, ScrollView } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function VideoRecordersScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  // Пример данных о видеорегистраторах (заглушка)
  const videoRecorders = [
    { id: 1, model: 'DVR-1000', serialNumber: 'SN123456', status: 'В наличии' },
    { id: 2, model: 'DVR-2000', serialNumber: 'SN123457', status: 'Выдан' },
    { id: 3, model: 'DVR-3000', serialNumber: 'SN123458', status: 'В ремонте' },
    { id: 4, model: 'DVR-4000', serialNumber: 'SN123459', status: 'В наличии' },
    { id: 5, model: 'DVR-5000', serialNumber: 'SN123460', status: 'Выдан' },
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/mosgortrans_logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Видеорегистраторы</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* Список видеорегистраторов */}
      <ThemedView style={[styles.listContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <ThemedText type="subtitle" style={styles.listTitle}>
          Всего видеорегистраторов: {videoRecorders.length}
        </ThemedText>

        <ScrollView style={styles.scrollView}>
          {videoRecorders.map((recorder) => (
            <View key={recorder.id} style={[styles.recorderCard, { backgroundColor: colorScheme === 'dark' ? '#374151' : '#f8f9fa', borderColor: colors.border }]}>
              <View style={styles.recorderInfo}>
                <Text style={[styles.recorderModel, { color: colors.text }]}>{recorder.model}</Text>
                <Text style={[styles.recorderSerial, { color: colorScheme === 'dark' ? '#d1d5db' : '#495057' }]}>SN: {recorder.serialNumber}</Text>
                <View style={[styles.statusBadge, { backgroundColor: recorder.status === 'В наличии' ? '#d4edda' : recorder.status === 'Выдан' ? '#fff3cd' : '#f8d7da' }]}>
                  <Text style={[styles.statusText, { color: recorder.status === 'В наличии' ? '#155724' : recorder.status === 'Выдан' ? '#856404' : '#721c24' }]}>{recorder.status}</Text>
                </View>
              </View>
              <TouchableOpacity style={[styles.detailsButton, { backgroundColor: colorScheme === 'dark' ? '#4b5563' : '#e9ecef' }]}>
                <Text style={[styles.detailsButtonText, { color: colorScheme === 'dark' ? '#f3f4f6' : '#495057' }]}>Подробнее</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  listContainer: {
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
  },
  listTitle: {
    marginBottom: 15,
    color: '#1a1a1a',
  },
  scrollView: {
    maxHeight: 400,
  },
  recorderCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  recorderInfo: {
    flex: 1,
  },
  recorderModel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  recorderSerial: {
    fontSize: 14,
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  detailsButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 12,
  },
  detailsButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
