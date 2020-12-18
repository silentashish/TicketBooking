import React from 'react';
import {View, Text, Image} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {Title, Subheading} from 'react-native-paper';
import {GlobalTheme} from '../theme';
import {Divider} from './Divider';

const NoData = ({message, type}) => {
  return (
    <View style={styles.contain}>
      <Divider big />

      <Title style={styles.heading}>Oops!</Title>
      <Divider medium />
      <Subheading style={styles.sheading}>
        {message ?? "We couldn't find results for your search"}
      </Subheading>

      <Image
        resizeMode={'cover'}
        style={styles.image}
        source={require('../../assets/image/logo/resultnotfound.png')}
      />

      <Title style={[styles.title]}>No {type ?? 'Result'} Found</Title>
    </View>
  );
};

const styles = ScaledSheet.create({
  heading: {
    fontSize: '40@ms',
    lineHeight: '40@ms',
    textAlign: 'center',
  },
  sheading: {
    textAlign: 'center',
  },
  title: {
    color: GlobalTheme.darkBlueColor,
    textAlign: 'center',
    fontSize: '27@ms',
    lineHeight: '27@ms',
  },
  contain: {
    // justifyContent: 'center',
    minHeight: '400@vs',
    alignItems: 'center',
  },
  image: {
    alignSelf: 'center',
    width: '220@s',
    height: '220@s',
  },
});

export {NoData};

// import React from 'react';
// import {View, Text, Image} from 'react-native';
// import {ScaledSheet} from 'react-native-size-matters';
// import {Title, Subheading} from 'react-native-paper';
// import {GlobalTheme} from '../theme';
// import {Divider} from './Divider';

// const NoData = () => {
//   return (
//     <View style={styles.contain}>
//       <Title style={styles.heading}>Oops!</Title>
//       <Divider medium />
//       <Subheading style={styles.sheading}>
//         We couldn't find results for your search
//       </Subheading>
//       <Image
//         style={styles.image}
//         source={require('../../assets/image/logo/resultnotfound.png')}
//       />
//       <Title style={[styles.title]}>No Result Found</Title>
//     </View>
//   );
// };

// const styles = ScaledSheet.create({
//   heading: {
//     fontSize: '40@ms',
//     lineHeight: '40@ms',
//     textAlign: 'center',
//   },
//   sheading: {
//     textAlign: 'center',
//   },
//   title: {
//     color: GlobalTheme.darkBlueColor,
//     textAlign: 'center',
//     fontSize: '27@ms',
//     lineHeight: '27@ms',
//   },
//   contain: {
//     flex: 1,
//     justifyContent: 'flex-start',
//   },
//   image: {
//     alignSelf: 'center',
//     width: '220@s',
//     height: '220@s',
//   },
// });

// export {NoData};

// // import React from 'react';
// // import {View, Text} from 'react-native';

// // import {Preset} from '../theme';

// // const NoData = () => {
// //   return (
// //     <View style={[Preset.xyCenter, Preset.flex1]}>
// //       <Text>No Data</Text>
// //     </View>
// //   );
// // };

// // export {NoData};
