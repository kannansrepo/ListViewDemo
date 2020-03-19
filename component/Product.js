import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    ActivityIndicator,
} from 'react-native';

import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';

import { listProducts } from './action';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasReachedEnd: false,
            searchString: '',
            searched: false,
            filteredProducts: []
        }
    }

    componentDidMount() {
        this.props.listProducts(this.props.start, this.props.limit);
    }


    static getDerivedStateFromProps = (nextProps, prevState) => {
        console.log("****see here**");
        console.log(nextProps);
        console.log(prevState);
        console.log("****end here**");
        if (prevState.searchString !== '') {
            console.log("****search String condition**");
            console.log(prevState.searchString);
            console.log(nextProps.products);
            let results = nextProps.products.filter(product => product.title.includes(prevState.searchString));
            console.log(results)
            return {
                ...prevState,
                filteredProducts: results,
                hasReachedEnd: false
            }
        } else {
            console.log("****New product**");
            console.log(prevState);
            console.log("======");
            console.log(nextProps);
            return {
                ...prevState,
                filteredProducts: nextProps.products,
                hasReachedEnd: false,
                searched: false
            }
        }
    }
    renderFooter = () => {
        const { ended } = this.props;
        if (!this.props.loading && ended) return null;
        if (ended) return <Text style={styles.endText}>End Of Products</Text>;

        return (<View style={styles.loaderContainter}><ActivityIndicator size="large" color="#0000ff" /></View>);
    };

    renderHeader = () => {
        return (
            <SearchBar
                placeholder="Type Here..."
                lightTheme
                round
                onChangeText={text => this.searchFilterFunction(text)}
                autoCorrect={false}
                value={this.state.searchString}
            />
        );
    };

    renderItem = ({ item }) => {
        return <View style={styles.item}>
            <Image
                source={{
                    uri: 'https://reactjs.org/logo-og.png',
                    method: 'POST',
                    headers: {
                        Pragma: 'only-if-cached',
                    }
                }}
                style={styles.image}
            />
            <Text style={styles.text}>{item.title}</Text>
        </View>
    };

    searchFilterFunction = text => {
        this.setState({ searchString: text, searched: true });
        console.log(this.state.filteredProducts);
        const newData = this.props.products.filter(item => {
            const itemData = item.title.toUpperCase();
            return itemData.includes(text.toUpperCase());
        });
        console.log(newData);
        this.setState({ filteredProducts: newData });

        // this.setState({ searchedString: text, filteredProducts: newData });
    };

    renderEmptyResults = () => {
        return (
            //View to show when list is empty
            <View style={styles.item}>
                <Text style={{ textAlign: 'center' }}>No Data Found</Text>
            </View>
        );
    };

    render() {
        console.log(this.state.filteredProducts);
        return (
            <FlatList
                styles={styles.container}
                data={this.state.filteredProducts}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={this.renderItem}
                extraData={this.state.searched}
                onEndReachedThreshold={0.5}
                onEndReached={({ distanceFromEnd }) => {
                    { this.props.listProducts(this.props.start + this.props.limit, this.props.limit) }
                }}
                ListFooterComponent={this.renderFooter}
                // onScroll={({ nativeEvent }) => {
                //     if (isCloseToBottom(nativeEvent)) {
                //         this.setState({ hasReachedEnd: true });
                //     }
                // }}
                // scrollEventThrottle={400}
                ListHeaderComponent={this.renderHeader}
                stickyHeaderIndices={[0]}
                ListEmptyComponent={this.renderEmptyResults}
            />
        );
    }
}

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;

    return (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 8
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#f7edc8',
        flexDirection: 'row',
        alignItems: 'center'
    },
    endText: {
        textAlign: "center",
        color: "#fff",
        backgroundColor: "#ed6a6a",
        padding: 10
    },
    loaderContainter: {
        alignContent: 'center',
        width: '100%',
        backgroundColor: '#f7edc8'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 70
    },
    text: {
        fontSize: 15,
        color: '#24292E',
        margin: 16
    }
});

const mapStateToProps = state => ({
    products: state.products,
    loading: state.loading,
    ended: state.ended,
    start: state.start,
    limit: state.limit
});

const mapDispatchToProps = dispatch => ({
    listProducts: (start, limit) => { dispatch(listProducts(start, limit)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);