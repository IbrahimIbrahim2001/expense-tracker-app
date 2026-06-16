import type { FilterState } from '@/hooks/useFilter';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

interface FilterBottomSheetProps {
    visible: boolean;
    onClose: () => void;
    filters: FilterState;
    setFilters: (filters: FilterState) => void;
    availableCategories: string[];
    availablePaymentWays: string[];
    onReset: () => void;
    hasActiveFilters: boolean;
}

export default function FilterBottomSheet({
    visible,
    onClose,
    filters,
    setFilters,
    availableCategories,
    availablePaymentWays,
    onReset,
    hasActiveFilters,
}: FilterBottomSheetProps) {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['75%', '90%'], []);

    const handleSheetChanges = useCallback(
        (index: number) => {
            if (index === -1) onClose();
        },
        [onClose],
    );

    useMemo(() => {
        if (visible) {
            bottomSheetModalRef.current?.present();
        } else {
            bottomSheetModalRef.current?.dismiss();
        }
    }, [visible]);

    const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
        setFilters({ ...filters, [key]: value });
    };

    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enablePanDownToClose
            backgroundStyle={{ backgroundColor: '#162544' }}
            handleIndicatorStyle={{ backgroundColor: '#ffffff40' }}
            backdropComponent={(props) => (
                <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior="close" />
            )}
        >
            <View className="flex-row items-center justify-between px-5 pb-3 border-b border-[#0f1d33] bg-[#162544]">
                <Text className="text-lg font-semibold text-white">Filters</Text>
                <View className="flex-row items-center gap-3">
                    {hasActiveFilters && (
                        <TouchableOpacity onPress={onReset}>
                            <Text className="text-red-400 text-sm font-medium">Reset</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={22} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <BottomSheetScrollView className="flex-1 px-5 pt-4 pb-6 bg-[#162544]">
                <Text className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-3">Type</Text>
                <View className="flex-row gap-2 mb-6">
                    {(['all', 'income', 'expense'] as const).map((type) => (
                        <TouchableOpacity
                            key={type}
                            onPress={() => updateFilter('type', type)}
                            className={`px-4 py-2 rounded-full ${filters.type === type ? 'bg-[#2a4b8c]' : 'bg-gray-100'}`}
                        >
                            <Text className={`text-sm font-medium ${filters.type === type ? 'text-white' : 'text-gray-600'}`}>
                                {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-3">Amount Range</Text>
                <View className="flex-row items-center gap-3 mb-6">
                    <View className="flex-1 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                        <Text className="text-xs text-gray-400 mb-1">Min</Text>
                        <TextInput
                            value={filters.amountMin}
                            onChangeText={(v) => updateFilter('amountMin', v)}
                            placeholder="0"
                            placeholderTextColor="#d1d5db"
                            keyboardType="decimal-pad"
                            className="text-gray-800 text-base p-0"
                        />
                    </View>
                    <Text className="text-gray-300 mt-6">—</Text>
                    <View className="flex-1 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                        <Text className="text-xs text-gray-400 mb-1">Max</Text>
                        <TextInput
                            value={filters.amountMax}
                            onChangeText={(v) => updateFilter('amountMax', v)}
                            placeholder="999"
                            placeholderTextColor="#d1d5db"
                            keyboardType="decimal-pad"
                            className="text-gray-800 text-base p-0"
                        />
                    </View>
                </View>

                <Text className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-3">Category</Text>
                <View className="flex-row flex-wrap gap-2 mb-6">
                    {availableCategories.map((cat) => {
                        const selected = filters.categories.includes(cat);
                        return (
                            <TouchableOpacity
                                key={cat}
                                onPress={() =>
                                    setFilters({
                                        ...filters,
                                        categories: selected
                                            ? filters.categories.filter((c) => c !== cat)
                                            : [...filters.categories, cat],
                                    })
                                }
                                className={`px-4 py-2 rounded-full ${selected ? 'bg-[#2a4b8c]' : 'bg-gray-100'}`}
                            >
                                <Text className={`text-sm font-medium ${selected ? 'text-white' : 'text-gray-600'}`}>{cat}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <Text className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-3">Payment Way</Text>
                <View className="flex-row flex-wrap gap-2 mb-6">
                    {availablePaymentWays.map((pw) => {
                        const selected = filters.paymentWays.includes(pw);
                        return (
                            <TouchableOpacity
                                key={pw}
                                onPress={() =>
                                    setFilters({
                                        ...filters,
                                        paymentWays: selected
                                            ? filters.paymentWays.filter((p) => p !== pw)
                                            : [...filters.paymentWays, pw],
                                    })
                                }
                                className={`px-4 py-2 rounded-full ${selected ? 'bg-[#2a4b8c]' : 'bg-gray-100'}`}
                            >
                                <Text className={`text-sm font-medium ${selected ? 'text-white' : 'text-gray-600'}`}>{pw}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

            </BottomSheetScrollView>
        </BottomSheetModal>
    );
}
