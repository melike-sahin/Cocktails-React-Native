import { useEffect, useState } from "react";
import { getCocktailsFromApiAsync } from "../services";
import { Urls } from "../services/urls";
import { View, StyleSheet, Text, TextInput, Pressable, FlatList, Keyboard } from "react-native";
import { Cocktail } from "../services/datatypes";

const SearchCocktail = ({ navigation }: { navigation: any }): JSX.Element => {

    const searchText: string = 'Search';
    const [text, setText] = useState<string>('');
    const [data, setData] = useState<null | string | Cocktail[]>(null);

    const isString = (data: any): data is String => {
        return typeof data === 'string' || data instanceof String
    }

    const getData = async () => {
        Keyboard.dismiss();
        const fetchedData = await getCocktailsFromApiAsync(Urls.SearchCocktailUrl, text);
        setData(fetchedData);
    }

    const renderItem = ({ item }: { item: string }) => (
        <Pressable onPress={() => {
            navigation.navigate('Id Cocktail',
                { cocktailId: data && !isString(data) && data.find(el => el.cocktailName === item)?.cocktailId })
        }}>
            <View style={styles.item}>
                <Text style={styles.textItem}>{item}</Text>
            </View>
        </Pressable>
    )

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setText}
                value={text}
                autoFocus={true}
                onSubmitEditing={getData}
            />
            <Pressable style={styles.button} onPress={getData}>
                <Text style={styles.text}>{searchText}</Text>
            </Pressable>
            {data && !isString(data) &&
                <View style={styles.list}>
                    <FlatList data={data.map(el => el.cocktailName)}
                        renderItem={renderItem}
                        keyExtractor={(item: string, index: number) => index.toString()}
                    />
                </View>
            }
            {data && isString(data) &&
                <Text style={styles.noData}>{data}</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: '#99423d',
        color: 'white',
        paddingVertical: 5,
        paddingHorizontal: 10,
        width: '50%',
        borderRadius: 5,
        fontSize: 16,
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: 'black',
        marginTop: 15,
        borderRadius: 5,
    },
    text: {
        fontSize: 16,
        color: 'white',
    },
    list: {
        marginTop: 20,
        maxHeight: 160,
    },
    item: {
        margin: 5,
        padding: 10,
        backgroundColor: '#3d9970',
        borderRadius: 4,
        borderWidth: 3,
        borderColor: '#99423d',
    },
    textItem: {
        textAlign: 'center',
        color: 'white',
    },
    noData: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#993d94',
        marginTop: 15,
    }
});
export default SearchCocktail;