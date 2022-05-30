import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRoute } from '@react-navigation/native';
import { StatusBar } from "expo-status-bar";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const Details = ( {navigation} ) => {
  const [produk, setProduk] = useState([]);
  const route = useRoute();
  // const [to, setTo] = useState = ("id");
  // const [from, setFrom] = useState = ("en");
  const [teksHasilTranslate, setTeksHasilTranslate] = useState("");
 
  useEffect(() => {
    getData();
    getTranslate();
  }, []);

  async function getData() {
    await axios.get('http://www.omdbapi.com/?i='+ route.params.pencarianID +'&apikey=94a3c0c').then(function (response) {
      const temp = [ (response.data) ]
      setProduk(temp);
      console.log(temp);
    });
  }
  // curl -X GET "https://libretranslate.de/languages" -H  "accept: application/json"
  const getTranslate = () => {
    axios.get('https://libretranslate.de/languages',
    {headers: {'accept': 'application/json'}}).then(res=>{
      console.log(res.data);
    })
  }

  const translate = () => {

  }

  return(
    <View style={{flex: 1, backgroundColor: '#1C1C25'}}>
      <StatusBar style="light" />
      <View style={{height: '10%', backgroundColor: '#1C1C25', flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity style={{
          // borderWidth: 1,
          // borderColor: 'white',
          height: '100%',
          width: '15%',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
        onPress={() => navigation.goBack()}>
          <Ionicons name="ios-chevron-back" color="gray" size={40} />
        </TouchableOpacity>
        <TouchableOpacity style={{
          // borderWidth: 1,
          // borderColor: 'white',
          height: '100%',
          width: '15%',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('Movies')}>
          <AntDesign name="home" color="gray" size={40} />
        </TouchableOpacity>
      </View>
      <View style={{
        // borderWidth: 1,
        // borderColor: 'white',
        height: '40%',
      }}>
        <FlatList
          data={produk}
          renderItem={({item}) => 
          <Image
            source={{ uri: item.Poster }}
            style={{ height: 500, width: 400, resizeMode: 'cover', 
              justifyContent: 'center',
              alignItems: 'center',}}>
          </Image>
          }
        />
      </View>
      <View style={{
        // borderWidth: 1,
        // borderColor: 'white',
        height: '50%',
        paddingHorizontal: '5%'
      }}>
        <FlatList
          data={produk}
          renderItem={({item}) => 
            <View style={{flex: 1}}>
              <View style={{
                // borderWidth: 1,
                // borderColor: 'white',
                height: 70,
                borderBottomWidth: 1,
                borderColor: 'gray',
              }}>
                <Text Text style={{
                  color: 'white',
                  fontSize: 25,
                }}>{item.Title} ({item.Year})</Text>
                <Text style={{fontSize: 15, color: 'gray'}}>{item.Genre}</Text>
              </View>
              <View style={{
                // borderWidth: 1,
                // borderColor: 'white',
                height: 65,
                flexDirection: 'row',
                marginTop: 5,
              }}>
                <View style={{
                // borderWidth: 1,
                // borderColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                width: '33%'}}>
                  <Text style={{
                    fontSize: 25,
                    color: 'green'
                  }}>{item.Metascore}</Text>
                  <Text style={{
                    fontSize: 15,
                    color: 'white'}}>Metascore</Text>
                </View>
                <View style={{
                // borderWidth: 1,
                // borderColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                width: '34%'}}>
                  <AntDesign name="star" color="yellow" size={25} />
                  <Text style={{
                    fontSize: 15,
                    color: 'white'}}>{item.imdbRating}/10</Text>
                </View>
                <View style={{
                // borderWidth: 1,
                // borderColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                width: '33%'}}>
                  <AntDesign name="staro" color="gray" size={25} />
                  <Text style={{
                    fontSize: 15,
                    color: 'white'}}>Rate This</Text>
                </View>
              </View>
              <View>
                <Text Text style={{
                  color: 'white',
                  fontSize: 25,
                  marginTop: 10,
                  marginBottom: 10,
                }}>Synopsis</Text>
              </View>
              <View>
                <Text style={{
                  color: 'gray',
                  fontSize: 18,
                }}>{item.Plot}</Text>
              </View>
            </View>
            }
        />
      </View>
    </View>
  )
};

export default Details;
