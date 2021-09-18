import React, { useEffect } from "react";
import {
    RefreshControl,
    SafeAreaView,
    View,
    Linking,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList
} from 'react-native';
import { set } from "react-native-reanimated";
import APIService from "../ApiService";

import { COLORS, FONTS, SIZES, icons } from '../constants';

function AllEvents({navigation}) {
    const [events, setEvents] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(async () => {
        
        APIService.AllPostsView().then(res => {
            setEvents(res);
        })
        .catch(err => {
            console.log(err);
        })
    },[refreshing])
    useEffect(() => {
        
        APIService.AllEventsView().then(res => {
            setEvents(res);
        })
        .catch(err => {
            console.log(err);
        })
    },[])

    const LineDivider = () => {
        return (
            <View style={{ width: 1, paddingVertical: 0 }}>
                <View style={{ flex: 1, borderLeftColor: COLORS.white, borderLeftWidth: 1 }}></View>
            </View>
        )
    }
    function renderCategoryData(events) {
        const renderItem = ({ item }) => {
            return (
                <View style={{ marginVertical: SIZES.base }}>
                    <TouchableOpacity
                        style={{ flex: 1, flexDirection: 'row' }}
                        onPress={() => navigation.navigate("EventDetail", {
                            event: item
                        })}
                    >
                        {/* Book Cover */}
                        <Image
                            source={{
                                uri: `https://www.codethamizha.com${item.event_poster}`
                            }}
                            resizeMode="cover"
                            style={{ width: 200, height: 150, borderRadius: 10 }}
                        />

                        <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                            {/* Book name and author */}
                            <View>
                                <Text style={{ paddingRight: SIZES.padding, ...FONTS.h3, color: COLORS.white }}>{item.Title}</Text>
                                <Text style={{ ...FONTS.p, color: COLORS.lightGray }}>{item.teacher.username}</Text>
                            </View>

                            {/* Book Info */}
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    source={icons.page_filled_icon}
                                    resizeMode="contain"
                                    style={{
                                        width: 20,
                                        height: 50,
                                        tintColor: COLORS.lightGray
                                    }}
                                />
                                <Text style={{ ...FONTS.body4, color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>{item.event_date.slice(0,10)}</Text>

                                <Image
                                    source={icons.read_icon}
                                    resizeMode="contain"
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: COLORS.lightGray
                                    }}
                                />
                                <Text style={{ ...FONTS.body4, color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>{item.price}</Text>
                            </View>

                            {/* Genre */}
                            
                        </View>
                    </TouchableOpacity>

                    {/* Bookmark Button */}
                    <TouchableOpacity
                        style={{ position: 'absolute', top: 5, right: 15 }}
                        onPress={() => console.log("Bookmark")}
                    >
                        <Image
                            source={icons.bookmark_icon}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.lightGray
                            }}
                        />
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <View style={{ flex: 1, marginTop: SIZES.radius, paddingLeft: SIZES.padding }}>
                <FlatList
                    data={events}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
            <View>
              <Text style={{ ...FONTS.h1, color: COLORS.white,marginLeft: SIZES.padding,marginTop:10 }}>Events</Text>
                  {LineDivider()}
              </View>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={{ marginTop: SIZES.radius }}>
              
               

               {/* Categories Section */}
               <View style={{ marginTop: SIZES.padding }}>
                   <View>
                       {renderCategoryData(events)}
                   </View>
               </View>
           </ScrollView>
        </SafeAreaView>
    )
}

export default AllEvents
