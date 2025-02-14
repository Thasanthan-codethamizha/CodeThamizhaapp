import React from "react";
import {
    View,
    Linking,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    ScrollView,
    Animated
} from 'react-native';
import { FONTS, COLORS, SIZES, icons } from "../constants";

const LineDivider = () => {
    return (
        <View style={{ width: 1, paddingVertical: 5 }}>
            <View style={{ flex: 1, borderLeftColor: COLORS.lightGray2, borderLeftWidth: 1 }}></View>
        </View>
    )
}

const BookDetail = ({ route, navigation }) => {

    const [book, setBook] = React.useState(null);
    

    const [scrollViewWholeHeight, setScrollViewWholeHeight] = React.useState(1);
    const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = React.useState(0);

    const indicator = new Animated.Value(0);

    React.useEffect(() => {
        let { book } = route.params;
        
        setBook(book)
    }, [book])

    function renderBookInfoSection() {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={{
                        uri: `https://www.codethamizha.com${book.blog_image}`
                    }}
                    resizeMode="cover"
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }}
                />

                {/* Color Overlay */}
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        backgroundColor: book.pg_color,
                    }}
                >
                </View>

                {/* Navigation header */}
                <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.radius, height: 50, alignItems: 'flex-end' }}>
                    <TouchableOpacity
                        style={{ marginLeft: SIZES.base }}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={icons.back_arrow_icon}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: book.icon_color
                            }}
                        />
                    </TouchableOpacity>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ ...FONTS.h3, color: book.icon_color }}>Read Blogs</Text>
                    </View>

                    <TouchableOpacity
                        style={{ marginRigth: SIZES.base }}
                        onPress={() => console.log("Click More")}
                    >
                        <Image
                            source={icons.more_icon}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: book.icon_color,
                                alignSelf: 'flex-end'
                            }}
                        />
                    </TouchableOpacity>
                </View>

                {/* Book Cover */}
                <View style={{ flex: 5, paddingTop: SIZES.padding, alignItems: 'center' }}>
                    <Image
                        source={{
                            uri: `https://www.codethamizha.com${book.blog_image}`
                        }}
                        resizeMode="contain"
                        style={{
                            flex: 1,
                            width: "100%",
                            height: "auto"
                        }}
                    />
                </View>

                {/* Book Name and Author */}
                <View style={{ flex: 1.8, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ ...FONTS.h2, color: book.icon_color,textAlign:'center' }}>{book.title}</Text>
                    <Text style={{ ...FONTS.body3, color: book.icon_color,textAlign:'center'  }}>👦{book.user.full_name}</Text>
                </View>

                {/* Book Info */}
                <View
                    style={{
                        flexDirection: 'row',
                        paddingVertical: 5,
                        margin: 0,
                        marginTop: 10,
                        borderRadius: 0,
                        backgroundColor: "rgba(0,0,0,0.3)"
                    }}
                >
                    {/* Rating */}
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ ...FONTS.h3, color: book.icon_color }}>{book.topic.topic}</Text>
                        <Text style={{ ...FONTS.body4, color: book.icon_color }}>Topic</Text>
                    </View>

                    <LineDivider />

                    

                    <LineDivider />

                    {/* Language */}
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ ...FONTS.h3, color: book.icon_color }}>{book.created_at.slice(0,10)}</Text>
                        <Text style={{ ...FONTS.body4, color: book.icon_color }}>Date</Text>
                    </View>
                </View>
            </View>
        )
    }

    function renderBookDescription() {

        const indicatorSize = scrollViewWholeHeight > scrollViewVisibleHeight ? scrollViewVisibleHeight * scrollViewVisibleHeight / scrollViewWholeHeight : scrollViewVisibleHeight

        const difference = scrollViewVisibleHeight > indicatorSize ? scrollViewVisibleHeight - indicatorSize : 1

        return (
            <View style={{ flex: 1, flexDirection: 'row', padding: SIZES.padding }}>
                {/* Custom Scrollbar */}
                <View style={{ width: 4, height: "100%", backgroundColor: COLORS.gray1 }}>
                    <Animated.View
                        style={{
                            width: 4,
                            height: indicatorSize,
                            backgroundColor: COLORS.lightGray4,
                            transform: [{
                                translateY: Animated.multiply(indicator, scrollViewVisibleHeight / scrollViewWholeHeight).interpolate({
                                    inputRange: [0, difference],
                                    outputRange: [0, difference],
                                    extrapolate: 'clamp'
                                })
                            }]
                        }}
                    />
                </View>

                {/* Description */}
                <ScrollView
                    contentContainerStyle={{ paddingLeft: SIZES.padding2 }}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onContentSizeChange={(width, height) => {
                        setScrollViewWholeHeight(height)
                    }}
                    onLayout={({ nativeEvent: { layout: { x, y, width, height } } }) => {
                        setScrollViewVisibleHeight(height)
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: indicator } } }],
                        { useNativeDriver: false }
                    )}
                >
                    <Text style={{ ...FONTS.h2, color: COLORS.white, marginBottom: SIZES.padding }}>{book.info}</Text>
                    <Text style={{ ...FONTS.body3, color: COLORS.lightGray }}>{book.content}</Text>
                </ScrollView>
            </View>
        )
    }

    function renderBottomButton() {
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                {/* Bookmark */}
                <TouchableOpacity
                    style={{
                        width: 60,
                        backgroundColor: COLORS.secondary,
                        marginLeft: SIZES.padding,
                        marginVertical: SIZES.base,
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => console.log("Bookmark")}
                >
                    <Image
                        source={{
                            uri: `https://codethamizha.com${book.user.profile_pic}`
                        }}
                        resizeMode="contain"
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                        }}
                    />
                </TouchableOpacity>

                {/* Start Reading */}
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: COLORS.primary,
                        marginHorizontal: SIZES.base,
                        marginVertical: SIZES.base,
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => Linking.openURL(`${book.extra_link}`)}
                >
                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>Learn more</Text>
                </TouchableOpacity>
            </View>
        )
    }

    if (book) {
        return (
            <View style={{ flex: 1, backgroundColor: COLORS.black }}>
                {/* Book Cover Section */}
                <View style={{ flex: 3}}>
                    {renderBookInfoSection()}
                </View>

                {/* Description */}
                <View style={{ flex: 2 }}>
                    {renderBookDescription()}
                </View>

                {/* Buttons */}
                <View style={{ height: 70, marginBottom: 30 }}>
                    {renderBottomButton()}
                </View>
            </View>
        )
    } else {
        return (<></>)
    }

}

export default BookDetail;