import { StyleSheet } from "react-native";

export const colors = {
    darkBg: "#222",
    secondaryColor1: "#EEC209",
    secondaryColor2: "#A78808",
    blackColor1: "#51534D",
    blackColor2: "#23261E",
    primaryColor1: "#094D19",
    primaryColor2: "#41892E",
    primaryColor3: "#4C848B",
    yellowColor1: "#F4D41B",
    lightBg: "#333",
    darkHl: "#666",
    lightHl: "#888",
    pink: "#ea3372",
    iconColor: "#05375a",
    warningColor: "#FF0000",
    
    text: "#fff",
    textSec: "#aaa",
    dividerColor: "#595957",
};

export const gs = StyleSheet.create({

    // container:{
    //     ...gs.rowCenter,
    //     ...gs.sectionContainer
    // },
    sectionContainer: {
        paddingVertical: 24,
        paddingHorizontal: 32,
        marginBottom: 8,
        backgroundColor: colors.lightBg
    },
    sectionTitle:{
        fontWeight: "700",
        color: colors.text,
        fontSize: 15
    },

    rowBetween:{
        flexDirection: "row",
        justifyContent:'space-between',
    },
    rowCenter:{
        flexDirection:"row",
        alignItems:"center",
    },
    center:{
        alignItems:"center",
        justifyContent:"center",
    },
    divider:{
        borderBottomColor:"#444",
        borderBottomWidth: 1,
        marginVertical: 24
    },
    // weatherContainer:{
    //     ...gs.rowCenter,
    //     paddingRight: 12,
    //     marginRight: 12,
    //     borderRightColor: "#444",
    //     borderRightWidth: 1,
    // },
    // title:{
    //     color: colors.text,
    //     fontSize: 30
    // },
    // subTitle:{
    //     color: colors.textSec,
    //     fontSize: 10,
    //     fontWeight: "800",
    // },
    // circlesContainer:{
    //     flex: 1,
    //     flexDirection: "row",
    //     justifyContent: "flex-end",
    // },
    // circle:{
    //     width:36,
    //     height: 36,
    //     borderRadius: 36/2,
    //     borderWidth: 2,
    //     borderColor: colors.lightBg,
    // }
    title:{
        color: colors.text,
        fontSize: 30,
    },
    subTitle:{
        fontWeight: "600",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.6)",
        fontSize: 15,
        letterSpacing: 1,
    },
    absoluteFull:{
        position: 'absolute',
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
    },
    button:{
        justifyContent:"center",
        alignItems: "center",
        backgroundColor: colors.pink,
        borderRadius: 100,
    }
})