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

const EventDetail = ({ route, navigation }) => {

    const [event, setEvent] = React.useState(null);
    

    const [scrollViewWholeHeight, setScrollViewWholeHeight] = React.useState(1);
    const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = React.useState(0);

    const indicator = new Animated.Value(0);

    React.useEffect(() => {
        let { event } = route.params;
        setEvent(event)
    }, [event])

    function rendereventInfoSection() {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={{
                        uri: `https://www.codethamizha.com${event.event_poster}`
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
                        backgroundColor: event.pg_color
                    }}
                >
                </View>

                {/* Navigation header */}
                <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.radius, height: 80, alignItems: 'flex-end' }}>
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
                                tintColor: event.icon_color
                            }}
                        />
                    </TouchableOpacity>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ ...FONTS.h3, color: event.icon_color }}>Event Detail</Text>
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
                                tintColor: event.icon_color,
                                alignSelf: 'flex-end'
                            }}
                        />
                    </TouchableOpacity>
                </View>

                {/* event Cover */}
                <View style={{ flex: 5, paddingTop: SIZES.padding2, alignItems: 'center' }}>
                    <Image
                        source={{
                            uri: `https://www.codethamizha.com${event.event_poster}`
                        }}
                        resizeMode="contain"
                        style={{
                            flex: 1,
                            width: "100%",
                            height: "auto"
                        }}
                    />
                </View>

                {/* event Name and Author */}
                <View style={{ flex: 1.8, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ ...FONTS.h2, color: event.icon_color }}>{event.Title}</Text>
                    <Text style={{ ...FONTS.body3, color: event.icon_color }}>{event.teacher.full_name}</Text>
                </View>

                {/* event Info */}
                <View
                    style={{
                        flexDirection: 'row',
                        paddingVertical: 5,
                        margin: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor: "rgba(0,0,0,0.3)"
                    }}
                >
                    {/* Rating */}
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        {Number(event.price)>0?(<><Text style={{ ...FONTS.h2, color: event.icon_color }}>{event.price}</Text></>):(<><Text style={{ ...FONTS.h1, color: event.icon_color }}>Free</Text></>)}
                        
                        {Number(event.price)>0?(<><Text style={{ ...FONTS.body4, color: event.icon_color }}>Price</Text></>):null}
                        
                    </View>

                    <LineDivider />

                    

                    <LineDivider />

                    {/* Language */}
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ ...FONTS.h2, color: event.icon_color }}>{event.event_date.slice(0,10)}</Text>
                        <Text style={{ ...FONTS.body4, color: event.icon_color }}>Date</Text>
                    </View>
                </View>
            </View>
        )
    }

    function rendereventDescription() {

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
                    <Text style={{ ...FONTS.h2, color: COLORS.white, marginBottom: SIZES.padding }}>Description</Text>
                    <Text style={{ ...FONTS.body2, color: COLORS.lightGray }}>{event.Description}</Text>
                </ScrollView>
            </View>
        )
    }

    function renderBottomButton() {
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                {/* eventmark */}
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
                    onPress={() => console.log("eventmark")}
                >
                    <Image
                        source={{
                            uri: `https://codethamizha.com${event.teacher.profile_pic}`
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
                    onPress={() => Linking.openURL(`${event.EventLink}`)}
                >
                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>JOIN</Text>
                </TouchableOpacity>
            </View>
        )
    }

    if (event) {
        return (
            <View style={{ flex: 1, backgroundColor: COLORS.black }}>
                {/* event Cover Section */}
                <View style={{ flex: 4 }}>
                    {rendereventInfoSection()}
                </View>

                {/* Description */}
                <View style={{ flex: 2 }}>
                    {rendereventDescription()}
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

export default EventDetail;