import React from 'react'
import { View, Text,Image } from 'react-native'

import styles from './company.style'
import {icons} from '../../../constants'
import {checkImageURL} from '../../../utils'

const Company = ({companyLogo, jobTitle, companyName, Pallet}) => {
  return (
    <View style= {styles.container}>
      <View style={styles.logoBox}>
        <Image
          source= {{
            uri: checkImageURL(companyLogo)
            ? companyLogo
            :
            'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'
          }}
          style={styles.logoImage}
        />

      </View>
      <View style = {styles.jobTitleBox}>
        <Text style = {styles.jobTitle}>{jobTitle} </Text>
      </View>
      <View style = {styles.companyInfoBox}>
        <Text style= {styles.companyName}>{companyName}</Text>
        <View style = {styles.locationBox}>
          
          
          <Text style= {styles.locationName}>{Pallet} </Text> 
        </View>
      </View>
    </View>

  )
}

export default Company