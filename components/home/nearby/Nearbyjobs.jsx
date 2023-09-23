import React from "react";
import {useState} from 'react';
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator,FlatList } from "react-native";

import styles from "../../home/nearby/nearbyjobs.style";
import { COLORS,SIZES } from "../../../constants";
import loc from "../../../hook/currentJob";
import useFetch from "../../../hook/useFetch";

import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";

const Nearbyjobs = () => {
  const [selectedJob,setSelectedJob] = useState();
  const [arrayOfObjects,isLoading,error,refetch] = useFetch();

  const handleCardPress = (item) => {

    setSelectedJob(item.job_ID);
    var r = require("../../../hook/getItemLoc");
    r.getItem(loc, item);
    router.push(`/job-details/${item.job_ID}`);
    
  };

  const router = useRouter();
  //const { data } = arrayOfObjects;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Inventory</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading? (
            <ActivityIndicator size = 'large' color = {COLORS.primary} />
          ) : error ? (
            <Text> Something went wrong</Text>
          ):
        
        //isLoading ? (
          //<ActivityIndicator size='large' color={COLORS.primary} />
        //) : error ? (
        //  <Text>Something went wrong</Text>
        //) : (
          //data?.map((Desc) => (
          //  <NearbyJobCard
          //    job={Desc}
          //    //key={`nearby-job-${job.job_id}`}
          //    handleNavigate={() => router.push(`/job-details/${job}`)}
          //  />
            
         // ))
         <FlatList
         data = {arrayOfObjects.slice(0,10)}
         renderItem={({item}) => (
           <NearbyJobCard
           item = {item}
           selectedJob={selectedJob}
           handleCardPress={handleCardPress}
           />
           

         )}
         
         keyExtractor={item => item?.SAP_ID}
         contentContainerStyle={{ columnGap: SIZES.medium}}
         
        />
          }
      </View>
    </View>
  );
};

export default Nearbyjobs;