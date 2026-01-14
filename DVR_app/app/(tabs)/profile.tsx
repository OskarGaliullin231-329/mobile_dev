import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { HelloWave } from '@/components/hello-wave';

// Типы данных на основе API
type UserProfile = {
  id: number;
  username: string;
  lastName: string;
  firstName: string;
  middleName: string;
  roleName: string;
  token?: string;
};

type Issue = {
  id: number;
  videoRecorderId: number;
  employeeId: number;
  issueDate: string;
  returnDate?: string;
  status: string;
};

type VideoRecorder = {
  id: number;
  number: string;
  status: string;
};

export default function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [currentIssues, setCurrentIssues] = useState<Issue[]>([]);
  const [videoRecorders, setVideoRecorders] = useState<VideoRecorder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  // Заглушка данных (позже заменить на реальный API)
  const mockProfile: UserProfile = {
    id: 1,
    username: 'admin',
    lastName: 'Администратор',
    firstName: 'Системный',
    middleName: '',
    roleName: 'admin',
  };

  const mockIssues: Issue[] = [
    { id: 1, videoRecorderId: 1, employeeId: 1, issueDate: '2024-01-14', status: 'active' },
    { id: 2, videoRecorderId: 2, employeeId: 1, issueDate: '2024-01-10', returnDate: '2024-01-13', status: 'returned' },
  ];

  const mockVideoRecorders: VideoRecorder[] = [
    { id: 1, number: 'VR-001', status: 'issued' },
    { id: 2, number: 'VR-002', status: 'available' },
    { id: 3, number: 'VR-003', status: 'issued' },
  ];

  // Функция загрузки данных
  const loadProfileData = async () => {
    try {
      setIsLoading(true);
      
      // TODO: Заменить на реальные API вызовы
      // Пример реального запроса:
      // const response = await fetch('http://localhost:8080/api/auth/me', {
      //   headers: { 'Authorization': `Bearer ${token}` }
      // });
      // const data = await response.json();
      
      // Используем заглушки
      setTimeout(() => {
        setProfile(mockProfile);
        setCurrentIssues(mockIssues.filter(issue => issue.status === 'active'));
        setVideoRecorders(mockVideoRecorders);
        setIsLoading(false);
        setRefreshing(false);
      }, 1000);
      
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось загрузить данные профиля');
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadProfileData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadProfileData();
  };

  const handleLogout = async () => {
    Alert.alert(
      'Выход из системы',
      'Вы уверены, что хотите выйти?',
      [
        { text: 'Отмена', style: 'cancel' },
        { 
          text: 'Выйти', 
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('user');
              router.replace('/(tabs)/login');
            } catch (error) {
              Alert.alert('Ошибка', 'Не удалось выйти из системы');
            }
          }
        }
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert('Редактирование', 'Редактирование профиля будет доступно позже');
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <ThemedText style={styles.loadingText}>Загрузка профиля...</ThemedText>
      </View>
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/mosgortrans_logo.png')}
          style={styles.reactLogo}
        />
      }
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <StatusBar style="light" />
      
      {/* Заголовок профиля */}
      <ThemedView style={styles.headerContainer}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {profile?.firstName?.[0]}{profile?.lastName?.[0]}
            </Text>
          </View>
        </View>
        
        <ThemedText type="title" style={styles.userName}>
          {profile?.firstName} {profile?.lastName}
        </ThemedText>
        
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>
            {profile?.roleName === 'admin' ? 'Администратор' : 'Оператор'}
          </Text>
        </View>
        
        <Text style={styles.userLogin}>@{profile?.username}</Text>
      </ThemedView>

      {/* Кнопки действий */}
      <ThemedView style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleEditProfile}>
          <Text style={styles.actionButtonText}>Редактировать профиль</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.logoutButton]} 
          onPress={handleLogout}
        >
          <Text style={[styles.actionButtonText, styles.logoutButtonText]}>Выйти</Text>
        </TouchableOpacity>
      </ThemedView>

      {/* Информация о пользователе */}
      <ThemedView style={styles.infoContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Информация о пользователе
        </ThemedText>
        
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>ID пользователя</Text>
            <Text style={styles.infoValue}>{profile?.id}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Логин</Text>
            <Text style={styles.infoValue}>{profile?.username}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Имя</Text>
            <Text style={styles.infoValue}>{profile?.firstName}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Фамилия</Text>
            <Text style={styles.infoValue}>{profile?.lastName}</Text>
          </View>
          
          {profile?.middleName && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Отчество</Text>
              <Text style={styles.infoValue}>{profile.middleName}</Text>
            </View>
          )}
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Роль</Text>
            <Text style={styles.infoValue}>
              {profile?.roleName === 'admin' ? 'Администратор' : 'Оператор'}
            </Text>
          </View>
        </View>
      </ThemedView>

      {/* Активные выдачи */}
      <ThemedView style={styles.issuesContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Активные выдачи ({currentIssues.length})
        </ThemedText>
        
        {currentIssues.length > 0 ? (
          currentIssues.map(issue => (
            <View key={issue.id} style={styles.issueCard}>
              <Text style={styles.issueTitle}>Выдача #{issue.id}</Text>
              <Text style={styles.issueText}>
                Дата выдачи: {new Date(issue.issueDate).toLocaleDateString('ru-RU')}
              </Text>
              <Text style={styles.issueText}>
                Видеорегистратор: {videoRecorders.find(vr => vr.id === issue.videoRecorderId)?.number || 'Неизвестно'}
              </Text>
              <TouchableOpacity style={styles.returnButton}>
                <Text style={styles.returnButtonText}>Вернуть</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Нет активных выдач</Text>
        )}
      </ThemedView>

      {/* Доступные видеорегистраторы */}
      <ThemedView style={styles.recordersContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Видеорегистраторы
        </ThemedText>
        
        <View style={styles.recordersStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {videoRecorders.filter(vr => vr.status === 'available').length}
            </Text>
            <Text style={styles.statLabel}>Доступно</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {videoRecorders.filter(vr => vr.status === 'issued').length}
            </Text>
            <Text style={styles.statLabel}>Выдано</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{videoRecorders.length}</Text>
            <Text style={styles.statLabel}>Всего</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllButtonText}>Просмотреть все</Text>
        </TouchableOpacity>
      </ThemedView>

      {/* Техническая информация */}
      <ThemedView style={styles.debugContainer}>
        <Text style={styles.debugTitle}>Отладочная информация</Text>
        <Text style={styles.debugText}>
          Токен: {profile?.token ? 'Присутствует' : 'Отсутствует'}
        </Text>
        <Text style={styles.debugText}>
          Загружено выдач: {currentIssues.length}
        </Text>
        <Text style={styles.debugText}>
          Видеорегистраторов: {videoRecorders.length}
        </Text>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#4A90E2',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  userName: {
    color: '#fff',
    fontSize: 28,
    marginBottom: 8,
  },
  roleBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 8,
  },
  roleText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  userLogin: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
  },
  actionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  logoutButtonText: {
    color: '#FF3B30',
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#1a1a1a',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoItem: {
    width: '48%',
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  issuesContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  issueCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  issueTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
  },
  issueText: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 4,
  },
  returnButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#28a745',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 8,
  },
  returnButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6c757d',
    fontSize: 14,
    padding: 20,
  },
  recordersContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  recordersStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  viewAllButton: {
    backgroundColor: '#6c757d',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewAllButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  debugContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  debugTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 8,
  },
  debugText: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 4,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});