import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import axios from 'axios';
import { useEffect, useState } from 'react';

const API_URL =
  'https://api.oceandrivers.com:443/v1.0/getAemetStation/jfksdjfjfksdjfjkfdjkjfkdfjkfdjskfdjfksjfk/lastdata/';

interface IResponse {
  data: {
    TEMPERATE: number;
    TWD: number;
    PRESSURE: number;
    RAIN_MONTH: Number;
    RAIN_DAY: 0;
    RAIN: 0;
    HUMIDITY: Number;
  };
}

export default function TabOneScreen() {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<IResponse | null>(null);
  const fetchData = async () => {
    const res = await axios.get(API_URL);
    setResponse(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>
        <Text>{response?.data.PRESSURE}</Text>
        {JSON.stringify(response, null, 2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
