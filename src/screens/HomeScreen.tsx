import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';

import {GetProducts, AddCartProduct} from '../hooks/productHooks';

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
        <Pressable
          onPress={() => AddCartProduct(datas)}
          style={styles.addCartButtonStyle}>
          <Text style={styles.addCartTextStyle}>Add Cart</Text>
        </Pressable>
      </View>
    );
  };

  const BottomCartComponent = () => {
    return (
      <View style={styles.bottomStyles}>
        <Text style={[styles.productText, {color: '#fff'}]}>Cart : 0</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading && <LoadingComponent />}
      {data?.products?.length > 0 && (
        <ScrollView>
          {data?.products?.map((item: any, index: number) => (
            <ProductComponent key={item?.title} datas={item} />
          ))}
        </ScrollView>
      )}
      {!isLoading && <BottomCartComponent />}
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
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  bottomStyles: {
    height: 50,
    width: '30%',
    position: 'absolute',
    backgroundColor: 'red',
    bottom: 20,
    borderRadius: 10,
    right: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addCartButtonStyle: {
    backgroundColor: 'blue',
    // height: 30,
    position: 'absolute',
    right: 10,
    top: 30,
    borderRadius: 10,
    justifyContent: 'center',
    padding: 10,
  },
  addCartTextStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});
