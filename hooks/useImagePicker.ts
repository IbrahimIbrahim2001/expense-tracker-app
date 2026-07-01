import { uploadAvatar } from '@/api/upload-avatar';
import * as ImagePicker from 'expo-image-picker';
import { MediaType } from 'expo-image-picker';
import { Alert } from 'react-native';
import { useState } from 'react';

interface UseImagePickerOptions {
    mediaTypes?: MediaType | MediaType[] | undefined;
    allowsEditing?: boolean;
    aspect?: [number, number];
    quality?: number;
}

export const useImagePicker = (options: UseImagePickerOptions = {}) => {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const {
        mediaTypes = ['images'],
        allowsEditing = true,
        aspect = [1, 1],
        quality = 0.8,
    } = options;

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes,
            allowsEditing,
            aspect,
            quality,
        });

        if (result.canceled) return;

        const uri = result.assets[0].uri;
        setImageUri(uri);

        setIsUploading(true);

        const uploadResult = await uploadAvatar(uri);

        setIsUploading(false);

        if (uploadResult.success) {
            Alert.alert('Success', uploadResult.message);
        } else {
            Alert.alert('Error', uploadResult.message);
        }
    };

    return { imageUri, setImageUri, pickImage, isUploading };
};
