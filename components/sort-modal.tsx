import type { SortKey, SortOption } from '@/hooks/useSort';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';

interface SortModalProps {
    visible: boolean;
    onClose: () => void;
    options: SortOption[];
    selected: SortKey;
    onSelect: (key: SortKey) => void;
}

export default function SortModal({ visible, onClose, options, selected, onSelect }: SortModalProps) {
    return (
        <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
            <Pressable className="flex-1" onPress={onClose}>
                <View className="flex-1 justify-center px-8">
                    <View className="rounded-2xl overflow-hidden bg-[#162544]">
                        <View className="px-5 pt-5 pb-3">
                            <Text className="text-gray-500 text-xs font-medium tracking-wider uppercase">Sort by</Text>
                        </View>
                        {options.map((opt, index) => (
                            <TouchableOpacity
                                key={opt.key}
                                onPress={() => {
                                    onSelect(opt.key);
                                    onClose();
                                }}
                                className="flex-row items-center px-5 py-4"
                            >
                                <Ionicons
                                    name={opt.icon}
                                    size={20}
                                    color={selected === opt.key ? '#2a4b8c' : '#9ca3af'}
                                />
                                <Text
                                    className={`flex-1 ml-3 text-base ${selected === opt.key ? 'text-[#2a4b8c] font-semibold' : 'text-gray-700'}`}
                                >
                                    {opt.label}
                                </Text>
                                {selected === opt.key && (
                                    <Ionicons name="checkmark-circle" size={20} color="#2a4b8c" />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
}
