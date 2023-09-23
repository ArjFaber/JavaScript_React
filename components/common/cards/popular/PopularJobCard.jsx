import { View, Text, TouchableOpacity,Image } from 'react-native'

import styles from './popularjobcard.style'

import {checkImageURL} from '../../../../utils';

const PopularJobCard = ({item, selectedJob, handleCardPress}) => {
  return (
    <TouchableOpacity
      style = {styles.container(selectedJob, item)}
      onPress= {() => handleCardPress(item)}
    >
      <TouchableOpacity style = {styles.logoContainer(selectedJob, item)}>
        <Image 
          source = {{//uri: checkImageURL(item.employer_logo)
            //? item.employer_logo:
            uri:'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'
        
          }}
          resizeMode = "contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style= {styles.companyName} numberOfLines={1}>{item.Desc}</Text>
      <View style={styles.infoContainer}>
        <Text style = {styles.jobName(selectedJob, item)} >
          {item.SAP_ID}
        </Text>
        <Text style={styles.location} > {item.Palette}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default PopularJobCard