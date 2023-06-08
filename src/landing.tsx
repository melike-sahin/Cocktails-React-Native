import { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, StyleSheet, View } from 'react-native';
import { deleteItemAsync, setItemAsync, getItemAsync } from 'expo-secure-store';

const Landing = ({ navigation }: { navigation: any }): JSX.Element => {
    const [text, setText] = useState<string>('');
    const [name, setName] = useState<null | string>(null);

    const saveText: string = 'Save';
    const deleteText: string = 'Change name';
    const nextText: string = 'Next';
    const key: string = 'name';

    const saveName = async () => {
        await setItemAsync(key, text);
        getName();
    };

    const getName = async () => {
        const retrievedName = await getItemAsync(key);
        setName(retrievedName);
    }

    const deleteName = async () => {
        await deleteItemAsync(key);
        getName();
    }

    const moveNext = () => navigation.navigate('Home');

    useEffect(() => {
        getName();
    }, []);

    return (
        <View style={styles.container}>
            {!name ?
                <>
                    <TextInput
                        style={styles.input}
                        onChangeText={setText}
                        value={text}
                        autoFocus={true}
                        onSubmitEditing={saveName}
                    />
                    <Pressable style={styles.button} onPress={saveName}>
                        <Text style={styles.text}>{saveText}</Text>
                    </Pressable>
                </>
                :
                <>
                    <Text style={styles.welcomeText}>
                        Welcome back, {name} !
                    </Text>
                    <Pressable style={styles.button} onPress={moveNext}>
                        <Text style={styles.text}>{nextText}</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={deleteName}>
                        <Text style={styles.text}>{deleteText}</Text>
                    </Pressable>
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
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
    welcomeText: {
        fontSize: 21,
        color: 'black',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: '#3d9970',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Landing;