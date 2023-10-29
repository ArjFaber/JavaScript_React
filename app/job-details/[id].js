import {useState} from 'react'; 
import {Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl,Image, ImageBackground} from 'react-native'
import {Stack, useRouter, useGlobalSearchParams} from 'expo-router'

import{ Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics} from '../../components';
import {COLORS, icons, SIZES} from '../../constants';
import useFetch from '../../hook/useFetch';
import loc from "../../hook/currentJob";

//import statement for usefetch here...
const tabs = ["SAP ID", "Typeplaatje","Number of items", "Date of purchase", "Setup of the purchase", "Total value", "State","Remark", "Vendure name"];


const JobDetails = () => {

    const router = useRouter();
    // obtaining the index 
    const [arrayOfObjects,isLoading,error,refetch] = useFetch();

    const index = loc.value;
    const data = arrayOfObjects[index];
    
        //const {data,.....}
    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const onRefresh = () => {}

    const displayTabContent = () => {
        switch (activeTab){
            case "SAP ID":
                return <Specifics
                    title = "SAP ID"
                    points = {data?.SAP_ID??['N/A']}
                />
            case "Typeplaatje":
                    return <View>
                   <Text>
                    Typeplaatje
                   </Text>
                </View>  
            case "Number of items":
                return <Specifics
                    title = "Number of items"
                    points = {data?.numItems??['N/A']}
                />
            case "Date of purchase":
                return <Specifics
                    title = "Date of purchase"
                    points = {data?.Date_de_lachat??['N/A']}
                />
            case "Setup of purchase":
                return <Specifics
                title = "Setup of purchase"
                points = {data?.Montant_de_lachat??['N/A']}
            />
            case "Total value":
                return <Specifics
                title = "Total value"
                points = {data?.ValeurTot??['N/A']}
            />
            case "State":
                return <Specifics
                title = "State"
                points = {data?.State??['N/A']}
            />
            case "Remark":
                return <Specifics
                title = "Remark"
                points = {data?.Remark??['N/A']}
            />
            case "Vendure name":
                return <Specifics
                title = "Vendure name"
                points = {data?.vendName??['N/A']}
            />
            default:
                break;
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
            options={{
                headerStyle: { backgroundColor: COLORS.lightWhite },
                headerShadowVisible: false,
                headerBackVisible: false,
                headerLeft: () => (
                <ScreenHeaderBtn
                    iconUrl={icons.left}
                    dimension='60%'
                    handlePress={() => router.back()}
                />
              ),
                headerRight: () => (
                <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
                ),
                headerTitle: "",
            }}
            />
        
            <>
            <ScrollView showsVerticalScrollIndicator={false}
                refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                { isLoading ? (
                <ActivityIndicator size='large' color={COLORS.primary} />
                ) : 
                error ? (
                <Text>Something went wrong</Text>
                ) : 
                !data ? (
                    <Text>No data available</Text>
                ) : 
                
                (
                <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                    <Company
                    companyLogo={data}
                    jobTitle={data.Desc}
                    companyName={data.Palette}
                    />
                    <JobTabs
                        tabs ={tabs}
                        activeTab = {activeTab}
                        setActiveTab = {setActiveTab}
                    />

                    {displayTabContent()}

        
                    
        
                    
                </View>
                )}
            </ScrollView>
        
            <JobFooter  />
            </>
        </SafeAreaView>

    )

}

export default JobDetails