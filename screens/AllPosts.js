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
import Animated, { set } from "react-native-reanimated";
import APIService from "../ApiService";

import { COLORS, FONTS, SIZES, icons } from '../constants';


function AllPosts({navigation}) {
    const [posts, setPosts] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const onRefresh = React.useCallback(async () => {
        
        APIService.AllPostsView().then(res => {
            setPosts(res);
        })
        .catch(err => {
            console.log(err);
        })
    },[refreshing])
    useEffect(() => {
        
        APIService.AllPostsView().then(res => {
           setPosts(res);
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

    function renderCategoryData(posts) {
        const renderItem = ({ item }) => {
            return (
                <View style={{ marginVertical: SIZES.base }}>
                    <TouchableOpacity
                        style={{ flex: 1, flexDirection: 'row' }}
                        onPress={() => navigation.navigate("BookDetail", {
                            book: item
                        })}
                    >
                        {/* Book Cover */}
                        <Image
                            source={{
                                uri: `https://www.codethamizha.com${item.blog_image}`
                            }}
                            resizeMode="cover"
                            style={{ width: 200, height: 150, borderRadius: 10 }}
                        />

                        <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                            {/* Book name and author */}
                            <View>
                                <Text style={{ paddingRight: SIZES.padding, ...FONTS.h3, color: COLORS.white }}>{item.title}</Text>
                                <Text style={{ ...FONTS.p, color: COLORS.lightGray }}>{item.user.username}</Text>
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
                                <Text style={{ ...FONTS.body4, color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>{item.created_at.slice(0,10)}</Text>

                                <Image
                                    source={icons.read_icon}
                                    resizeMode="contain"
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: COLORS.lightGray
                                    }}
                                />
                                <Text style={{ ...FONTS.body4, color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>{item.aproved}</Text>
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
                    data={posts}
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
              <Text style={{ ...FONTS.h1, color: COLORS.white,marginLeft: SIZES.padding,marginTop:10 }}>Posts</Text>
                  {LineDivider()}
              </View>
            <ScrollView
            
            style={{ marginTop: SIZES.radius }}
            refreshControl={<RefreshControl refreshing={refreshing} 
            onRefresh={onRefresh} />} 
          >
               

                {/* Categories Section */}
                <View style={{ marginTop: SIZES.padding }}>
                    <View>
                        {renderCategoryData(posts)}
                    </View>
                </View>
            </ScrollView>
            
        </SafeAreaView>
    )
}

export default AllPosts
