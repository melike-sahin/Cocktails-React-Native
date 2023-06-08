import React, { useEffect, useState } from "react";
import { Cocktail } from "../../services/datatypes";
import { getCocktailsFromApiAsync } from "../../services/index";
import { Urls } from "../../services/urls";
import { Image, Text, StyleSheet, View, FlatList, Pressable } from "react-native";

const CommonCocktail = ({ url, cocktailId }: { url: Urls, cocktailId?: string }): JSX.Element => {
    const changeText: string = 'Another one !'
    const [data, setData] = useState<null | undefined | Cocktail>(null);

    const getData = async () => {
        const fetchedData = await getCocktailsFromApiAsync(url, cocktailId);
        setData(fetchedData);
    }

    const renderItem = ({ item }: { item: string }) => (
        <View style={styles.item}>
            <Text style={styles.textItem}>{item}</Text>
        </View>
    )

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            {data &&
                <View style={styles.container}>
                    <Text style={styles.text}>{data.cocktailName}</Text>
                    <Image style={styles.image}
                        source={{
                            uri: data.cocktailImageLink
                        }} />
                    <View style={styles.list}>
                        <FlatList data={data.cocktailIngredients}
                            renderItem={renderItem}
                            keyExtractor={(item: string, index: number) => index.toString()}
                        />
                    </View>
                    {!cocktailId &&
                        <Pressable style={styles.button} onPress={() => getData()}>
                            <Text style={styles.buttonText}>{changeText}</Text>
                        </Pressable>
                    }
                </View>
            }
        </>
    )
}

export default CommonCocktail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 22,
        color: 'black',
        fontWeight: 'bold',
    },
    image: {
        marginTop: 15,
        width: 200,
        height: 200,
        borderColor: '#3d9970',
        borderWidth: 3,
    },
    list: {
        marginTop: 15,
        maxHeight: 100,
    },
    item: {
        margin: 5,
        padding: 10,
        backgroundColor: '#99423d',
        borderRadius: 4,
    },
    textItem: {
        textAlign: 'center',
        color: 'white',
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: 'black',
        marginTop: 15,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
    }
})

