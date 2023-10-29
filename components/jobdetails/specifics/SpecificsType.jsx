import { View, Text, Image} from "react-native";

import styles from "./specifics.style";

const SpecificsType = ({ title, image }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}:</Text>

      <View style={styles.pointsContainer}>
        <Image 
            source = {image}
            resizeMode='contain'
            style= {styles.searchBtnImage}
          />
        
      </View>
    </View>
  );
};

export default Specifics;