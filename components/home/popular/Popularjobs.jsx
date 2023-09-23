import {useState} from 'react'
import { View, Text,TouchableOpacity, FlatList,ActivityIndicator } from 'react-native'
import {useRouter} from 'expo-router'

import styles from './popularjobs.style'
import {COLORS, SIZES} from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import useFetch from "../../../hook/useFetch";

import loc from "../../../hook/currentJob";


const Popularjobs = () => {
  const router = useRouter();
  const [selectedJob,setSelectedJob] = useState();
  const handleCardPress = (item) => {
    
    setSelectedJob(item.job_ID);
    var r = require("../../../hook/getItemLoc");
    r.getItem(loc, item);
    router.push(`/job-details/${item.job_ID}`);
    
  };
  const [arrayOfObjects,isLoading,error,refetch] = useFetch();
  return (
    <View style= {styles.container}>
      <View style = {styles.header}>
      <Text style = {styles.headerTitle}>Recently viewed</Text>
      <TouchableOpacity>
        <Text style = {styles.headerBtn}>Show all</Text>
      </TouchableOpacity>
      </View>

      <View style = {styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors = {COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data = {arrayOfObjects.slice(0,10)}
            renderItem={({item}) => (
              <PopularJobCard
              item = {item}
              selectedJob={selectedJob}
              handleCardPress={handleCardPress}
              />
              

            )}
            
            keyExtractor={item => item?.SAP_ID}
            contentContainerStyle={{ columnGap: SIZES.medium}}
            horizontal
          />


        )}

      </View>

    </View>
  )
}

export default Popularjobs