import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Pressable, StatusBar, TextInput} from 'react-native';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAweSome from 'react-native-vector-icons/FontAwesome';

const App = () => {
  const textInputRef = useRef<TextInput | null>(null);
  const [searchTest, setSearchTest] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    getApiData('https://jsonplaceholder.typicode.com/albums');
  }, []);

  const getApiData = async (URL: any) => {
    try {
      const getRequest = new Request(URL, {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const response = await fetch(getRequest);
      const json = await response.json();
      setData(json);
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };
  const searchFilterFunction = (searchTest: any) => {
    console.log(filteredData);
    setSearchTest(searchTest);
    if (searchTest) {
      const newData = data.filter((item: any) => {
        const itemData = `${item.id} ${item.title}`.toUpperCase();
        const textData = searchTest.toUpperCase();
        return itemData.includes(textData);
      });
      setFilteredData(newData);
      console.log(newData);
    } else {
      setFilteredData([]);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={'blue'} />
      <View style={{margin: 20, justifyContent: 'center'}}>
        <View
          style={{
            height: 60,

            borderWidth: 2,
            borderBlockColor: 'black',
            justifyContent: 'center',
            borderRadius: 10,
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon name="search1" size={25} color={'green'} style={{}} />
          <TextInput
            style={{
              height: 55,
              width: '80%',
              marginLeft: 10,
            }}
            ref={textInputRef}
            placeholder="Search here"
            onFocus={() => {
              setFocused(false);
            }}
            onBlur={() => {
              setFocused(true);
            }}
            value={searchTest}
            onChangeText={searchFilterFunction}
          />
          {searchTest !== '' ? (
            <Pressable
              onPress={() => {
                textInputRef?.current?.clear();
                setFilteredData([]);
                setSearchTest('');
              }}>
              <Icon name="close" size={20} />
            </Pressable>
          ) : (
            <FontAweSome name="microphone" size={25} />
          )}
        </View>
        <View style={{marginTop: 10}}>
          <FlatList
            data={filteredData}
            keyExtractor={(item: any) => item.id.toString()}
            renderItem={({item}) => (
              <View
                style={{
                  flexDirection: 'row',

                  backgroundColor: 'orange',
                  marginBottom: 10,
                  borderRadius: 10,
                  height: 40,
                  flexWrap: 'wrap',
                }}>
                <Text
                  style={{fontSize: 15, color: 'black', fontWeight: 'bold'}}>
                  {item.title}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
