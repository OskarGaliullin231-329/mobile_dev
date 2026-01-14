import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleLogin = async () => {
    if (!username.trim()) {
      Alert.alert('Ошибка', 'Введите имя пользователя');
      return;
    }

    setLoading(true);

    // Заглушка: вход только для "администратор системный"
    if (username.trim() === 'администратор системный') {
      try {
        await AsyncStorage.setItem('user', JSON.stringify({ username, loggedIn: true }));
        router.replace('/(tabs)');
      } catch (error) {
        Alert.alert('Ошибка', 'Не удалось сохранить данные');
      }
    } else {
      Alert.alert('Ошибка', 'Неверное имя пользователя');
    }

    setLoading(false);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/mosgortrans_logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Вход в систему
        </ThemedText>

        <View style={[styles.inputContainer, { borderColor: colors.border }]}>
          <Text style={[styles.label, { color: colors.text }]}>Имя пользователя</Text>
          <TextInput
            style={[styles.input, { color: colors.text, backgroundColor: colors.card }]}
            value={username}
            onChangeText={setUsername}
            placeholder="Введите имя пользователя"
            placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'}
            autoCapitalize="none"
          />
        </View>

        <View style={[styles.inputContainer, { borderColor: colors.border }]}>
          <Text style={[styles.label, { color: colors.text }]}>Пароль</Text>
          <TextInput
            style={[styles.input, { color: colors.text, backgroundColor: colors.card }]}
            value={password}
            onChangeText={setPassword}
            placeholder="Введите пароль"
            placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={[styles.loginButton, { backgroundColor: colors.tint }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.loginButtonText}>Войти</Text>
          )}
        </TouchableOpacity>

        <ThemedText style={styles.hint}>
          Для входа используйте: "администратор системный"
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    paddingVertical: 8,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  loginButton: {
    width: '100%',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  hint: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
    opacity: 0.7,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});