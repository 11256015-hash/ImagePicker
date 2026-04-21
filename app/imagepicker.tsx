import { Image } from 'expo-image';
import * as ImagePickerLib from 'expo-image-picker';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ImagePickerScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    try {
      // 请求权限
      const permissionResult = await ImagePickerLib.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert('権限が必要です', 'メディアライブラリにアクセスする権限が必要です');
        return;
      }

      // 打开图片选择器
      const result = await ImagePickerLib.launchImageLibraryAsync({
        mediaTypes: ImagePickerLib.MediaType.IMAGES,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      // 如果用户选择了图片
      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('错误', '选择图片时出错');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Image 组件 */}
      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            {/* 占位符 */}
          </View>
        )}
      </View>

      {/* 按钮 */}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>📱 选择图片</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imageContainer: {
    marginBottom: 30,
    width: '100%',
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
