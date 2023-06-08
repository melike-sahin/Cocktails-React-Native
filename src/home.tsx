import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import RandomCocktail from "./randomCocktail";
import SearchCocktail from "./searchCocktail";

const Home = (): JSX.Element => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: any;

                    if (route.name === 'Random Cocktail') {
                        iconName = focused
                            ? 'flash'
                            : 'flash-outline';
                    } else if (route.name === 'Search Cocktail') {
                        iconName = focused ? 'search' : 'search-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#3d9970',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Random Cocktail" component={RandomCocktail}
                options={{ headerStyle: { backgroundColor: '#3d9970' }, headerTitleStyle: { color: 'white' }, headerTitleAlign: 'center' }} />
            <Tab.Screen name="Search Cocktail" component={SearchCocktail}
                options={{ headerStyle: { backgroundColor: '#3d9970' }, headerTitleStyle: { color: 'white' }, headerTitleAlign: 'center' }} />
        </Tab.Navigator>
    );
}

export default Home;