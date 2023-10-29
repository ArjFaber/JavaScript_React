import { View, Text } from "react-native";

import styles from "./specifics.style";

const Specifics = ({ title, points }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}:</Text>

      <View style={styles.pointsContainer}>
        <Text style={styles.pointText}>{points}</Text>
        
      </View>
    </View>
  );
};

export default Specifics;