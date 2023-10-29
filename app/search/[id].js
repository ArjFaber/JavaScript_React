import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from 'react-native'
import { Stack, useRouter, useGlobalSearchParams } from 'expo-router'
import { Text, SafeAreaView } from 'react-native'

import { ScreenHeaderBtn, NearbyJobCard } from '../../components'
import { COLORS, icons, SIZES } from '../../constants'
import styles from '../../styles/search'
import useFetch from "../../hook/useFetch";

import filteredResults from '../../hook/filterResults'
import loc from "../../hook/currentJob";


const JobSearch = () => {
    const params = useGlobalSearchParams();
    const router = useRouter()
    const [arrayOfObjects,isLoading,error,refetch] = useFetch();
    const [searchResult, setSearchResult] = useState([]);
    const [searchLoader, setSearchLoader] = useState(false);
    const [searchError, setSearchError] = useState(null);
    const [page, setPage] = useState(1);
    const [i, setI] = useState(0);
    const [j, setJ] = useState(10);
    const [delta, setDelta] = useState(0);
    const handleSearch = async () => {
        setSearchLoader(true);
        setSearchResult([])
        try {
            //const options = []
            //const response = await axios.request(options);
            //setSearchResult(response.data.data);
            
        } catch (error) {
            setSearchError(error);
            console.log(error);
        } finally {
            setSearchLoader(false);
        }
    };
    const pageSize = 10;
    const totalPages = Math.ceil(filteredResults(arrayOfObjects, params.id).length / pageSize);
    
    const handlePagination = (direction) => {
        if (direction === 'left' && page > 1 ) {
            setPage(page - 1)
            setJ(j - pageSize)
            setI(i - pageSize)
            handleSearch()
        }if (direction === 'right' && page < totalPages){
            setPage(page + 1)
            setI(i + pageSize)
            setJ(j + pageSize)
            handleSearch()
            
        }

    }

    useEffect(() => {
        handleSearch()
    }, [])

    const [selectedJob,setSelectedJob] = useState();
    const handleCardPress = (item) => {
        setSelectedJob(item.job_ID);
        var r = require("../../hook/getItemLoc");
        r.getItem(loc, item);
        router.push(`/job-details/${item.job_ID}`);
    
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension='60%'
                            handlePress={() => router.back()}
                        />
                    ),
                    headerTitle: "",
                }}
            />

            <FlatList
                data={filteredResults(arrayOfObjects,params.id).slice(i,j)}
                renderItem={({ item }) => (
                    <NearbyJobCard
                        item = {item}
                        selectedJob={selectedJob}
                        handleCardPress={handleCardPress}
                    />
                )}
                keyExtractor={(item) => item.job_ID}
                contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
                ListHeaderComponent={() => (
                    <>
                        <View style={styles.container}>
                            <Text style={styles.searchTitle}>{params.id}</Text>
                            <Text style={styles.noOfSearchedJobs}>Item(s)</Text>
                        </View>
                        <View style={styles.loaderContainer}>
                            {searchLoader ? (
                                <ActivityIndicator size='large' color={COLORS.primary} />
                            ) : searchError && (
                                <Text>Oops something went wrong</Text>
                            )}
                        </View>
                    </>
                )}
                ListFooterComponent={() => (
                    <View style={styles.footerContainer}>
                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={() => handlePagination('left')}
                        >
                            <Image
                                source={icons.chevronLeft}
                                style={styles.paginationImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <View style={styles.paginationTextBox}>
                            <Text style={styles.paginationText}>{page}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={() => handlePagination('right')}
                        >
                            <Image
                                source={icons.chevronRight}
                                style={styles.paginationImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default JobSearch