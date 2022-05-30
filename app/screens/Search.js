import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import { useRoute } from '@react-navigation/native';

const Search = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [search, onChangeSearch] = React.useState("");
  const [data, setData] = useState();
  const [pencarianID, setPencarianID] = useState();
  const route = useRoute();

  useEffect( () => {
    ambilData();
  }, []);

  const ambilData = async () => {
    try {
      const res = await axios.get("http://www.omdbapi.com", {
        params: {
          s: route.params.PencarianJudul,
          apikey: "94a3c0c",
        },
      });
      setData(res.data.Search);
      console.log(res);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
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
      <ScrollView style={{backgroundColor: "gray"}}>
        {data &&
          data.map((item, i) => {
            return (
              <>
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    style={{
                      // borderWidth: 1,
                      // borderColor: "white",
                      height: 260,
                      width: '100%',
                    }}
                    onPress={ () => navigation.navigate('Details' , {
                      pencarianID : item.imdbID
                    })}
                  >
                    <View style={styles.PosterPosition}>
                      <Image
                        source={{ uri: item.Poster }}
                        style={{ height: 260, width: '100%', resizeMode: 'cover'}}>
                          {/* <LinearGradient 
                            colors={['#00000000', '#000000']} 
                            style={{height : '100%', width : '100%'}}>
                          </LinearGradient> */}
                        </Image>
                    </View>
                  </TouchableOpacity>
                </View>
              </>
            );
          })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  BoxList: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },

  MovieTitle: {
    fontWeight: "bold",
    fontSize: 17,
  },

  MovieYear: {
    fontWeight: "500",
    fontSize: 12,
    justifyContent: "flex-start",
  },

  PosterPosition: {
    justifyContent: "center",
    alignItems: "center",
  },

  BoxSearch: {
    paddingHorizontal: "20%",
    paddingBottom: 2,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "black",
    justifyContent: "center",
    flexDirection: "row",
  },

  FormSearch: {
    backgroundColor: "white",
    width: "70%",
    justifyContent: "flex-start",
    fontSize: 15,
    marginLeft: "5%",
  },

  MiniBoxSearch: {
    // borderWidth: 1,
    // backgroundColor: "white",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },

  HeaderText: {
    fontSize: 24,
    color: "#0080ff",
    fontWeight: "bold",
  },

  Header: {
    height: "10%",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },

  TopNav: {
    backgroundColor: "black",
    height: "4%",
  },
  ScrollSearch: {
    height: "100%",
    backgroundColor: "black",
  },
});

export default Search;
