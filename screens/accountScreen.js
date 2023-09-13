import React, {
  useContext,
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import {
  Button,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Platform
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import { StatusBar } from "expo-status-bar";
import { UserContext } from "../components/UserContext";
import {
  Ionicons
} from "@expo/vector-icons";
import { NumberValueFormat } from "../components/FormatValue";
import { gs, colors } from "../styles";
// import { SafeAreaView } from "react-native-safe-area-context";
import client from "../api/client";

let stopFetchMore = true;
const ListFooterComponent = () => (
  <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 30 }}>
  <Text
    style={{
      fontSize: 16,
      fontFamily: "_semiBold",
      textAlign: "center",
      padding: 5,
    }}
  >
    <ActivityIndicator size="large" color={colors.secondaryColor1} />
    
  </Text>
  </View>
);
const AccountScreen = ({ navigation }) => {
  const [
    loginState,
    setLoginState,
    isLoading,
    setIsLoading,
    myDetails,
    setMyDetails,
  ] = useContext(UserContext);

  const [recentLoading, setRecentLoading] = useState(false);
  const [recordLoading, setRecordLoading] = useState(false);
  const [allDataFetched, setAllDataFetched] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [noMoreRecord, setNoMoreRecord] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  // get user account details here

  useEffect(() => {
    setData();
  }, []);

  const setData = async () => {
    //setRecordLoading(true);
    setLoadingMore(true);
    try {
      const res = await client.get(
        `api/all_statementMobile/${myDetails._id}?page=${currentPage}`
      );
      if (
        !Array.isArray(res.data) ||
        res.data.length === 0 ||
        res.data.status === "401" 
      ) {
       
        setAllDataFetched(false);
        return setLoadingMore(false);
      }
      setTransactions([...res.data]);
    } catch (e) {
      console.log(e);
    } finally {
      //setRecordLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMoreRecord = async () => {
    if (loadingMore || allDataFetched) return;

    setCurrentPage(currentPage + 1);
    try {
      setLoadingMore(true);
      const res = await client.get(
        `api/all_statementMobile/${myDetails._id}?page=${currentPage + 1}`
      );

      if (
        !Array.isArray(res.data) ||
        res.data.length === 0 ||
        res.data.status === "401" ||
        res.data.status === "404"
      ) {
        setAllDataFetched(true);
        setNoMoreRecord(true)
        setLoadingMore(false);
       return;
      }

      setTransactions([...transactions, ...res.data]);
      
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoadingMore(false);
    }
  };

  // const setData = async() =>{
  //   if(recentLoading || allDataFetched) return;

  //   try{
  //     setRecentLoading(true);
  //     const res = await client.get(`api/all_statement/${myDetails._id}?page=${currentPage}`)
  //       const newTransactions = res.data;
  //       if(newTransactions.length === 0){
  //         setAllDataFetched(true);
  //         return
  //       }
  //     setTransactions([...transactions, ...newTransactions]);
  //     setCurrentPage(currentPage + 1);
  //    }catch (e){
  //     console.log(e);
  //   }
  //   finally {
  //     setRecentLoading(false);
  //     }
  // };

  // flat list data here
  const recentTranDataInfo = ({ item, index }) => (
    <TouchableOpacity style={styles.recentTransaction}
    onPress={() =>{ navigation.navigate('detailsPage', {detail: Object.assign({}, item) })
  }}  key={index} >
         <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 5,
              marginHorizontal: 12,
              marginTop: 8,
            }}
          >
            <Text
              style={{ fontFamily: "_semiBold", fontSize: 14, color: "#aaa" }}
            >
              Status: {item.transac_nature}
            </Text>

            <Text
              style={{ fontFamily: "_semiBold", fontSize: 14, color: "#777" }}
            >
             {item.transac_nature == "Debit" ? "-" : "+"}
              <NumberValueFormat value={item.amount} />
            </Text>
          </View>
            <View  
              style={{
              flexDirection: "row",
              marginHorizontal: 12
            }}>
            <Text
            style={{
              fontFamily: "_regular",
              fontSize: 13,
              marginBottom: 5,
              textAlign: "justify",
              flexShrink: 1,
            }}
          >
            {item.tran_desc}
          </Text>
            </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 5,
              marginHorizontal: 12
            }}
          >
            <Text
              style={{ fontFamily: "_semiBold", fontSize: 12, color: "#aaa" }}
            >
              P.Date: {moment(item.createdOn).format("DD/mm/YYYY")}
            </Text>

            <Text
              style={{ fontFamily: "_semiBold", fontSize: 12, color: "#aaa" }}
            >
              R.Date: {moment(item.createdOn).format("DD/mm/YYYY")}
            </Text>
          </View>
    </TouchableOpacity>
  );

  return (
  <SafeAreaView style={{ flex: 1, backgroundColor: colors.secondaryColor2}}>
    <StatusBar backgroundColor={colors.secondaryColor2} style="light" />
      <View style={{ flex: 1, backgroundColor: '#F7F7F7', }}>

      {/* header of the screen */}
      <LinearGradient
        colors={[colors.secondaryColor2, colors.secondaryColor2]}
        start={[0, 0]}
        end={[1, 1]}
        style={{ elevation: 30, shadowColor: '#930D2F'}}
      >
        <View style={[gs.rowBetween, { marginTop: Platform.OS === "ios" ? 18 : 30 , marginHorizontal: 10, justifyContent: 'center' }]}>
         
          <TouchableOpacity style={styles.circleIconLeft1}>
            <Text
              style={{ fontSize: 22, fontFamily: "_semiBold", color: "#fff" }}
            >
              Account Statements
            </Text>
          </TouchableOpacity>
          <View style={styles.nameView}></View>

          {/* <Text style = {styles.text}>{new Date().toString().slice(0,11)}</Text> */}
        </View>
      </LinearGradient>

      {/* This show a dash round line */}
      <View style={styles.placeholder}>
        <View style={styles.placeholderInset}>
        <View style={{marginTop: 8}}></View>
        <FlatList
              keyExtractor={(item) => item._id}
              data={transactions}
              renderItem={recentTranDataInfo}
              onEndReached={loadMoreRecord}
              onEndReachedThreshold={0.5} // Adjust this threshold as needed
              onScrollBeginDrag={() => {
                stopFetchMore = false;
              }}
              ListFooterComponent={() =>
                loadingMore ? <ListFooterComponent />:

                <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 30 }}>
                {transactions.length < 1 && noMoreRecord ? <Text
                      style={{
                        fontFamily: "_regular",
                        fontSize: 16,
                        color: "#777",
                        flexShrink: 1,
                      }}
                    >
                      No more statements
                    </Text>
                    : null
                }
              </View>    
              }
            />
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {recordLoading ? (
              <ActivityIndicator size="large" color="#A78808" />
            ) : (
              ""
            )}
            {loadingMore ? (
              ""
            ) : (
              <View style={{marginHorizontal: 20}}>
                {transactions.length ? (
                  ""
                ) : (
                  <>
                    <Text
                      style={{
                        fontFamily: "_regular",
                        fontSize: 16,
                        color: "#aaa",
                        flexShrink: 1,
                      }}
                    >
                      No account statement
                    </Text>
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Ionicons
                        name="file-tray-outline"
                        size={30}
                        color="#aaa"
                        marginLeft={8}
                      />
                    </View>
                  </>
                )}
              </View>
            )}
          </View>

          <View
            style={{
              marginTop: 10,
              marginBottom: 60,
            }}
          >
            
          </View>
        </View>
      </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  constrainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8fcbbc",
  },
  nameView: {
    flexDirection: "column",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  nameTitle: {
    fontSize: 20,
    fontFamily: "_regular",
    color: "#fff",
    textAlign: "justify",
  },
  circleIconLeft: {
    borderRadius: 100,
    overflow: "hidden",
    borderColor: "#B8950A",
    width: 35,
    height: 35,
    marginVertical: 10,
    backgroundColor: "#B8950A",
    alignItems: "center",
    justifyContent: "center",
  },
  circleIconLeft1: {
    borderColor: colors.secondaryColor1,
    alignItems: "center",
    justifyContent: "center",
  },
  balanceRow: {
    flexDirection: "column",
    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  balanceTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: "#E1E1E1",
    justifyContent: "flex-end",
    textAlign: "center",
  },
  balanceSubTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    opacity: 0.5,
  },
  balanceIcon: {
    borderRadius: 5,
    overflow: "hidden",
    borderColor: "#E0E0E0",
    borderWidth: 1.5,
    width: 60,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.5,
  },
  footer: {
    flex: 2,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  recentTransaction: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 15,
    justifyContent: "space-between",
    marginHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  placeholder: {
    flex: 1,
    height: 500,
    padding: 20,
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: colors.secondaryColor2,
    borderStyle: "dashed",
    borderRadius: 9,
    flex: 1,
  },
});

export default AccountScreen;