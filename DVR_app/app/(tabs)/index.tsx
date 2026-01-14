import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { Platform, StyleSheet, TouchableOpacity, Text, View, ScrollView } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function StaffListScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Пример данных о сотрудниках (заглушка)
  const staffMembers = [
    { id: 1, name: 'Иван Петров', position: 'Frontend разработчик', department: 'IT' },
    { id: 2, name: 'Мария Сидорова', position: 'Дизайнер', department: 'Дизайн' },
    { id: 3, name: 'Алексей Иванов', position: 'Backend разработчик', department: 'IT' },
    { id: 4, name: 'Ольга Смирнова', position: 'Менеджер проектов', department: 'Управление' },
    { id: 5, name: 'Дмитрий Кузнецов', position: 'Тестировщик', department: 'QA' },
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
        <ThemedText type="title">Список сотрудников</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* Кнопка для перехода к логину */}
      <ThemedView style={styles.buttonContainer}>
        <Link href="/(tabs)/login" asChild>
          <TouchableOpacity style={[styles.loginButton, { backgroundColor: colors.tint }]}>
            <Text style={styles.loginButtonText}>Перейти к форме входа</Text>
          </TouchableOpacity>
        </Link>
      </ThemedView>

      {/* Список сотрудников */}
      <ThemedView style={[styles.listContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <ThemedText type="subtitle" style={styles.listTitle}>
          Всего сотрудников: {staffMembers.length}
        </ThemedText>

        <ScrollView style={styles.scrollView}>
          {staffMembers.map((staff) => (
            <View key={staff.id} style={[styles.staffCard, { backgroundColor: colorScheme === 'dark' ? '#374151' : '#f8f9fa', borderColor: colors.border }]}>
              <View style={styles.staffInfo}>
                <Text style={[styles.staffName, { color: colors.text }]}>{staff.name}</Text>
                <Text style={[styles.staffPosition, { color: colorScheme === 'dark' ? '#d1d5db' : '#495057' }]}>{staff.position}</Text>
                <View style={styles.departmentBadge}>
                  <Text style={styles.departmentText}>{staff.department}</Text>
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
  buttonContainer: {
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  loginButton: {
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
  staffCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  staffInfo: {
    flex: 1,
  },
  staffName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  staffPosition: {
    fontSize: 14,
    marginBottom: 8,
  },
  departmentBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e7f5ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  departmentText: {
    fontSize: 12,
    color: '#228be6',
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
