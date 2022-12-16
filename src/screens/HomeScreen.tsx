import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {GetProducts} from '../hooks/productHooks';

// import { GetProducts } from '../quarys/productQuery';

const HomeScreen = () => {
  const {isLoading, data, isError}: any = GetProducts();

  console.log('data===========', isLoading, data, isError);

  const LoadingComponent = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={'blue'} size="large" />
      </View>
    );
  };

  const ProductComponent = ({datas}: any) => {
    return (
      <View style={styles.productContainer}>
        <Image
          source={{
            uri: datas?.thumbnail,
          }}
          resizeMode="contain"
          style={{width: 100, height: 100}}
        />
        <View style={styles.productInner}>
          <Text style={styles.productText}>{datas?.title}</Text>
          <Text style={styles.productText}>price : {datas?.price}</Text>
          <Text style={styles.productText}>rating : {datas?.rating}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading && <LoadingComponent />}
      <ScrollView>
        {data &&
          data?.products?.map((item: any, index: number) => (
            <ProductComponent key={item?.title} datas={item} />
          ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productContainer: {
    flexDirection: 'row',
  },
  productInner: {
    marginLeft: 10,
    marginTop: 20,
  },
  productText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
});
