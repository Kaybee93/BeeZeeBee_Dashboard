import { View, ScrollView, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";

import { COLORS, SIZES } from '../../../constants'
import { TradeOverview, AccountOverview} from '../../../components'

const TradeView = () => {
    const router = useRouter();

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View style={{ padding: SIZES.medium }}>
                    <AccountOverview/>
                </View>
                <View style={{ flex:1, padding: SIZES.medium }}>
                    <TradeOverview/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default TradeView