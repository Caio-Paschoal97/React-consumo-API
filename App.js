import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, Image, TouchableOpacity, 
  ScrollView, Linking, ActivityIndicator, Alert 
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  // Equivalente ao window.addEventListener('load')
  useEffect(() => {
    obterLocalizacao();
  }, []);

  const obterLocalizacao = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setLocationError('Permissão de localização negada.');
      return;
    }

    try {
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    } catch (error) {
      setLocationError('Erro ao buscar localização.');
    }
  };

  const getAnime = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.jikan.moe/v4/random/anime");
      if (!response.ok) throw new Error("Erro na API");
      
      const json = await response.json();
      setAnime(json.data);
    } catch (error) {
      Alert.alert("Erro", "Falha na API. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const openMyAnimeList = (url) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  const synopsisText = anime?.synopsis 
    ? anime.synopsis.substring(0, 200) + "..." 
    : "Sem descrição disponível.";

  return (
    <ScrollView contentContainerStyle={styles.body}>
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🎌 Maratone este Anime</Text>
          <Text style={styles.subtitle}>Descubra sua próxima aventura japonesa</Text>
        </View>

        {/* Hero Section */}
        <Image 
          source={{ uri: "https://gyabbo.wordpress.com/wp-content/uploads/2020/12/b68f4-hara-hetta.jpg?w=584" }} 
          style={styles.mainBanner} 
        />
        <Text style={styles.instruction}>Clique no botão para sortear um anime aleatório!</Text>
        
        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={getAnime} 
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sortear Anime 🎲</Text>
          )}
        </TouchableOpacity>

        {/* Anime Card */}
        {anime && (
          <View style={styles.animeCard}>
            <Text style={styles.animeTitle}>{anime.title}</Text>
            <Image 
              source={{ uri: anime.images.jpg.image_url }} 
              style={styles.animeImg} 
              resizeMode="cover"
            />
            
            <View style={styles.infoGrid}>
              <View style={styles.badge}><Text style={styles.badgeText}>🎬 {anime.episodes ?? "?"} eps</Text></View>
              <View style={styles.badge}><Text style={styles.badgeText}>⭐ {anime.score ?? "N/A"}</Text></View>
            </View>

            <Text style={styles.synopsis}>{synopsisText}</Text>
            
            <TouchableOpacity onPress={() => openMyAnimeList(anime.url)}>
              <Text style={styles.malLink}>Ver no MyAnimeList →</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Mapa Container */}
        <View style={styles.mapContainer}>
          {locationError ? (
            <Text style={styles.geoInfoError}>📍 {locationError}</Text>
          ) : location ? (
            <>
              <Text style={styles.geoInfo}>
                📍 Localização Ativa (Lat {location.latitude.toFixed(2)})
              </Text>
              <MapView 
                style={styles.map} 
                initialRegion={location}
                showsUserLocation={true}
              >
                <Marker 
                  coordinate={location} 
                  title="Você está aqui maratonando! 🎌" 
                />
              </MapView>
            </>
          ) : (
            <Text style={styles.geoInfo}>📍 Buscando sua localização...</Text>
          )}
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    flexGrow: 1,
    backgroundColor: '#0f172a', // Background escuro original
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  container: {
    width: '100%',
    maxWidth: 550,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff4d4d',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
  },
  mainBanner: {
    width: '100%',
    height: 150,
    borderRadius: 15,
    marginBottom: 15,
  },
  instruction: {
    color: '#f1f5f9',
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#ff4d4d',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  animeCard: {
    marginTop: 25,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    width: '100%',
  },
  animeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f1f5f9',
    textAlign: 'center',
    marginBottom: 15,
  },
  animeImg: {
    width: 200,
    height: 280,
    borderRadius: 12,
    marginBottom: 15,
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  badgeText: {
    color: '#f1f5f9',
    fontSize: 12,
  },
  synopsis: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 22,
    textAlign: 'justify',
    marginBottom: 15,
  },
  malLink: {
    color: '#ff4d4d',
    fontSize: 14,
    fontWeight: 'bold',
  },
  mapContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
  },
  map: {
    height: 200,
    width: '100%',
    borderRadius: 10,
    marginTop: 10,
  },
  geoInfo: {
    fontSize: 12,
    color: '#4ade80',
    fontWeight: 'bold',
  },
  geoInfoError: {
    fontSize: 12,
    color: '#ff4d4d',
    fontWeight: 'bold',
  }
});