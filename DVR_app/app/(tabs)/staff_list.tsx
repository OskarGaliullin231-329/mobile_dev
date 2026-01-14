import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { Platform, StyleSheet, TouchableOpacity, Text, View, ScrollView } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function StaffListScreen() {
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
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Перейти к форме входа</Text>
          </TouchableOpacity>
        </Link>
      </ThemedView>

      {/* Список сотрудников */}
      <ThemedView style={styles.listContainer}>
        <ThemedText type="subtitle" style={styles.listTitle}>
          Всего сотрудников: {staffMembers.length}
        </ThemedText>
        
        <ScrollView style={styles.scrollView}>
          {staffMembers.map((staff) => (
            <View key={staff.id} style={styles.staffCard}>
              <View style={styles.staffInfo}>
                <Text style={styles.staffName}>{staff.name}</Text>
                <Text style={styles.staffPosition}>{staff.position}</Text>
                <View style={styles.departmentBadge}>
                  <Text style={styles.departmentText}>{staff.department}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.detailsButton}>
                <Text style={styles.detailsButtonText}>Подробнее</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </ThemedView>

      {/* Информационный блок */}
      <ThemedView style={styles.infoContainer}>
        <ThemedText type="subtitle">О разделе</ThemedText>
        <ThemedText>
          Этот раздел отображает список сотрудников компании. 
          В будущем будет реализовано:{'\n\n'}
          • Подключение к API для получения реальных данных{'\n'}
          • Поиск и фильтрация сотрудников{'\n'}
          • Добавление и редактирование записей{'\n'}
          • Детальная информация о каждом сотруднике
        </ThemedText>
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
    backgroundColor: '#007AFF',
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
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
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
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  staffInfo: {
    flex: 1,
  },
  staffName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  staffPosition: {
    fontSize: 14,
    color: '#495057',
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
    backgroundColor: '#e9ecef',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 12,
  },
  detailsButtonText: {
    fontSize: 14,
    color: '#495057',
    fontWeight: '500',
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
});