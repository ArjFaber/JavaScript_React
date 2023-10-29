import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./nearbyjobcard.style";
import { checkImageURL } from "../../../../utils";

const NearbyJobCard = ({ item, handleCardPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress= {() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            //uri: checkImageURL(job.employer_logo)
            //  ? job.employer_logo
              //: 
            uri: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png',
          }}
          resizeMode='contain'
          style={styles.logImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {item?.Desc}
        </Text>
          
        <Text style={styles.jobType}>{item?.Palette}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NearbyJobCard;