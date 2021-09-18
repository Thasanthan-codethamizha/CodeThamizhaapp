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

const LineDivider = () => {
    return (
        <View style={{ width: 1, paddingVertical: 18 }}>
            <View style={{ flex: 1, borderLeftColor: COLORS.lightGray, borderLeftWidth: 1 }}></View>
        </View>
    )
}

const Home = ({ navigation }) => {

    const [profile, setProfile] = React.useState();
    const [categories, setCategories] = React.useState();
    const [selectedCategory, setSelectedCategory] = React.useState(1);
    const [posts, setPosts] = React.useState([]);
    const [events, setEvents] = React.useState([]);
    const [currentuser, setCurrentuser] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [filterposts, setFilterposts] = React.useState([]);


    const onRefresh = React.useCallback(async () => {
        APIService.AllTopicsView()
        .then(res => {
            setCategories(res)
            if (res.length>0) {
                setSelectedCategory(res[0].id)
            }
        })
        .catch(err => console.log(err))

        APIService.AllEventsView()
        .then(res => {setEvents(res)})
        .catch(err => console.log(err))
        
        APIService.AllPostsView().then(res => {
            setPosts(res);
        })
        .catch(err => {
            console.log(err);
        })
        onSelectCategory()
    },[refreshing])

    
    useEffect(() => {
        APIService.AllTopicsView()
        .then(res => {
            setCategories(res)
            if (res.length>0) {
                setSelectedCategory(res[0].id)
            }
            
        
        })
        .catch(err => console.log(err))

        APIService.AllEventsView()
        .then(res => {setEvents(res)})
        .catch(err => console.log(err))
        
        APIService.AllPostsView().then(res => {
            setPosts(res);
        })
        .catch(err => {
            console.log(err);
        })
       
    },[])

    function renderHeader(profile) {
        return (
            <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: SIZES.padding, alignItems: 'center',marginTop:30 }}>
                {/* Greetings */}
                <View style={{ flex: 1 }}>
                    <View style={{ marginRight: SIZES.padding }}>
                        <Text style={{ ...FONTS.body4, color: COLORS.white }}>www.codethamizha.com</Text>
                        <Text style={{ ...FONTS.h1, color: COLORS.white }}>Code Thamizha</Text>
                    </View>
                </View>

                {/* Points */}
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.primary2,
                        
                        height: 40,
                        paddingLeft: 3,
                        paddingRight: SIZES.radius,
                        borderRadius: 20
                    }}
                    onPress={() => { Linking.openURL('https://www.codethamizha.com/') }}
                >
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 25, backgroundColor: 'rgba(255,255,255,0.5)' }}>
                            <Image
                                source={icons.check_icon}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20
                                }}
                            />
                        </View>

                        <Text style={{ marginLeft: SIZES.base, color: COLORS.white, ...FONTS.body3 }}> Visit</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    function renderButtonSection() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', padding: SIZES.padding }}>
                <View style={{ flexDirection: 'row', height: 70, backgroundColor: COLORS.secondary, borderRadius: SIZES.radius }}>
                    {/* Claim */}
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => Linking.openURL('https://discord.com/invite/5g4Zd4J')}
                    >
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={icons.discord_icon}
                                resizeMode="contain"
                                style={{
                                    width: 40,
                                    height: 40
                                }}
                            />
                            <Text style={{ marginLeft: SIZES.base, ...FONTS.body3, color: COLORS.white }}>Discord</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Divider */}
                    <LineDivider />

                    {/* Get Point */}
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => Linking.openURL('https://www.youtube.com/codethamizha')}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Image
                                source={icons.youtube_icon}
                                resizeMode="contain"
                                style={{
                                    width: 50,
                                    height: 50
                                }}
                            />
                            <Text style={{ marginLeft: SIZES.base, ...FONTS.body3, color: COLORS.white }}>YouTube</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Divider */}
                    <LineDivider />

                    {/* My Card */}
                   
                </View>
            </View>
        )
    }

    function renderMyBookSection(events) {

        const renderItem = ({ item, index }) => {
            return (
                <TouchableOpacity
                    style={{
                        flex: 1,
                        marginLeft: index == 0 ? SIZES.padding : 0,
                        marginRight: SIZES.radius
                    }}
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
                        style={{
                            width: 300,
                            height: 250,
                            borderRadius: 20
                        }}
                    />

                    {/* Book Info */}
                    <View style={{ marginTop: SIZES.radius, flexDirection: 'row', alignItems: 'center' }}>
                        
                    
                        <Image
                            source={icons.clock_icon}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.lightGray
                            }}
                        />
                        <Text style={{ marginLeft: 5, ...FONTS.body3, color: COLORS.lightGray }}>{item.event_date.slice(0,10)}</Text>

                        <Image
                            source={icons.page_icon}
                            style={{
                                marginLeft: SIZES.radius,
                                width: 20,
                                height: 20,
                                tintColor: COLORS.lightGray
                            }}
                        />
                        <Text style={{ marginLeft: 5, ...FONTS.body3, color: COLORS.lightGray }}>Rs.{item.price}</Text>
                        

                    </View>
                </TouchableOpacity>
            )
        }

        return (
            <View style={{ flex: 1 }}>
                {/* Header */}
                <View style={{ paddingHorizontal: SIZES.padding, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>Events</Text>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("AllEvents")}
                    >
                        <Text style={{ ...FONTS.body3, color: COLORS.lightGray, alignSelf: 'flex-start', textDecorationLine: 'underline' }}>see more</Text>
                    </TouchableOpacity>
                </View>

                {/* Books */}
                <View style={{ flex: 1, marginTop: SIZES.padding }}>
                    <FlatList
                        data={events}
                        renderItem={renderItem}
                        keyExtractor={item => `${item.id}`}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
        )
    }

    function renderCategoryHeader() {
        
        
        const renderItem = ({ item }) => {
            
            return (
                <TouchableOpacity
                    style={{ flex: 1, marginRight: SIZES.padding }}
                    onPress={() => setSelectedCategory(item.id)}
                >
                    {
                        selectedCategory == item.id &&
                        <Text style={{ ...FONTS.h2, color: COLORS.white }}>{item.topic}</Text>
                    }
                    {
                        selectedCategory != item.id &&
                        <Text style={{ ...FONTS.h2, color: COLORS.lightGray }}>{item.topic}</Text>
                    }
                </TouchableOpacity>
            )
        }

        return (
            <View style={{ flex: 1, paddingLeft: SIZES.padding }}>
                <FlatList
                    data={categories}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                    horizontal
                />
            </View>
        )
    }

    function renderCategoryData() {
        let fposts=[]
        let selectedCategoryBooks = posts.filter(a => a.topic.id == selectedCategory).slice(0,4)    

        if (selectedCategoryBooks.length > 0) {
            fposts = selectedCategoryBooks
        }

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
                    data={fposts}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }





    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
            {/* Header Section */}
            <View style={{ height: 200 }}>
                {renderHeader(profile)}
                {renderButtonSection()}
            </View>

            {/* Body Section */}
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={{ marginTop: SIZES.radius }}>
                {/* Books Section */}
                <View>
                    {renderMyBookSection(events)}
                </View>

                {/* Categories Section */}
                <View style={{ marginTop: SIZES.padding }}>
                   
                    <View>
                        {renderCategoryHeader()}
                    </View>
                    <View>
                        {renderCategoryData(filterposts)}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;
