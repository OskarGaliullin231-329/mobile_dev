import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { HelloWave } from '@/components/hello-wave';

export default function IssuanceReturnScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Пример данных о выдачах/возвратах (заглушка)
  const transactions = [
    { id: 1, type: 'Выдача', employee: 'Иван Петров', recorder: 'DVR-1000', date: '2024-01-10' },
    { id: 2, type: 'Возврат', employee: 'Мария Сидорова', recorder: 'DVR-2000', date: '2024-01-12' },
    { id: 3, type: 'Выдача', employee: 'Алексей Иванов', recorder: 'DVR-3000', date: '2024-01-15' },
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
        <ThemedText type="title">Выдача/Возврат</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* Кнопки действий */}
      <ThemedView style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.tint }]}>
          <Text style={styles.actionButtonText}>Выдать устройство</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#28a745' }]}>
          <Text style={styles.actionButtonText}>Принять возврат</Text>
        </TouchableOpacity>
      </ThemedView>

      {/* Список транзакций */}
      <ThemedView style={[styles.listContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <ThemedText type="subtitle" style={styles.listTitle}>
          Последние операции: {transactions.length}
        </ThemedText>

        <ScrollView style={styles.scrollView}>
          {transactions.map((transaction) => (
            <View key={transaction.id} style={[styles.transactionCard, { backgroundColor: colorScheme === 'dark' ? '#374151' : '#f8f9fa', borderColor: colors.border }]}>
              <View style={styles.transactionInfo}>
                <Text style={[styles.transactionType, { color: colors.text }]}>{transaction.type}</Text>
                <Text style={[styles.transactionDetails, { color: colorScheme === 'dark' ? '#d1d5db' : '#495057' }]}>
                  {transaction.employee} - {transaction.recorder}
                </Text>
                <Text style={[styles.transactionDate, { color: colorScheme === 'dark' ? '#9ca3af' : '#6c757d' }]}>{transaction.date}</Text>
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
  actionButton: {
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionButtonText: {
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
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  transactionDetails: {
    fontSize: 14,
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
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
