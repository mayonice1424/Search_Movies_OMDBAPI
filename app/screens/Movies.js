import { StyleSheet, Text, View, ImageBackground, ScrollView, Image,  FlatList, ActivityIndicator, TextInput, TouchableOpacity} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import React, { useEffect, useState } from 'react';
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useRoute } from '@react-navigation/native';

const Movies = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataPopular, setDataPopular] = useState([]);
  const [pencarianID, setPencarianID] = useState();
  const [PencarianJudul, setPencarianJudul] = useState();
  const [search, onChangeSearch] = React.useState("");
  const simpanData = () => {
    if(search != "") {
      navigation.push('Search',{
        PencarianJudul : search,
      })
    } else {
      alert('Masukkan judul film!')
    }
    
}

  // const ambilData = async () => {
  //   try {
  //     const res = await axios.get("http://www.omdbapi.com", {
  //       params: {
  //         s: search,
  //         apikey: "94a3c0c",
  //       },
  //     });
  //     setData(res.data.Search);
  //     console.log(res);
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  const ambilDataRecent = async () => {
    try {
     const response = await fetch('http://www.omdbapi.com/?s=avenger&apikey=94a3c0c');
     const json = await response.json();
     setData(json.Search);
   } catch (error) {
     console.error(error);
   } finally {
     setLoading(false);
   }
 }
 const ambilDataPopular = async () => {
  try {
   const response = await fetch('https://www.omdbapi.com/?t=deadpool&apikey=94a3c0c');
   const json = await response.json();
   setDataPopular(json);
 } catch (error) {
   console.error(error);
 } finally {
   setLoading(false);
 }
}

    useEffect( () => {
      ambilDataRecent();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={{
        // borderWidth: 1, 
        // borderColor: 'white', 
        height: '15%', 
        width: '100%', 
        justifyContent: 'flex-end'}}>
        <Text style={{color: 'white', fontSize: 50}}>Search</Text>
      </View>
      <View style={{
        // borderWidth: 1, 
        // borderColor: 'white',
        height: '8%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: '5%'}}>
          <TextInput
            style={{
            borderBottomWidth: 1, 
            borderColor: '#4A4A54',
            height: '70%',
            width: '100%',
            color: 'gray',
            fontSize: 20,
            }}
            onChangeText={(text) => onChangeSearch(text)}
            value={search}
            placeholder="Movie Title"
          />
          <TouchableOpacity
            style={{paddingHorizontal: 5}}
            onPress={ () => simpanData()}>
            <FontAwesome5 name="search" color="gray" size={20} />
          </TouchableOpacity>
        </View>
        <View style={{
          // borderWidth: 1, 
          // borderColor: 'white', 
          height: '10%',
          width: '100%',
          justifyContent: 'center',
        }}>
          <Text style={{color: 'white', fontSize: 25}}>Recent</Text>
        </View>
            {isLoading ? <ActivityIndicator/> : (
            <FlatList
              data={data}
              style={{
                  // borderWidth: 1, 
                  // borderColor: 'white', 
              }}
              horizontal
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <TouchableOpacity style={{
                  // borderWidth: 1, 
                  // borderColor: 'white', 
                  height: 200,
                  width: 100,
                  marginRight: 30,
                  }}
                  onPress={ () => navigation.navigate('Details' , {
                      pencarianID : item.imdbID
                    })}>
                    <Image source={{uri: item.Poster}}
                    style={{
                      height: 150,
                      width: 100,
                      resizeMode: 'contain'}} />
                  <View style={{
                    justifyContent:'center'}}>
                    <Text style={{
                      color: 'white',
                      marginTop: 5,
                      fontSize: 15}}>{item.Title}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        <View style={{
          // borderWidth: 1, 
          // borderColor: 'white', 
          height: '10%',
          width: '100%',
          justifyContent: 'center',
        }}>
          <Text style={{color: 'white', fontSize: 25}}>Popular</Text>
        </View>
        <TouchableOpacity style={{
          // borderWidth: 1, 
          // borderColor: 'white', 
          height: '28%',
          flexDirection: 'row',
          justifyContent:'space-between',
        }}
          onPress={ () => navigation.navigate('Details' , {
            pencarianID : "tt1431045"
        })}>
          <View style={{
            // borderWidth: 1, 
            // borderColor: 'white', 
            height: '100%',
            width: '50%',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}>
            <Image source={{uri: 'https://m.media-amazon.com/images/M/MV5BYzE5MjY1ZDgtMTkyNC00MTMyLThhMjAtZGI5OTE1NzFlZGJjXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'}}
              style={{
                height: 175,
                width: 117,
                resizeMode: 'contain'}} />
              </View>
          <View style={{
            // borderWidth: 1, 
            // borderColor: 'white', 
            height: '100%',
            width: '50%',
          }}>
            <View style={{marginLeft: -20,}}>
              <View style ={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
                <Text style={{
                  // borderWidth: 1, 
                  // borderColor: 'white', 
                  fontSize: 25,
                  color: 'white',
                  marginTop: 5,
                  alignItems: 'flex-start',
                }}>Deadpool</Text>
                <View style={{flex: 1,
                alignItems: 'flex-end',
                }}>
                  <AntDesign name="star" color="yellow" size={20} 
                style={{
                  // borderWidth: 1, 
                  // borderColor: 'white', 
                  alignItems:'flex-end',
                  marginTop: 10,
                }}/>
                <Text style={{color: 'gray', fontSize: 18, marginTop: 10,
                  // borderWidth: 1, 
                  // borderColor: 'white', 
                  }}>
                    8.0/10
                </Text>
                </View>
              </View>
              <Text style={{
                fontSize: 15,
                color: 'white',
              }}>1h 48min</Text>
              <Text style={{
                fontSize: 12,
                color: 'gray',
                marginTop: 10,
              }}>Action, Adventure, Comedy</Text>
              <Text style={{
                fontSize: 12,
                color: 'gray',
                marginTop: 5,
              }}>A wisecracking mercenary gets experimented on and becomes immortal but ugly, and sets out to track down the man who ruined his looks.</Text>
            </View>
          </View>
        </TouchableOpacity>      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C25',
    paddingHorizontal: '5%',
  },
});

export default Movies;
