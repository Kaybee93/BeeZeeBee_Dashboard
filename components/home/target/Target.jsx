import { View, Text } from "react-native";
import { useRouter } from "expo-router";

import { SIZES, COLORS } from '../../../constants'
import { TradeOverview, AccountOverview} from '../..'

const Target = () => {
    const router = useRouter();

    return (

        <View style={{ flex:1, backgroundColor: COLORS.lightWhite}}>
            <Text>Target Screen</Text>
        </View>
    )
}

export default Target